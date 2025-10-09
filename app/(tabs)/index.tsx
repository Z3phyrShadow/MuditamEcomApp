import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import ProductCard from '@/components/ProductCard';

// Helper to get a random color for demonstration
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function HomeScreen() {
  const [layout, setLayout] = useState<'vertical' | 'horizontal'>('vertical');
  const [buttonColor, setButtonColor] = useState('#FFD426');
  const [priceVisible, setPriceVisible] = useState(true);

  const handleAddToCart = (productName: string) => {
    console.log(`Added ${productName} to cart`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={() => setLayout(p => p === 'vertical' ? 'horizontal' : 'vertical')}>
          <Text style={styles.controlText}>Toggle Layout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => setButtonColor(getRandomColor())}>
          <Text style={styles.controlText}>Change Color</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => setPriceVisible(p => !p)}>
          <Text style={styles.controlText}>Toggle Price</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardWrapper}>
        <ProductCard
          productName="Classic Oversized Hoodie"
          price={49.99}
          imageUrl="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          isOnSale={true}
          onAddToCart={handleAddToCart}
          layout={layout}
          buttonColor={buttonColor}
          priceVisible={priceVisible}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
    paddingTop: 50,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  controlButton: {
    backgroundColor: '#4B5563',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  controlText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});