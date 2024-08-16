import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { ThemedView } from '../ThemedView';
import { commonColors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';

const foodItems = [
  {
    id: '1',
    name: "The Heaven's Food",
    price: '32,000',
    image: require('@/assets/images/chicken-wrap.png'),
    freeDelivery: true,
    hotDeal: true,
  },
  {
    id: '2',
    name: 'Veggie Delight Cheesesteak',
    price: '8,000',
    image: require('@/assets/images/chicken-wrap.png'),
    freeDelivery: true,
    hotDeal: false,
  },
];

const FoodItem = ({ item }) => (
  <ThemedView style={styles.foodItem}>
    <Image source={item.image} style={styles.foodImage} />
    <TouchableOpacity style={styles.favoriteButton}>
      <Ionicons name="heart-outline" size={24} color={commonColors.primary} />
    </TouchableOpacity>
    {item.hotDeal && (
      <View style={styles.hotDealBadge}>
        <ThemedText style={styles.hotDealText}>Hot Deal</ThemedText>
      </View>
    )}
    <View style={styles.foodInfo}>
      <ThemedText style={styles.foodName}>{item.name}</ThemedText>
      <View style={styles.priceDeliveryContainer}>
        <ThemedText style={styles.foodPrice}>₦{item.price}</ThemedText>
        {item.freeDelivery && (
          <View style={styles.freeDeliveryBadge}>
            <Feather name="truck" size={16} color={commonColors.green} />
            <ThemedText style={styles.freeDeliveryText}>Free delivery</ThemedText>
          </View>
        )}
      </View>
    </View>
  </ThemedView>
);

const AllInCrunchies = () => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>All in Crunchies</ThemedText>
      <View>
        {foodItems?.map((item, index) => (
          <FoodItem item={item} key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 15,
  },
  foodItem: {
    marginBottom: 20,
    borderRadius: 15,
  },
  foodImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
  },
  hotDealBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF4136',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  hotDealText: {
    color: 'white',
    fontWeight: 'bold',
  },
  foodInfo: {
    padding: 15,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 5,
  },
  priceDeliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodPrice: {
    fontSize: 14,
    fontWeight: '400',
  },
  freeDeliveryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  freeDeliveryText: {
    marginLeft: 5,
    fontSize: 12
  },
});

export default AllInCrunchies;