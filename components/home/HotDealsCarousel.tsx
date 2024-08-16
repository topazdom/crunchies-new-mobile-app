import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HotDealCard from './HotDealCard'; // adjust the path as necessary
import { ThemedText } from '../ThemedText';
import { commonColors } from '@/constants/Colors';

const HotDealsCarousel = () => {
  const deals = [
    {
      image: require('@/assets/images/honey-cake.png'),
      title: 'Viral stacking cake with honey',
      price: 9670,
    },
    {
      image: require('@/assets/images/honey-cake.png'),
      title: 'Roast beef with black pepper',
      price: 8000,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Hot Deals 🔥</ThemedText>
        <TouchableOpacity onPress={() => console.log('See All pressed')}>
          <ThemedText style={styles.seeAll}>See All</ThemedText>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {deals.map((deal, index) => (
          <HotDealCard
            key={index}
            image={deal.image}
            title={deal.title}
            price={deal.price}
            onFavoritePress={() => console.log(`${deal.title} favorited`)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  seeAll: {
    fontSize: 16,
    color: commonColors.primary,
  },
});

export default HotDealsCarousel;
