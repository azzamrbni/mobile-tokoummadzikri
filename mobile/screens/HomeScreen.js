import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  StatusBar,
  Linking,
  RefreshControl 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'; // Agar refresh saat kembali ke Home

export default function HomeScreen({ navigation }) {
  // --- GANTI IP DI SINI ---
  const API_URL = 'http://172.20.10.5:3000/api/products';
  // ------------------------

  const [bestSellers, setBestSellers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Fungsi Fetch
  const fetchBestSellers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // Cek: Apakah data benar-benar Array?
      if (Array.isArray(data)) {
        setBestSellers(data.slice(0, 3)); 
      } else {
        // Kalau bukan array, berarti Error. Tampilkan di console laptop.
        console.log("ERROR DARI BACKEND:", data); 
        // Jangan set data kalau error
      }
    } catch (error) {
      console.error("Gagal fetch:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Otomatis refresh saat halaman dibuka
  useFocusEffect(
    useCallback(() => {
      fetchBestSellers();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchBestSellers();
  };

  // Data Statis Lainnya
  const features = [
    { id: 1, title: 'Lokal & Strategis', icon: 'location-outline' },
    { id: 2, title: 'Variasi Lengkap', icon: 'grid-outline' },
    { id: 3, title: 'Hemat Ongkir', icon: 'wallet-outline' },
    { id: 4, title: 'Pengiriman Cepat', icon: 'rocket-outline' },
  ];

  const categories = [
    { id: 1, name: 'Souvenir', icon: 'gift-outline' },
    { id: 2, name: 'Pakaian', icon: 'shirt-outline' },
    { id: 3, name: 'Makanan & Minuman', icon: 'fast-food-outline' },
  ];

  const testimonials = [
    { id: 1, name: 'Rina Sari', text: 'Saya sangat puas! Produk bayi dijual selalu fresh.', rating: 5 },
    { id: 2, name: 'Ahmad Hidayat', text: 'Toko merchandise islami terlengkap di Depok.', rating: 5 },
    { id: 3, name: 'Fitri Handayani', text: 'Pelayanan ramah dan cepat tanggap via WhatsApp.', rating: 5 },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBEce4" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        
        {/* --- HERO SECTION --- */}
        <View style={styles.heroContainer}>
          <Text style={styles.heroTitle}>
            Toko Perlengkapan Bayi dan Merchandise Islami Terlengkap di Depok
          </Text>
          <Text style={styles.heroSubtitle}>
            Belanja praktis untuk semua kebutuhan anak dan keluarga muslim Anda.
          </Text>
          
          <View style={styles.heroButtons}>
            <TouchableOpacity 
              style={[styles.btn, styles.btnPrimary]}
              onPress={() => navigation.navigate('Produk', { filter: 'Semua' })} 
            >
              <Text style={styles.btnTextPrimary}>Lihat Produk</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.btn, styles.btnOutline]}
              onPress={() => Linking.openURL('https://shopee.co.id')}
            >
              <Text style={styles.btnTextOutline}>Beli di Shopee</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- KEUNGGULAN --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitleCenter}>Keunggulan Kami</Text>
          <View style={styles.featuresGrid}>
            {features.map((item) => (
              <View key={item.id} style={styles.featureItem}>
                <View style={styles.featureIconBg}>
                  <Ionicons name={item.icon} size={24} color="#5D4037" />
                </View>
                <Text style={styles.featureText}>{item.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* --- KATEGORI --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Kategori Produk</Text>
          <View style={styles.categoryRow}>
            {categories.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.categoryCard}
                onPress={() => navigation.navigate('Produk', { filter: item.name })}
              >
                <View style={styles.categoryIconBg}>
                  <Ionicons name={item.icon} size={28} color="#FFF" />
                </View>
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* --- BEST SELLER (DARI API) --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Produk Terbaru</Text>
          {bestSellers.length === 0 ? (
             <Text style={{color: '#999', fontStyle: 'italic'}}>Belum ada produk.</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingBottom: 10}}>
              {bestSellers.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.productCard}
                  onPress={() => navigation.navigate('DetailProduk', { product: item })}
                >
                  <Image 
                    source={{ uri: item.image || 'https://via.placeholder.com/150' }} 
                    style={styles.productImage} 
                  />
                  <View style={styles.productInfo}>
                    <Text style={styles.productCategory}>{item.category}</Text>
                    <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.productPrice}>Rp {item.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* --- TESTIMONI --- */}
        <View style={[styles.sectionContainer, { paddingBottom: 40 }]}>
          <Text style={styles.sectionTitle}>Testimoni Pelanggan</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {testimonials.map((item) => (
              <View key={item.id} style={styles.testiCard}>
                <View style={{flexDirection: 'row', marginBottom: 8}}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Ionicons key={i} name="star" size={14} color="#FFC107" />
                  ))}
                </View>
                <Text style={styles.testiText}>"{item.text}"</Text>
                <Text style={styles.testiName}>- {item.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  
  heroContainer: {
    backgroundColor: '#FBEce4', 
    padding: 20, paddingTop: 80, paddingBottom: 40,
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30, alignItems: 'center',
  },
  heroTitle: { fontSize: 22, fontWeight: 'bold', color: '#5D4037', textAlign: 'center', marginBottom: 10 },
  heroSubtitle: { fontSize: 14, color: '#795548', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  heroButtons: { flexDirection: 'row', gap: 15 },
  btn: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  btnPrimary: { backgroundColor: '#FFC107' },
  btnTextPrimary: { fontWeight: 'bold', color: '#5D4037' },
  btnOutline: { borderWidth: 1, borderColor: '#5D4037' },
  btnTextOutline: { fontWeight: 'bold', color: '#5D4037' },

  sectionContainer: { marginTop: 25, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  sectionTitleCenter: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },

  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  featureItem: { width: '45%', alignItems: 'center', marginBottom: 20 },
  featureIconBg: { width: 50, height: 50, backgroundColor: '#FFF3E0', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  featureText: { fontSize: 12, fontWeight: '600', color: '#555', textAlign: 'center' },

  categoryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  categoryCard: { alignItems: 'center', width: '30%' }, 
  categoryIconBg: { width: 60, height: 60, backgroundColor: '#FFC107', borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 8, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.1, elevation:3 },
  categoryText: { fontSize: 12, fontWeight: 'bold', color: '#555', textAlign: 'center' },

  productCard: { width: 140, marginRight: 15, backgroundColor: '#FFF', borderRadius: 12, shadowColor: "#000", shadowOffset: {width:0, height:1}, shadowOpacity:0.1, elevation:2, marginBottom: 10, overflow: 'hidden' },
  productImage: { width: '100%', height: 120, backgroundColor: '#EEE' },
  productInfo: { padding: 10 },
  productCategory: { fontSize: 10, color: '#999', marginBottom: 2 },
  productName: { fontSize: 12, fontWeight: 'bold', color: '#333', height: 32, marginBottom: 4 },
  productPrice: { fontSize: 12, fontWeight: 'bold', color: '#E65100' },

  testiCard: { width: 250, backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginRight: 15, borderWidth: 1, borderColor: '#EEE' },
  testiText: { fontSize: 13, color: '#666', fontStyle: 'italic', marginBottom: 10, lineHeight: 18 },
  testiName: { fontSize: 12, fontWeight: 'bold', color: '#333' },
});