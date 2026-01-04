import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, StatusBar } from 'react-native';
// Note: Image tidak perlu di-import lagi

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBEce4" />
      
      <View style={styles.textContainer}>
        {/* Bagian Image sudah dihapus */}
        <Text style={styles.title}>Toko Umma Dzikri</Text>
        <Text style={styles.subtitle}>Perlengkapan Bayi & Merchandise Islami</Text>
      </View>

      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#5D4037" />
        <Text style={styles.loadingText}>Memuat Aplikasi...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBEce4', // Latar belakang krem
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    // marginBottom dikurangi sedikit karena tidak ada logo
    marginBottom: 30, 
  },
  // Style 'logo' dihapus
  title: {
    fontSize: 30, // Ukuran font diperbesar agar lebih menonjol
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 10, // Jarak ke subtitle
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16, // Ukuran font diperbesar sedikit
    color: '#795548',
    textAlign: 'center',
    paddingHorizontal: 20, // Agar tidak terlalu mepet pinggir di layar kecil
  },
  footer: {
    position: 'absolute',
    bottom: 50, // Posisi loading di bawah
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    color: '#5D4037',
    fontSize: 14,
  }
});