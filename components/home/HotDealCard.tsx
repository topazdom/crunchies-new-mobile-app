import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { FontAwesome } from '@expo/vector-icons';
import SizedBox from '../SizedBox';
import { commonColors } from '@/constants/Colors';

const HotDealCard = ({ image, title, price, onFavoritePress }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <BlurView intensity={Platform.OS === 'ios' ? 25 : 80} tint="dark" style={styles.overlay}>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <SizedBox height={5} />
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text style={[styles.price, {fontSize: 16, color: commonColors.red100, fontWeight: '300'}]}>₦</Text>
              <Text style={styles.price}>{price.toLocaleString()}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onFavoritePress} style={styles.favoriteIcon}>
            <FontAwesome name="heart" size={20} color={commonColors.primary} />
          </TouchableOpacity>
        </BlurView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 20,
    width: 250,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: '50%',
    padding: 10,
    justifyContent: 'space-between',
    borderRadius: 150,
    overflow: 'hidden'
  },
  overlay: {
    height: '100%',
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 10
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400'
  },
  price: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700'
  },
  favoriteIcon: {
    top: 0,
    right: 0,
  },
});

export default HotDealCard;
