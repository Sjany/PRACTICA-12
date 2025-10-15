import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'; 


const CryptoIcon = ({ name }) => {
  const getInitial = name.charAt(0).toUpperCase();
  const colors = {
    b: '#f7931a', 
    e: '#627eea', 
    d: '#c2a633', 
    s: '#9945FF', 
  };
  const backgroundColor = colors[getInitial.toLowerCase()] || '#6b7280';

  return (
    <View style={[styles.iconContainer, { backgroundColor }]}>
      <Text style={styles.iconText}>{getInitial}</Text>
    </View>
  );
};

const LoadingSpinner = () => (
  <View style={styles.spinnerContainer}>
    <ActivityIndicator size="large" color="#a78bfa" />
  </View>
);

const CryptoCard = ({ name, data }) => {
  const price = data?.usd?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const change = data?.usd_24h_change;
  const isPositive = change >= 0;

  return (
    <View style={styles.card}>
      <CryptoIcon name={name} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{name}</Text>
        <Text style={styles.cardPrice}>{price || 'N/A'}</Text>
      </View>
      <View
        style={[
          styles.changeContainer,
          isPositive ? styles.positiveChangeBg : styles.negativeChangeBg,
        ]}>
        <Text
          style={isPositive ? styles.positiveChange : styles.negativeChange}>
          {change ? `${isPositive ? '+' : ''}${change.toFixed(2)}%` : '...'}
        </Text>
      </View>
    </View>
  );
};

// Componente Principal de la App
export default function App() {
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const API_URL =
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,solana&vs_currencies=usd&include_24hr_change=true';

  useEffect(() => {
    const loadCache = async () => {
      setLoading(true);
      try {
        const savedData = await AsyncStorage.getItem('cryptoDataCache');
        if (savedData !== null) {
          setCryptoData(JSON.parse(savedData));
        }
        const savedTimestamp = await AsyncStorage.getItem('cryptoTimestamp');
        if (savedTimestamp !== null) {
          setLastUpdated(new Date(savedTimestamp));
        }
      } catch (e) {
        console.error('Error leyendo de AsyncStorage', e);
        setError('No se pudo leer el caché.');
      }
      setLoading(false);
    };
    loadCache();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        const data = await response.json();
        const newTimestamp = new Date();
        setCryptoData(data);
        setLastUpdated(newTimestamp);

        // Guardar en AsyncStorage
        await AsyncStorage.setItem('cryptoDataCache', JSON.stringify(data));
        await AsyncStorage.setItem(
          'cryptoTimestamp',
          newTimestamp.toISOString()
        );
      } catch (err) {
        console.error('Fallo al obtener los datos de criptomonedas:', err);
        setError(
          'No se pudo conectar al servidor. Mostrando últimos datos guardados.'
        );
      }
    };

    fetchData(); // Carga inicial
    const intervalId = setInterval(fetchData, 60000); 
    return () => clearInterval(intervalId); 
  }, []);

  const renderContent = () => {
    if (loading && !cryptoData) {
      return <LoadingSpinner />;
    }

    if (cryptoData) {
      const dataArray = Object.keys(cryptoData).map(key => ({
        id: key,
        name: key,
        ...cryptoData[key],
      }));

      return (
        <FlatList
          data={dataArray}
          renderItem={({ item }) => <CryptoCard name={item.name} data={item} />}
          keyExtractor={item => item.id}
          ListFooterComponent={
            lastUpdated && (
              <Text style={styles.footerText}>
                {`Última actualización: ${lastUpdated.toLocaleTimeString()}`}
              </Text>
            )
          }
        />
      );
    }
    
    if (!loading && !cryptoData) {
      return (
        <View style={styles.centeredMessage}>
          <Text style={styles.footerText}>No hay datos disponibles.</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crypto Tracker</Text>
        <Text style={styles.subtitle}>
          Precios actualizados
        </Text>
      </View>

      {error && !loading && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      {renderContent()}
    </SafeAreaView>
  );
}