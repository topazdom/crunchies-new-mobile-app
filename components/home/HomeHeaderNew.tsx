import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import BannerCarousel from './BannerCarousel';
import { Ionicons } from '@expo/vector-icons';
import OrderButton from '../OrderNowBtn';
import React from 'react';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { commonColors } from '@/constants/Colors';
import { router } from 'expo-router';

const HomeHeaderNew = () => {
  const getMealTime = (): string => {
    const currentHour = new Date().getHours();
    console.log(currentHour);
    
    if (currentHour >= 5 && currentHour < 11) {
      return "breakfast";
    } else if (currentHour >= 11 && currentHour < 17) {
      return "lunch";
    } else if (currentHour >= 17 && currentHour < 22) {
      return "dinner";
    } else {
      return "rest";
    }
  };

  let mealTime = getMealTime();

  return (
    <ThemedView>
      <View style={styles.header}>
        <View style={styles.greeting}>
          <ThemedText style={styles.name}>Hey, Cruncher!</ThemedText>
          <ThemedText style={styles.message}>It's {mealTime} time...</ThemedText>
        </View>
        <BannerCarousel />
        {/* <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="search-outline" size={24} color={commonColors.primary} />
        </TouchableOpacity> */}
      </View>
      <View style={styles.orderbtn}>
        <OrderButton onPress={()=>router.push('/webview')} />
        </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 14,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  orderbtn: {
    alignSelf: "center",
    paddingVertical: 10
  },
  greeting: {
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  name: {
    fontSize: 24,
    fontWeight: '500',
    // color: '#333',
  },
  message: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  searchIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#ffeeee',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeHeaderNew;