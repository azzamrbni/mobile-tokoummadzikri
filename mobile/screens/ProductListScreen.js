import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Alert
} from 'react-native';

export default function ProductListScreen({ navigation, route }) {
  const API_URL = 'https://mobile-tokoummadzikri.vercel.app/api/products';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Souvenir', 'Pakaian', 'Makanan & Minuman'];

  // Helper format uang (Rp 15.000)
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.log("ERROR DARI BACKEND:", data);
        Alert.alert("Data Error", "Gagal memuat produk. Cek terminal laptop.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
  }, []);

  // UPDATED: Logika ini diperbaiki agar filter bekerja dengan benar
  useEffect(() => {
    if (route.params?.filter) {
      console.log("Menerapkan Filter:", route.params.filter);
      setSelectedCategory(route.params.filter);
      // NOTE: Saya menghapus navigation.setParams({ filter: undefined }) 
      // karena itu menyebabkan filter langsung ter-reset sebelum sempat diterapkan.
    }
  }, [route.params?.filter]); // Hanya dijalankan jika filter berubah

  const filteredProducts = selectedCategory === 'Semua' 
    ? products 
    : products.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFC107" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Koleksi Produk</Text>
        <Text style={styles.headerSubtitle}>Temukan semua kebutuhan Anda di sini</Text>
      </View>

      {/* Filter Kategori */}
      <View style={{ height: 50 }}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.categoryPill, 
                selectedCategory === cat && styles.categoryPillActive
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[
                styles.categoryText, 
                selectedCategory === cat && styles.categoryTextActive
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Grid Produk */}
      <ScrollView 
        contentContainerStyle={styles.productList} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FFC107']} />
        }
      >
        <View style={styles.grid}>
          {filteredProducts.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.card}
              onPress={() => navigation.navigate('DetailProduk', { product: item })}
            >
              <Image 
                source={{ uri: item.image || 'https://via.placeholder.com/150' }} 
                style={styles.image} 
              />
              <View style={styles.cardContent}>
                <Text style={styles.productCategory}>{item.category}</Text>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                {/* UPDATED: Menggunakan formatPrice */}
                <Text style={styles.productPrice}>Rp {formatPrice(item.price)}</Text>
                
                <TouchableOpacity 
                  style={styles.btnDetail}
                  onPress={() => navigation.navigate('DetailProduk', { product: item })}
                >
                  <Text style={styles.btnDetailText}>Selengkapnya</Text>
                </TouchableOpacity>

              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {filteredProducts.length === 0 && (
          <Text style={styles.emptyText}>Belum ada produk di kategori ini.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  header: { padding: 20, paddingTop: 80, backgroundColor: '#FFF', alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#5a3623', marginBottom: 5 },
  headerSubtitle: { fontSize: 14, color: '#795548' },

  categoryContainer: { paddingHorizontal: 15, alignItems: 'center', paddingBottom: 10 },
  categoryPill: {
    paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20,
    backgroundColor: '#EEE', marginRight: 10, borderWidth: 1, borderColor: 'transparent'
  },
  categoryPillActive: { backgroundColor: '#5a3623', borderColor: '#5a3623' },
  categoryText: { fontSize: 14, color: '#666' },
  categoryTextActive: { color: '#FFF', fontWeight: 'bold' },

  productList: { padding: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: '48%', backgroundColor: '#FFF', borderRadius: 12, marginBottom: 15,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, elevation: 2,
    overflow: 'hidden'
  },
  image: { width: '100%', height: 150, backgroundColor: '#DDD' },
  cardContent: { padding: 12 },
  productCategory: { fontSize: 10, color: '#999', textTransform: 'uppercase', marginBottom: 4 },
  productName: { fontSize: 14, fontWeight: 'bold', color: '#333', height: 40, marginBottom: 4 },
  productPrice: { fontSize: 14, color: '#E65100', fontWeight: 'bold', marginBottom: 10 },
  
  btnDetail: { backgroundColor: '#5a3623', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  btnDetailText: { fontSize: 12, fontWeight: 'bold', color: '#f6e3d7' },
  
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' }
});