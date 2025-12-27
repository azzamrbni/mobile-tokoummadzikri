import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Pastikan sudah install: npx expo install expo-image-picker

export default function AdminScreen() {
  
  // --- KONFIGURASI API (GANTI DENGAN IP LAPTOP KAMU) ---
  // Cara cek IP di Windows: Buka CMD -> ketik ipconfig -> cari IPv4 Address
  const API_URL = 'http://172.20.10.5:3000/api/products'; 
  // -----------------------------------------------------

  // --- STATE LOGIN ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // --- STATE DATA ---
  const [products, setProducts] = useState([]); // Data kosong, nanti diisi dari backend

  // --- STATE MODAL & FORM ---
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Form Inputs
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formImage, setFormImage] = useState(null);

  // Dropdown
  const [showDropdown, setShowDropdown] = useState(false);
  const categoryOptions = ['Souvenir', 'Pakaian', 'Makanan & Minuman', 'Mainan'];

  // --- 1. READ (AMBIL DATA DARI BACKEND) ---
  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // CEK: Apakah data yang diterima benar-benar Array (Daftar Produk)?
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        // Jika bukan array, berarti Error dari Backend.
        // Tampilkan error aslinya di Console Laptop & Alert HP
        console.log("ERROR DARI BACKEND:", data); 
        Alert.alert("Gagal Memuat Data", `Backend Error: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Koneksi Gagal', 'Tidak bisa terhubung ke server backend.');
    }
  };

  // --- FUNGSI LOGIN ---
  const handleLogin = () => {
    if (username === 'admin' && password === '123') {
      setIsLoggedIn(true);
    } else {
      Alert.alert('Gagal', 'Username atau Password salah! (Coba: admin / 123)');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  // --- FUNGSI GAMBAR ---
  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Izin Ditolak', 'Aplikasi butuh izin akses galeri.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const base64Img = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setFormImage(base64Img); // Simpan ini ke state
    }
  };

  // --- FUNGSI CRUD (TAMBAH/EDIT/HAPUS) ---
  const openAddModal = () => {
    setIsEditMode(false);
    setFormName('');
    setFormPrice('');
    setFormCategory('');
    setFormImage(null);
    setModalVisible(true);
  };

  const openEditModal = (item) => {
    setIsEditMode(true);
    setSelectedId(item.id);
    setFormName(item.name);
    setFormPrice(item.price.toString());
    setFormCategory(item.category);
    setFormImage(item.image);
    setModalVisible(true);
  };

  // --- 2. CREATE & UPDATE (SIMPAN KE BACKEND) ---
  const handleSave = async () => {
    if (!formName || !formPrice || !formCategory) {
      Alert.alert('Error', 'Nama, Kategori, dan Harga wajib diisi!');
      return;
    }

    const imageToSave = formImage || 'https://via.placeholder.com/150';
    
    const payload = {
      name: formName,
      price: formPrice,
      category: formCategory,
      image: imageToSave
    };

    try {
      if (isEditMode) {
        // Update (PUT)
        await fetch(`${API_URL}/${selectedId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        Alert.alert('Sukses', 'Produk berhasil diupdate!');
      } else {
        // Create (POST)
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        Alert.alert('Sukses', 'Produk baru ditambahkan!');
      }
      
      fetchProducts(); // Refresh data
      setModalVisible(false);
      setShowDropdown(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Gagal menyimpan data ke server.');
    }
  };

  // --- 3. DELETE (HAPUS DARI BACKEND) ---
  const handleDelete = (id, name) => {
    Alert.alert('Konfirmasi Hapus', `Yakin ingin menghapus ${name}?`, [
      { text: 'Batal', style: 'cancel' },
      { 
        text: 'Hapus', 
        style: 'destructive', 
        onPress: async () => {
          try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchProducts(); // Refresh data setelah hapus
          } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Gagal menghapus data.');
          }
        } 
      }
    ]);
  };

  // --- TAMPILAN LOGIN ---
  if (!isLoggedIn) {
    return (
      <View style={styles.loginContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.logoContainer}>
          <Ionicons name="storefront" size={60} color="#5D4037" />
          <Text style={styles.loginTitle}>Admin Login</Text>
          <Text style={styles.loginSubtitle}>Toko Umma Dzikri</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input} placeholder="admin" value={username} onChangeText={setUsername} autoCapitalize="none" />
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="123" value={password} onChangeText={setPassword} secureTextEntry />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Masuk Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- TAMPILAN DASHBOARD ---
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <Text style={styles.headerSubtitle}>Total Produk: {products.length}</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#D32F2F" />
        </TouchableOpacity>
      </View>

      {/* Tombol Tambah */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
          <Ionicons name="add-circle" size={22} color="#5D4037" />
          <Text style={styles.addButtonText}>Tambah Produk Baru</Text>
        </TouchableOpacity>
      </View>

      {/* List Produk */}
      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {(products || []).map((item) => (
          <View key={item.id} style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.categoryBadge}>{item.category}</Text>
              <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.productPrice}>Rp {item.price}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.iconBtn} onPress={() => openEditModal(item)}>
                <Ionicons name="pencil" size={18} color="#FFA000" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.iconBtn, { marginTop: 10, borderColor: '#FFEBEE', backgroundColor: '#FFEBEE' }]} onPress={() => handleDelete(item.id, item.name)}>
                <Ionicons name="trash" size={18} color="#D32F2F" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{height: 100}} /> 
      </ScrollView>

      {/* --- MODAL FORM --- */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{isEditMode ? 'Edit Produk' : 'Tambah Produk Baru'}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              
              {/* Upload Gambar */}
              <Text style={styles.label}>Gambar Produk</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {formImage ? (
                  <Image source={{ uri: formImage }} style={styles.imagePreview} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Ionicons name="camera-outline" size={30} color="#999" />
                    <Text style={styles.imageText}>Ketuk untuk upload gambar</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Nama Produk */}
              <Text style={styles.label}>Nama Produk</Text>
              <TextInput style={styles.input} value={formName} onChangeText={setFormName} placeholder="Contoh: Cardigan Anak" />

              {/* Dropdown Kategori */}
              <Text style={styles.label}>Kategori</Text>
              <TouchableOpacity style={styles.dropdownTrigger} onPress={() => setShowDropdown(!showDropdown)}>
                <Text style={{color: formCategory ? '#333' : '#999'}}>
                  {formCategory || "Pilih Kategori"}
                </Text>
                <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={20} color="#555" />
              </TouchableOpacity>
              
              {showDropdown && (
                <View style={styles.dropdownList}>
                  {categoryOptions.map((option, index) => (
                    <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => { setFormCategory(option); setShowDropdown(false); }}>
                      <Text style={styles.dropdownText}>{option}</Text>
                      {formCategory === option && <Ionicons name="checkmark" size={16} color="#5D4037" />}
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Harga */}
              <Text style={styles.label}>Harga (Angka saja)</Text>
              <TextInput style={styles.input} value={formPrice} onChangeText={setFormPrice} placeholder="Contoh: 50000" keyboardType="numeric" />

            </ScrollView>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Simpan Produk</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  // Login
  loginContainer: { flex: 1, backgroundColor: '#FBEce4', justifyContent: 'center', padding: 30 },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  loginTitle: { fontSize: 28, fontWeight: 'bold', color: '#5D4037', marginTop: 10 },
  loginSubtitle: { fontSize: 16, color: '#795548' },
  inputContainer: { backgroundColor: '#FFF', padding: 25, borderRadius: 15, elevation: 5 },
  loginButton: { backgroundColor: '#FFC107', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  loginButtonText: { fontWeight: 'bold', color: '#5D4037', fontSize: 16 },

  // Dashboard
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { backgroundColor: '#FFF', padding: 20, paddingTop: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#5D4037' },
  headerSubtitle: { fontSize: 14, color: '#999' },
  logoutBtn: { padding: 10, backgroundColor: '#FFEBEE', borderRadius: 8 },
  actionContainer: { padding: 20, paddingBottom: 10 },
  addButton: { backgroundColor: '#FFC107', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 10, shadowColor: "#000", shadowOffset: {width:0,height:2}, shadowOpacity:0.1 },
  addButtonText: { fontWeight: 'bold', color: '#5D4037', marginLeft: 8 },
  listContainer: { padding: 20 },
  
  // Card
  productCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 15, marginBottom: 15, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  productImage: { width: 70, height: 70, borderRadius: 10, backgroundColor: '#EEE' },
  productInfo: { flex: 1, paddingHorizontal: 15 },
  categoryBadge: { fontSize: 10, color: '#999', textTransform: 'uppercase', marginBottom: 4 },
  productName: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  productPrice: { fontSize: 15, color: '#E65100', fontWeight: 'bold' },
  actionButtons: { alignItems: 'center' },
  iconBtn: { padding: 8, borderRadius: 8, borderWidth: 1, borderColor: '#EEE' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#FFF', borderRadius: 15, padding: 20, maxHeight: '80%', elevation: 5 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#5D4037' },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: '#F9F9F9', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12 },
  
  // Image Picker
  imagePicker: { height: 120, borderWidth: 1, borderColor: '#DDD', borderStyle: 'dashed', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAFA', overflow: 'hidden' },
  imagePlaceholder: { alignItems: 'center' },
  imageText: { color: '#999', fontSize: 12, marginTop: 5 },
  imagePreview: { width: '100%', height: '100%', resizeMode: 'cover' },

  // Dropdown
  dropdownTrigger: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9F9F9', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12 },
  dropdownList: { borderWidth: 1, borderColor: '#EEE', borderRadius: 8, marginTop: 5, backgroundColor: '#FFF' },
  dropdownItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#F5F5F5', flexDirection: 'row', justifyContent: 'space-between' },
  dropdownText: { color: '#333' },

  saveButton: { backgroundColor: '#FFC107', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 25 },
  saveButtonText: { fontWeight: 'bold', color: '#5D4037', fontSize: 16 }
});