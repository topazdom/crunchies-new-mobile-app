import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { ThemedText } from '../ThemedText';

const categories = [
  { id: '1', name: 'Shawarma', places: 75, image: require('@/assets/images/pizza.png'), color: '#FFF3E0' },
  { id: '2', name: 'Food', places: 80, image: require('@/assets/images/biryani.png'), color: '#FFEBEE' },
  { id: '3', name: 'Pastery', places: 35, image: require('@/assets/images/burger.png'), color: '#E8F5E9' },
  { id: '4', name: 'Cakes', places: 75, image: require('@/assets/images/pizza.png'), color: '#FFF3E0' },
  { id: '5', name: 'Protein', places: 80, image: require('@/assets/images/biryani.png'), color: '#FFEBEE' },
  { id: '6', name: 'Bread', places: 35, image: require('@/assets/images/burger.png'), color: '#E8F5E9' },
  { id: '7', name: 'Ice Cream', places: 35, image: require('@/assets/images/burger.png'), color: '#E8F5E9' },
  { id: '8', name: 'Drinks', places: 35, image: require('@/assets/images/burger.png'), color: '#E8F5E9' },
  // Add more categories as needed
];

const CategoryItem = ({ item }) => (
  <View style={styles.categoryItem}>
    <View style={styles.circleOuter}>
      <View style={[styles.circleSemi, { backgroundColor: item.color }]} />
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.placesCount}>{item.places} Places</Text>
    </View>
  </View>
);

const Categories = () => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Hot Categories</ThemedText>
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryItem item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{paddingLeft: 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 15,
    marginLeft: 20,
  },
  categoryItem: {
    marginRight: 20,
  },
  circleOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F5F6F6',
    overflow: 'hidden'
  },
  circleSemi: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 120,
    bottom: -60
  },
  categoryImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  placesCount: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});

export default Categories;