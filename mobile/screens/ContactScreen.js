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
  ActivityIndicator,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import Logo
const logoImage = require('../assets/tokoummadzikrilogo-removebg-preview.png');

export default function ContactScreen() {
  
  const API_URL = 'https://mobile-tokoummadzikri.vercel.app/api/messages';

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6e3d7" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* === BAGIAN 1: HERO & STORY === */}
        <View style={styles.hero}>
          <Image source={logoImage} style={styles.logoHero} />
          <Text style={styles.heroTitle}>Tentang & Kontak</Text>
          <Text style={styles.heroSubtitle}>Mengenal lebih dekat Toko Umma Dzikri dan cara menghubungi kami.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Cerita Kami</Text>
          <Text style={styles.paragraph}>
            Berawal dari fokus pada popok, Toko Umma Dzikri berkembang untuk menjawab kebutuhan para ibu. 
            Kami melihat para ibu ingin belanja praktis, sehingga kami melengkapi toko kami dengan pakaian, 
            makanan bergizi, mainan edukatif, hingga kini merchandise islami.
          </Text>
          <Text style={styles.paragraph}>
            Berlokasi di Depok, kami bangga menjadi bagian dari komunitas lokal dan melayani keluarga-keluarga 
            di sekitar kami.
          </Text>
        </View>

        {/* Visi Misi Cards */}
        <View style={styles.cardsContainer}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Visi Kami</Text>
            <Text style={styles.cardText}>
              Menjadi toko perlengkapan anak dan keluarga muslim terlengkap, terpercaya, dan terdekat bagi masyarakat Depok.
            </Text>
          </View>
        </View>

        {/* === GABUNGAN SECTION: KENAPA MEMILIH KAMI & NILAI KAMI === */}
        <View style={styles.combinedSection}>
          
          {/* Bagian Atas: Kenapa Memilih Kami */}
          <View style={styles.subSection}>
            <Text style={[styles.sectionHeader, {color: '#f6e3d7', textAlign: 'center'}]}>Kenapa Memilih Kami?</Text>
            
            <View style={styles.horizontalRow}>
              {/* Item 1 */}
              <View style={styles.centerItem}>
                <View style={[styles.iconBgFeature, { backgroundColor: '#f6e3d7' }]}>
                   <Ionicons name="location" size={24} color="#5a3623" />
                </View>
                <Text style={styles.featureTitle}>Lokasi Strategis</Text>
                <Text style={styles.featureDesc}>Mudah dijangkau</Text>
              </View>

              {/* Item 2 */}
              <View style={styles.centerItem}>
                <View style={[styles.iconBgFeature, { backgroundColor: '#f6e3d7' }]}>
                   <Ionicons name="bag-handle" size={24} color="#5a3623" />
                </View>
                <Text style={styles.featureTitle}>Belanja Praktis</Text>
                <Text style={styles.featureDesc}>Lengkap & Hemat</Text>
              </View>

              {/* Item 3 */}
              <View style={styles.centerItem}>
                <View style={[styles.iconBgFeature, { backgroundColor: '#f6e3d7' }]}>
                   <Ionicons name="shield-checkmark" size={24} color="#5a3623" />
                </View>
                <Text style={styles.featureTitle}>Kualitas Terjamin</Text>
                <Text style={styles.featureDesc}>Produk Aman</Text>
              </View>
            </View>
          </View>

          {/* DIVIDER PEMBATAS */}
          <View style={styles.brownDivider} />

          {/* Bagian Bawah: Nilai-Nilai Kami */}
          <View style={styles.subSection}>
            <Text style={[styles.sectionHeader, {color: '#f6e3d7', textAlign: 'center'}]}>Nilai-Nilai Kami</Text>
            
            <View style={styles.horizontalRow}>
              {/* Item 1 */}
              <View style={styles.centerItem}>
                <Ionicons name="shield-checkmark-outline" size={28} color="#f6e3d7" style={{ marginBottom: 8 }} />
                <Text style={styles.valueHead}>Amanah</Text>
                <Text style={styles.valueDesc}>Jujur & Terpercaya</Text>
              </View>
              
              {/* Item 2 */}
              <View style={styles.centerItem}>
                <Ionicons name="heart-outline" size={28} color="#f6e3d7" style={{ marginBottom: 8 }} />
                <Text style={styles.valueHead}>Berkah</Text>
                <Text style={styles.valueDesc}>Manfaat Bersama</Text>
              </View>
              
              {/* Item 3 */}
              <View style={styles.centerItem}>
                <Ionicons name="ribbon-outline" size={28} color="#f6e3d7" style={{ marginBottom: 8 }} />
                <Text style={styles.valueHead}>Profesional</Text>
                <Text style={styles.valueDesc}>Standar Tinggi</Text>
              </View>
            </View>
          </View>

        </View>


        {/* === BAGIAN 2: CONTACT INFO === */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Hubungi Kami</Text>
          
          <View style={styles.cardForm}>
            {/* Alamat */}
            <View style={styles.contactItem}>
              <View style={styles.iconBg}><Ionicons name="location" size={20} color="#5a3623" /></View>
              <View>
                <Text style={styles.contactLabel}>Alamat Toko</Text>
                <Text style={styles.contactValue}>Jl. Raya Margonda No. 123, Depok</Text>
              </View>
            </View>

            {/* WhatsApp */}
            <TouchableOpacity 
              style={styles.contactItem}
              onPress={() => openLink('https://wa.me/+6285888131362')}
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

          {/* Platform Buttons */}
          <Text style={[styles.sectionHeader, {fontSize: 16, marginTop: 10}]}>Temukan Kami di Marketplace</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
            <TouchableOpacity 
              style={[styles.platformBtn, { backgroundColor: '#EE4D2D' }]} 
              onPress={() => openLink('https://id.shp.ee/yU8Gj2W')}
            >
              <Ionicons name="bag-handle" size={20} color="#FFF" />
              <Text style={styles.platformText}>Shopee</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.platformBtn, { backgroundColor: '#E1306C' }]}
              onPress={() => openLink('https://www.instagram.com/tokoummadzikri?igsh=OW81cmFjNWVpbDAx')}
            >
              <Ionicons name="logo-instagram" size={20} color="#FFF" />
              <Text style={styles.platformText}>Instagram</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* === BAGIAN 3: FORM PESAN === */}
        <View style={[styles.section, {backgroundColor: '#FAFAFA', paddingBottom: 40}]}>
          <Text style={styles.sectionHeader}>Kirim Pesan</Text>
          <View style={styles.cardForm}>
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
                <ActivityIndicator color="#5a3623" />
              ) : (
                <>
                  <Ionicons name="paper-plane" size={18} color="#5a3623" style={{marginRight: 8}} />
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
  mainContainer: { flex: 1, backgroundColor: '#FFF' },
  
  // Hero
  hero: { backgroundColor: '#FBEce4', padding: 20, paddingTop: 60, alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  logoHero: { width: 120, height: 100, resizeMode: 'contain', marginBottom: 10 },
  heroTitle: { fontSize: 24, fontWeight: 'bold', color: '#5a3623', marginBottom: 5 },
  heroSubtitle: { fontSize: 14, color: '#795548', textAlign: 'center', marginBottom: 10 },

  // General Section
  section: { padding: 20 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#5a3623', marginBottom: 15, textAlign: 'center' },
  paragraph: { fontSize: 14, color: '#555', lineHeight: 22, marginBottom: 10, textAlign: 'justify' },

  // Vision Card
  cardsContainer: { paddingHorizontal: 20 },
  cardInfo: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#EEE', shadowColor: "#000", shadowOffset: {width:0, height:1}, shadowOpacity:0.05, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#5a3623', marginBottom: 8, textAlign: 'center' },
  cardText: { fontSize: 14, color: '#666', fontStyle: 'italic', lineHeight: 20, textAlign: 'center' },

  // === STYLES BARU UNTUK BAGIAN GABUNGAN ===
  combinedSection: { backgroundColor: '#5a3623', marginVertical: 20, paddingVertical: 25, paddingHorizontal: 20 },
  subSection: { marginBottom: 10 },
  brownDivider: { height: 1, backgroundColor: '#7d5a44', width: '100%', marginVertical: 20 }, // Pembatas tipis
  
  horizontalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  centerItem: { alignItems: 'center', width: '30%' }, // Agar 3 item muat pas
  
  // Style Feature (Kenapa Memilih Kami)
  iconBgFeature: { width: 50, height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  featureTitle: { fontSize: 13, fontWeight: 'bold', color: '#FFF', marginBottom: 2, textAlign: 'center' },
  featureDesc: { fontSize: 11, color: '#EEE', textAlign: 'center' },

  // Style Values (Nilai Kami)
  valueHead: { color: '#f6e3d7', fontWeight: 'bold', marginBottom: 2, fontSize: 13, textAlign: 'center' },
  valueDesc: { color: '#DBC4B8', fontSize: 11, textAlign: 'center' },

  // Contact Info
  cardForm: { backgroundColor: '#FFF', borderRadius: 12, padding: 20, shadowColor: "#000", shadowOffset: {width:0, height:1}, shadowOpacity:0.1, elevation: 2 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  iconBg: { width: 40, height: 40, backgroundColor: '#F5F5F5', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  contactLabel: { fontSize: 12, color: '#999', marginBottom: 2 },
  contactValue: { fontSize: 14, color: '#333', fontWeight: '600' },
  linkText: { fontSize: 12, color: '#25D366', fontWeight: 'bold', marginTop: 2 },
  
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 15 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  timeLabel: { fontSize: 14, color: '#555' },
  timeValue: { fontSize: 14, fontWeight: 'bold', color: '#333' },

  // Platform Buttons
  platformBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 8 },
  platformText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 },

  // Form
  formLabel: { fontSize: 14, fontWeight: '600', color: '#5a3623', marginBottom: 8 },
  input: { backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 14 },
  sendButton: { backgroundColor: '#FFC107', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, borderRadius: 8, marginTop: 5 },
  sendButtonText: { fontWeight: 'bold', color: '#5a3623' },
});