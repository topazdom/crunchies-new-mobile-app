import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { commonColors } from '@/constants/Colors';

const TrendingPlatters = () => {
  const platters = [
    {
      image: require('@/assets/images/burger-food.png'),
      title: 'Grilled fish with spicy onion sauce with black roasted beef',
      price: 12700,
    },
    {
      image: require('@/assets/images/burger-food.png'),
      title: 'Veggie Delight Cheesesteak Sliced tortillas with grilled meat',
      price: 32000,
    },
    {
      image: require('@/assets/images/burger-food.png'),
      title: 'Grilled fish with spicy onion sauce with black roasted beef',
      price: 42700,
    },
    {
      image: require('@/assets/images/burger-food.png'),
      title: 'Veggie Delight Cheesesteak Sliced tortillas with grilled meat',
      price: 12000,
    },
  ];

  return (
    <View style={styles.container}>
      <ThemedText style={styles.header}>Trending Platters</ThemedText>
      {platters.map((platter, index) => (
        <View key={index} style={styles.platterContainer}>
          <Image source={platter.image} style={styles.image} />
          <View style={styles.textContainer}>
            <ThemedText numberOfLines={2} style={styles.title}>{platter.title}</ThemedText>
            <ThemedText style={styles.price}><Text style={{color: commonColors.primary}}>₦</Text>{platter.price.toLocaleString()}</ThemedText>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
    marginTop: 25
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 12,
  },
  platterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '300',
    marginBottom: 2,
    lineHeight: 18
  },
  price: {
    fontSize: 15,
    fontWeight: '400',
  },
});

export default TrendingPlatters;
