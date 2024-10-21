import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';
import { router } from 'expo-router';

const menuItems = [
  { title: 'Food', image: require('@/assets/images/categories/food.jpg') },
  { title: 'Protein', image: require('@/assets/images/categories/protein.jpg') },
  { title: 'Pastries', image: require('@/assets/images/categories/pastries.jpg') },
  { title: 'Cake', image: require('@/assets/images/categories/cake.jpg') },
  { title: 'Shawarma', image: require('@/assets/images/categories/shawarma.jpg') },
  { title: 'Bread', image: require('@/assets/images/categories/bread.jpg') },
  { title: 'Ice Cream', image: require('@/assets/images/categories/icecream.jpg') },
  { title: 'Drinks', image: require('@/assets/images/categories/drinks.jpg') },
];
const CatMenuItems = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity onPress={() => router.push('/webview')} key={index} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#E20030',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10
  },
  card: {
    width: 156,
    height: 91,
    borderRadius: 8,
    overflow: 'scroll',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover'
  },
  title: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// @ts-ignore
export default CatMenuItems;
