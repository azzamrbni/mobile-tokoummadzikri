import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ContactScreen from './screens/ContactScreen';
import AdminScreen from './screens/AdminScreen';
import SplashScreen from './screens/SplashScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// --- 1. MEMBUAT TAB NAVIGATOR (Menu Bawah) ---
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Beranda') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Produk') iconName = focused ? 'grid' : 'grid-outline';
          else if (route.name === 'Kontak') iconName = focused ? 'call' : 'call-outline';
          else if (route.name === 'Admin') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#5D4037',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Header disembunyikan karena tiap screen punya header sendiri
      })}
    >
      <Tab.Screen name="Beranda" component={HomeScreen} />
      
      {/* Sekarang Tab Produk langsung ke List, tidak lewat Stack lagi */}
      <Tab.Screen name="Produk" component={ProductListScreen} />
      
      <Tab.Screen name="Kontak" component={ContactScreen} />
      <Tab.Screen name="Admin" component={AdminScreen} />
    </Tab.Navigator>
  );
}

// --- 2. APP UTAMA (ROOT STACK) ---
export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isShowSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {/* Stack Utama yang membungkus semuanya */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/* Halaman Utama adalah Tab Bar */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
        
        {/* Halaman Detail ditaruh DI LUAR Tab, supaya menutupi menu bawah saat dibuka */}
        {/* Dan bisa diakses dari Home maupun Produk */}
        <Stack.Screen name="DetailProduk" component={ProductDetailScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}