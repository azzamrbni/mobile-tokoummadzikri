import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Import Halaman
import HomeScreen from './screens/HomeScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import AdminScreen from './screens/AdminScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 1. Buat Kelompok Tab Menu Bawah
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#E65100',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Beranda') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Produk') iconName = focused ? 'shirt' : 'shirt-outline';
          else if (route.name === 'Tentang') iconName = focused ? 'information-circle' : 'information-circle-outline';
          else if (route.name === 'Kontak') iconName = focused ? 'call' : 'call-outline';
          else if (route.name === 'Admin') iconName = focused ? 'settings' : 'settings-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Beranda" component={HomeScreen} />
      
      {/* --- UPDATE DI SINI (LISTENER TAB) --- */}
      <Tab.Screen 
        name="Produk" 
        component={ProductListScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Mencegah aksi default (yaitu hanya pindah tab)
            e.preventDefault();
            // Paksa pindah dengan membawa parameter filter: 'Semua'
            navigation.navigate('Produk', { filter: 'Semua' });
          },
        })}
      />
      {/* ------------------------------------- */}

      <Tab.Screen name="Tentang" component={AboutScreen} />
      <Tab.Screen name="Kontak" component={ContactScreen} />
      <Tab.Screen name="Admin" component={AdminScreen} />
    </Tab.Navigator>
  );
}

// 2. Buat Navigasi Utama (Stack)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="DetailProduk" 
          component={ProductDetailScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}