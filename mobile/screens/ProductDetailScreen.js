import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, Image, ScrollView, 
  TouchableOpacity, Linking, StatusBar, Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;

  // LOGIKA PENTING:
  // Kita harus handle apakah data pakai format lama ('image') atau baru ('images')
  let displayImages = [];
  if (product.images && product.images.length > 0) {
    displayImages = product.images; // Array baru
  } else if (product.image) {
    displayImages = [product.image]; // Format lama dijadikan array
  } else {
    displayImages = ['https://via.placeholder.com/300']; // Placeholder
  }

  // State untuk indikator slide (titik-titik)
  const [activeSlide, setActiveSlide] = useState(0);

  const onScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    if (slide !== activeSlide) {
      setActiveSlide(slide);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header Custom */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#5D4037" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Produk</Text>
        <View style={{width: 24}} /> 
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 120}}>
        
        {/* --- IMAGE SLIDER --- */}
        <View>
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
          >
            {displayImages.map((img, index) => (
              <Image 
                key={index}
                source={{ uri: img }} 
                style={styles.image} 
                resizeMode="cover" 
              />
            ))}
          </ScrollView>
          
          {/* Indikator Titik (Pagination Dots) */}
          {displayImages.length > 1 && (
            <View style={styles.pagination}>
              {displayImages.map((_, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.dot, 
                    activeSlide === index ? styles.activeDot : styles.inactiveDot
                  ]} 
                />
              ))}
            </View>
          )}
        </View>
        {/* -------------------- */}

        <View style={styles.infoContainer}>
          <View style={styles.tagContainer}><Text style={styles.tagText}>{product.category}</Text></View>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>Rp {product.price}</Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Deskripsi Produk</Text>
          <Text style={styles.description}>
            Produk berkualitas dari Toko Umma Dzikri. Tersedia dalam berbagai pilihan menarik. 
            Hubungi kami untuk info lebih lanjut.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.btn, {backgroundColor: '#FFC107'}]} onPress={() => Linking.openURL('https://shopee.co.id')}>
          <Text style={{fontWeight: 'bold', color: '#5D4037'}}>Beli di Shopee</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, {borderWidth:1, borderColor:'#5D4037', marginTop:10}]} onPress={() => Linking.openURL('https://wa.me/628123')}>
          <Text style={{fontWeight: 'bold', color: '#5D4037'}}>Tanya via WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#5D4037' },
  
  // Style Slider
  image: { width: width, height: 350, backgroundColor: '#f0f0f0' },
  pagination: { flexDirection: 'row', position: 'absolute', bottom: 10, alignSelf: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  activeDot: { backgroundColor: '#FFC107' },
  inactiveDot: { backgroundColor: 'rgba(255,255,255,0.5)' },

  infoContainer: { padding: 25 },
  tagContainer: { alignSelf: 'flex-start', backgroundColor: '#FBEce4', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginBottom: 10 },
  tagText: { color: '#5D4037', fontSize: 12, fontWeight: 'bold' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  price: { fontSize: 20, fontWeight: 'bold', color: '#E65100', marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#EEE', marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  description: { lineHeight: 22, color: '#666' },
  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
  btn: { padding: 15, borderRadius: 8, alignItems: 'center' }
});