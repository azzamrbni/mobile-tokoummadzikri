import React from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBEce4" />
      
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Tentang Kami</Text>
        <Text style={styles.heroSubtitle}>Cerita perjalanan Toko Umma Dzikri melayani keluarga Indonesia</Text>
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
          di sekitar kami. Kami berkomitmen menyediakan produk berkualitas tinggi dengan harga terjangkau.
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Visi Kami</Text>
          <Text style={styles.cardText}>
            Menjadi toko perlengkapan anak dan keluarga muslim terlengkap, terpercaya, dan terdekat bagi masyarakat Depok.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Misi Kami</Text>
          <View style={styles.listItem}>
            <Ionicons name="checkmark-circle" size={16} color="#FFC107" />
            <Text style={styles.listText}>Menyediakan produk berkualitas tinggi.</Text>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="checkmark-circle" size={16} color="#FFC107" />
            <Text style={styles.listText}>Pelayanan ramah dan profesional.</Text>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="checkmark-circle" size={16} color="#FFC107" />
            <Text style={styles.listText}>Menghadirkan kemudahan berbelanja.</Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: '#F9FAFB' }]}>
        <Text style={styles.sectionHeader}>Kenapa Memilih Kami?</Text>
        <View style={styles.gridFeatures}>
          <FeatureItem 
            icon="location" 
            title="Kami Hadir di Depok" 
            desc="Lokasi strategis memudahkan Anda belanja langsung atau via ojek online."
          />
          <FeatureItem 
            icon="bag-handle" 
            title="Belanja Praktis" 
            desc="Semua kebutuhan anak (makanan, pakaian, mainan) ada di satu tempat."
          />
          <FeatureItem 
            icon="shield-checkmark" 
            title="Kualitas Terjamin" 
            desc="Produk lolos seleksi ketat, aman, dan tidak expired."
          />
          <FeatureItem 
            icon="heart" 
            title="Sepenuh Hati" 
            desc="Tim kami siap membantu menjawab pertanyaan Anda dengan ramah."
          />
        </View>
      </View>

      <View style={styles.footerValues}>
        <Text style={styles.footerTitle}>Nilai-Nilai Kami</Text>
        <View style={styles.valueRow}>
          <View style={styles.valueItem}>
            <Text style={styles.valueHead}>Amanah</Text>
            <Text style={styles.valueDesc}>Jujur & Terpercaya</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueHead}>Berkah</Text>
            <Text style={styles.valueDesc}>Manfaat Bersama</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueHead}>Profesional</Text>
            <Text style={styles.valueDesc}>Standar Tinggi</Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}

// Komponen Kecil untuk Grid
function FeatureItem({ icon, title, desc }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.iconBg}>
        <Ionicons name={icon} size={20} color="#5D4037" />
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDesc}>{desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  
  // Hero
  hero: { backgroundColor: '#FBEce4', padding: 30, paddingTop: 80, alignItems: 'center' },
  heroTitle: { fontSize: 24, fontWeight: 'bold', color: '#5D4037', marginBottom: 5 },
  heroSubtitle: { fontSize: 14, color: '#795548', textAlign: 'center' },

  // Sections Common
  section: { padding: 25 },
  sectionHeader: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15, textAlign: 'center' },
  paragraph: { fontSize: 14, color: '#666', lineHeight: 22, marginBottom: 15, textAlign: 'justify' },

  // Visi Misi Cards
  cardsContainer: { paddingHorizontal: 20 },
  card: { 
    backgroundColor: '#FFF', padding: 20, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#EEE',
    shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.05, elevation: 1
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#5D4037', marginBottom: 10 },
  cardText: { fontSize: 14, color: '#555', lineHeight: 20 },
  listItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  listText: { fontSize: 14, color: '#555', marginLeft: 10 },

  // Kenapa Memilih Kami Grid
  gridFeatures: { marginTop: 10 },
  featureItem: { flexDirection: 'row', marginBottom: 20, alignItems: 'flex-start' },
  iconBg: { 
    width: 40, height: 40, backgroundColor: '#FFC107', borderRadius: 20, 
    justifyContent: 'center', alignItems: 'center', marginRight: 15 
  },
  featureTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  featureDesc: { fontSize: 13, color: '#666', lineHeight: 18 },

  // Footer Values
  footerValues: { backgroundColor: '#5D4037', padding: 30, alignItems: 'center' },
  footerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 20 },
  valueRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  valueItem: { alignItems: 'center', width: '30%' },
  valueHead: { fontSize: 14, fontWeight: 'bold', color: '#FFC107', marginBottom: 5 },
  valueDesc: { fontSize: 11, color: '#DDD', textAlign: 'center' }
});