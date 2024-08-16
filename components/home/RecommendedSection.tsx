import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { whatTheme } from '@/hooks/useThemeColor';
import { commonColors } from '@/constants/Colors';

const RecommendedSection = () => {
  const theme = whatTheme();
  const recommendations = [
    {
      image: require('@/assets/images/chicken-wrap.png'),
      title: 'Deccan Queen Ring',
      price: 5000,
      discount: '30% Off upto 60',
    },
    {
      image: require('@/assets/images/chicken-wrap.png'),
      title: "Mamoo's Tiffin",
      price: 23700,
      discount: '30% Off upto 60',
    },
  ];

  return (
    <View style={styles.container}>
      <ThemedText style={styles.header}>Recommended</ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingBottom: 20}}>
        {recommendations.map((item, index) => (
          <ThemedView key={index} style={[styles.card, {shadowColor: theme === 'light' ? '#ccc6c6' : '#000', borderWidth: theme === 'light' ? 0 : 1, borderColor: '#7e7979'}]}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <ThemedText style={styles.title} numberOfLines={1}>{item.title}</ThemedText>
              <ThemedText style={styles.price}>₦{item.price.toLocaleString()}</ThemedText>
              <ThemedText style={styles.discount}>{item.discount}</ThemedText>
            </View>
          </ThemedView>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20, 
    fontWeight: '500',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row', 
    alignItems: 'center',
    width: 230,
    marginRight: 15,
    borderRadius: 20,
    padding: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3, 
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 15,
    margin: 2,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '300', 
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
  },
  discount: {
    fontSize: 14,
    color: commonColors.green, 
    fontWeight: '500',
  },
});

export default RecommendedSection;
