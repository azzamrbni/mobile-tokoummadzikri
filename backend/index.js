const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;

const SUPABASE_URL = 'https://jwvnzjcvsyzxgifqhqkw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3dm56amN2c3l6eGdpZnFocWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDMxNDUsImV4cCI6MjA3NzY3OTE0NX0.KBwesjWxeiKP_6euXBi3h7tnzTqnhpqJkWDrcqHGO5Q';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// --- 1. GET: Ambil Semua Produk ---
app.get('/api/products', async (req, res) => {
  try {
    // Ambil data dari tabel 'produk'
    const { data, error } = await supabase
      .from('produk') 
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // TRICK PENTING:
    // Database punya kolom 'title', tapi Frontend butuhnya 'name'.
    // Kita copy nilai 'title' ke 'name' sebelum dikirim ke HP.
    const formattedData = data.map(item => ({
      ...item,
      name: item.title // Mapping Title -> Name
    }));

    res.json(formattedData);
  } catch (err) {
    console.error("GET Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// --- 2. POST: Tambah Produk Baru ---
app.post('/api/products', async (req, res) => {
  // Frontend mengirim 'name', tapi kita simpan ke kolom 'title'
  const { name, price, category, image, description, images } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('produk')
      .insert([{ 
        title: name, // Mapping Name -> Title
        price: price, 
        category: category, 
        image: image, 
        images: images, // Simpan array gambar jika ada
        description: description 
      }])
      .select();

    if (error) throw error;
    res.status(201).json({ message: 'Sukses', data: data[0] });
  } catch (err) {
    console.error("POST Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// --- 3. PUT: Edit Produk ---
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, category, image, description, images } = req.body;

  try {
    const { data, error } = await supabase
      .from('produk')
      .update({ 
        title: name, // Mapping Name -> Title
        price, 
        category, 
        image, 
        images,
        description 
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json({ message: 'Updated', data: data[0] });
  } catch (err) {
    console.error("PUT Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// --- 4. DELETE: Hapus Produk ---
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('produk')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error("DELETE Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// --- 5. KONTAK (Kirim Pesan) ---
app.post('/api/messages', async (req, res) => {
  const { name, contact, message } = req.body;
  
  try {
    // Kita hapus .select() agar backend tidak perlu membaca ulang data (mencegah error izin/RLS)
    const { error } = await supabase
      .from('kontak')
      .insert([{ 
        name: name, 
        contact_info: contact, 
        message: message 
      }]);

    if (error) throw error;

    // Langsung jawab Sukses tanpa kirim data balik yang ribet
    res.status(201).json({ message: 'Pesan terkirim!' });
    
  } catch (err) {
    console.error("Message Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server Supabase jalan di port ${port}`);
});

module.exports = app;