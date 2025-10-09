
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type ProductCardProps = {
  productName: string;
  price: number;
  imageUrl: string;
  isOnSale: boolean;
  onAddToCart: (productName: string) => void;
  //Props for no-code customization demonstration
  layout?: 'vertical' | 'horizontal';
  buttonColor?: string;
  priceVisible?: boolean;
};

const CARD_WIDTH = 300;

const ProductCard = (props: ProductCardProps) => {
  const {
    productName,
    price,
    imageUrl,
    isOnSale,
    onAddToCart,
    layout = 'vertical',
    buttonColor = '#FFD426',
    priceVisible = true,
  } = props;

  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    );

    if (layout === 'vertical') {
      animation.start();
    } else {
      animation.stop();
    }

    return () => animation.stop();
  }, [rotation, layout]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Horizontal Layout
  if (layout === 'horizontal') {
    return (
      <View style={[styles.hCard, styles.shadowWrapper]}>
        <Image source={{ uri: imageUrl }} style={styles.hImage} />
        <View style={styles.hContentContainer}>
          <Text style={styles.hProductName} numberOfLines={2}>{productName}</Text>
          {priceVisible && <Text style={styles.hPrice}>${price.toFixed(2)}</Text>}
          <TouchableOpacity
            style={[styles.addToCartButton, { backgroundColor: buttonColor, marginTop: 'auto' }]}
            onPress={() => onAddToCart(productName)} >
            <Feather name="shopping-cart" size={16} color="#111827" />
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
        {isOnSale && (
            <View style={styles.hSaleBadge}>
                <Text style={styles.saleText}>SALE</Text>
            </View>
        )}
      </View>
    );
  }

  // Default Vertical Layout
  return (
    <View style={styles.shadowWrapper}>
      <View style={styles.cardContainer}>
        <Animated.View style={[styles.gradientBackground, { transform: [{ rotate }] }]}>
          <LinearGradient
            colors={['#FFD426', '#FF6BBA', '#00B9FF', '#FFD426']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ width: '100%', height: '100%' }}
          />
        </Animated.View>
        <View style={styles.cardContent}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUrl }} style={styles.image} contentFit="cover" />
            {isOnSale && (
              <View style={styles.saleBadge}>
                <Text style={styles.saleText}>SALE</Text>
              </View>
            )}
            {priceVisible && (
              <View style={styles.priceContainer}>
                <Text style={styles.price}>${price.toFixed(2)}</Text>
              </View>
            )}
          </View>

          <View style={styles.content}>
            <Text style={styles.productName} numberOfLines={2}>{productName}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.addToCartButton, { backgroundColor: buttonColor }]}
              onPress={() => onAddToCart(productName)}
              activeOpacity={0.7}>
              <Feather name="shopping-cart" size={18} color="#111827" />
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // HZ Styles
  hCard: {
    flexDirection: 'row',
    width: '90%',
    height: 160,
    backgroundColor: '#FFF',
    borderRadius: 16,
  },
  hImage: {
    width: 140,
    height: '100%',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  hContentContainer: {
    flex: 1,
    padding: 15,
  },
  hProductName: {
    fontWeight: '700',
    fontSize: 16,
    color: '#374151',
  },
  hPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111827',
    marginTop: 8,
  },
  hSaleBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    zIndex: 1,
  },

  // Verti styles + shared styles
  shadowWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 20,
  },
  cardContainer: {
    width: CARD_WIDTH,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
  },
  gradientBackground: {
    position: 'absolute',
    width: CARD_WIDTH * 2,
    height: CARD_WIDTH * 2,
    left: -(CARD_WIDTH / 2),
    top: -(CARD_WIDTH / 2),
  },
  cardContent: {
    margin: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 210,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  saleBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    zIndex: 1,
  },
  saleText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },
  priceContainer: {
    position: 'absolute',
    right: 0,
    bottom: -18,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 22,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 1,
  },
  price: {
    color: '#111827',
    fontWeight: '900',
    fontSize: 18,
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
  },
  productName: {
    fontWeight: '700',
    color: '#374151',
    fontSize: 16,
    minHeight: 40,
  },
  buttonContainer: {
    padding: 10,
  },
  addToCartButton: {
    borderRadius: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  addToCartButtonText: {
    color: '#111827',
    fontWeight: '900',
    fontSize: 16,
  },
});

export default ProductCard;
