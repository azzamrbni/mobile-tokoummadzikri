import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Linking,
  Alert,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactScreen() {
  
  // --- KONFIGURASI API (GANTI DENGAN IP LAPTOP KAMU) ---
  const API_URL = 'http://172.20.10.5:3000/api/messages'; 
  // -----------------------------------------------------

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fungsi Kirim Pesan ke Backend
  const handleSendMessage = async () => {
    if (!name || !contact || !message) {
      Alert.alert('Mohon Lengkapi', 'Nama, Kontak, dan Pesan harus diisi ya Bunda.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: name, 
          contact: contact, 
          message: message 
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Berhasil', 'Pesan sudah kami terima. Terima kasih!');
        setName('');
        setContact('');
        setMessage('');
      } else {
        throw new Error(result.error || 'Gagal mengirim pesan');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Gagal', 'Terjadi kesalahan jaringan. Pastikan backend nyala & IP benar.');
    } finally {
      setLoading(false);
    }
  };

  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBEce4" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* --- HEADER HERO --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Hubungi Kami</Text>
          <Text style={styles.headerSubtitle}>
            Kami siap membantu Anda! Hubungi kami melalui berbagai kanal yang tersedia.
          </Text>
        </View>

        <View style={styles.contentContainer}>
          
          {/* 1. INFORMASI KONTAK */}
          <Text style={styles.sectionTitle}>Informasi Kontak</Text>
          <View style={styles.card}>
            {/* Alamat */}
            <View style={styles.contactItem}>
              <View style={styles.iconBg}><Ionicons name="location" size={20} color="#5D4037" /></View>
              <View>
                <Text style={styles.contactLabel}>Alamat Toko</Text>
                <Text style={styles.contactValue}>Jl. Raya Margonda No. 123, Depok</Text>
              </View>
            </View>
            
            {/* WhatsApp */}
            <TouchableOpacity 
              style={styles.contactItem}
              onPress={() => openLink('https://wa.me/6281234567890')}
            >
              <View style={[styles.iconBg, {backgroundColor: '#E0F2F1'}]}>
                <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
              </View>
              <View>
                <Text style={styles.contactLabel}>WhatsApp</Text>
                <Text style={styles.contactValue}>+62 812-3456-7890</Text>
                <Text style={styles.linkText}>Chat Sekarang →</Text>
              </View>
            </TouchableOpacity>

            {/* Email */}
            <View style={styles.contactItem}>
              <View style={styles.iconBg}><Ionicons name="mail" size={20} color="#5D4037" /></View>
              <View>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>info@tokoummadzikri.com</Text>
              </View>
            </View>

            {/* Jam Operasional */}
            <View style={styles.divider} />
            <Text style={styles.contactLabel}>Jam Operasional</Text>
            <View style={styles.rowBetween}>
              <Text style={styles.timeLabel}>Senin - Jumat</Text>
              <Text style={styles.timeValue}>09:00 - 20:00</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.timeLabel}>Sabtu - Minggu</Text>
              <Text style={styles.timeValue}>10:00 - 18:00</Text>
            </View>
          </View>

          {/* 2. PLATFORM BELANJA */}
          <Text style={styles.sectionTitle}>Belanja di Platform Kami</Text>
          <View style={styles.platformGrid}>
            <TouchableOpacity 
              style={[styles.platformBtn, { backgroundColor: '#EE4D2D' }]} 
              onPress={() => openLink('https://shopee.co.id')}
            >
              <Ionicons name="bag-handle" size={24} color="#FFF" />
              <Text style={styles.platformText}>Shopee</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.platformBtn, { backgroundColor: '#42B549' }]}
              onPress={() => openLink('https://tokopedia.com')}
            >
              <Ionicons name="cart" size={24} color="#FFF" />
              <Text style={styles.platformText}>Tokopedia</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={[styles.platformBtn, { backgroundColor: '#E1306C', marginBottom: 25 }]}
            onPress={() => openLink('https://instagram.com')}
          >
            <Ionicons name="logo-instagram" size={24} color="#FFF" />
            <Text style={styles.platformText}>Instagram</Text>
          </TouchableOpacity>

          {/* 3. FORM KIRIM PESAN */}
          <Text style={styles.sectionTitle}>Kirim Pesan</Text>
          <View style={styles.card}>
            <Text style={styles.formLabel}>Nama Lengkap</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Masukkan nama Anda" 
              value={name} onChangeText={setName}
            />

            <Text style={styles.formLabel}>Email / WhatsApp</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Contoh: 08123456789" 
              value={contact} onChangeText={setContact}
            />

            <Text style={styles.formLabel}>Pesan</Text>
            <TextInput 
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]} 
              placeholder="Tulis pesan Anda di sini..." 
              multiline={true}
              value={message} onChangeText={setMessage}
            />

            <TouchableOpacity 
              style={[styles.sendButton, loading && {backgroundColor: '#FFECB3'}]} 
              onPress={handleSendMessage}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#5D4037" />
              ) : (
                <>
                  <Ionicons name="paper-plane" size={18} color="#5D4037" style={{marginRight: 8}} />
                  <Text style={styles.sendButtonText}>Kirim Pesan</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  
  header: {
    backgroundColor: '#FBEce4', 
    padding: 30, 
    paddingTop: 80, // Padding atas lebih besar agar tidak kena poni HP
    alignItems: 'center', 
    marginBottom: 10
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#5D4037', marginBottom: 8 },
  headerSubtitle: { fontSize: 14, color: '#795548', textAlign: 'center', lineHeight: 20 },
  
  contentContainer: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15, marginTop: 10 },
  
  // Card Styles
  card: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 20, marginBottom: 20,
    shadowColor: "#000", shadowOffset: {width:0, height:1}, shadowOpacity:0.1, elevation: 2
  },
  
  // Contact Items
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  iconBg: {
    width: 40, height: 40, backgroundColor: '#F5F5F5', borderRadius: 8,
    justifyContent: 'center', alignItems: 'center', marginRight: 15
  },
  contactLabel: { fontSize: 12, color: '#999', marginBottom: 2 },
  contactValue: { fontSize: 14, color: '#333', fontWeight: '600' },
  linkText: { fontSize: 12, color: '#25D366', fontWeight: 'bold', marginTop: 2 },
  
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 15 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  timeLabel: { fontSize: 14, color: '#555' },
  timeValue: { fontSize: 14, fontWeight: 'bold', color: '#333' },

  // Platform Buttons
  platformGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  platformBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 12, borderRadius: 8, marginHorizontal: 5
  },
  platformText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 },

  // Form Styles
  formLabel: { fontSize: 14, fontWeight: '600', color: '#5D4037', marginBottom: 8 },
  input: {
    backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#DDD', borderRadius: 8,
    padding: 12, marginBottom: 15, fontSize: 14
  },
  sendButton: {
    backgroundColor: '#FFC107', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    paddingVertical: 12, borderRadius: 8, marginTop: 5
  },
  sendButtonText: { fontWeight: 'bold', color: '#5D4037' }
});