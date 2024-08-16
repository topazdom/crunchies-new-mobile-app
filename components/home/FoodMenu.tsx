import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { commonColors } from '@/constants/Colors';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

const FoodItem = ({ name, price, image, inBag = 0 }) => {
  const [quantity, setQuantity] = useState(inBag);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleWishlist = () => {
    scale.value = withSpring(1.2, {}, () => {
      scale.value = withSpring(1);
    });
    setIsWishlisted(!isWishlisted);
  };

  return (
    <ThemedView style={styles.card}>
      <Image source={image} style={styles.image} />
      <Animated.View style={[styles.heartContainer, animatedStyle]}>
        <TouchableOpacity onPress={handleWishlist}>
          <FontAwesome 
            name={isWishlisted ? "heart" : "heart-o"} 
            size={17} 
            color={isWishlisted ? commonColors.primary : commonColors.primary} 
          />
        </TouchableOpacity>
      </Animated.View>
      <View style={{paddingHorizontal: 10}}>
        <View style={{flex: 1, height: 80}}>
          <ThemedText numberOfLines={2} style={styles.name}>{name}</ThemedText>
          <ThemedText numberOfLines={1} style={styles.price}>₦{price.toLocaleString()}</ThemedText>
        </View>
        {quantity === 0 ? (
          <TouchableOpacity style={styles.addButton} onPress={() => setQuantity(1)}>
            <ThemedText style={styles.addButtonText}>Add to bag</ThemedText>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={{borderRightWidth: 0.5, borderColor: '#fff'}} onPress={() => setQuantity(Math.max(0, quantity - 1))}>
              <ThemedText style={styles.quantityButton}>-</ThemedText>
            </TouchableOpacity>
            <ThemedText style={styles.quantityText}>{quantity} in bag</ThemedText>
            <TouchableOpacity style={{borderLeftWidth: 0.5, borderColor: '#fff'}} onPress={() => setQuantity(quantity + 1)}>
              <ThemedText style={styles.quantityButton}>+</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ThemedView>
  );
};

const FoodMenu = () => {
  const foodItems = [
    { name: 'Fried Brown Rice', price: 5000, image: require('@/assets/images/rice.png') },
    { name: 'Veggie Delight Cheesesteak', price: 3200, image: require('@/assets/images/cheesesteak.png'), inBag: 2 },
    { name: 'Chicken burger first delivery', price: 5000, image: require('@/assets/images/burger-food.png') },
    { name: "Crunchies's Chicken wrap", price: 5000, image: require('@/assets/images/chicken-wrap.png') },
  ];

  return (
    <View style={styles.container}>
      {foodItems.map((item, index) => (
        <FoodItem key={index} {...item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20
    // gap: 20
  },
  card: {
    width: '48%',
    borderRadius: 8,
    paddingBottom: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(185,187,200,0.3)',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 120,
    top: -1,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  heartContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: '300'
  },
  price: {
    fontSize: 14,
    marginVertical: 5,
    marginTop: 0,
    fontWeight: '400'
  },
  addButton: {
    borderColor: commonColors.primary,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 6
  },
  addButtonText: {
    color: commonColors.primary,
    fontWeight: '400',
    fontSize: 13
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: commonColors.primary,
    borderRadius: 5,
    // padding: 5,
    paddingVertical: 0
  },
  quantityButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantityText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 13
  },
});

export default FoodMenu;