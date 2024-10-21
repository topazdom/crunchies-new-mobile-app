import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';

import AllInCrunchies from '@/components/home/AllInCrunchies';
import BannerCarousel from '@/components/home/BannerCarousel';
import CatMenuItem from '@/components/home/CatMenuItems';
import Categories from '@/components/home/Categories';
import CurrentLocation from '@/components/home/CurrentLocation';
import FoodMenu from '@/components/home/FoodMenu';
import HomeHeaderNew from '@/components/home/HomeHeaderNew';
import HotDealsCarousel from '@/components/home/HotDealsCarousel';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React from 'react';
import Recommendations from '@/components/home/Recommendations';
import RecommendedSection from '@/components/home/RecommendedSection';
import { SafeAreaView } from 'react-native-safe-area-context';
import SizedBox from '@/components/SizedBox';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import TrendingPlatters from '@/components/home/TrendingPlatters';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <HomeHeaderNew />
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={styles.discoverMenuContainer}>
              <ThemedText style={styles.discoverMenuText}>Discover Our Menu</ThemedText>
              <View style={styles.rectUnderline}/>
            </View>
            <CatMenuItem />
          </ScrollView>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rectUnderline: {
    padding: 3,
    width: 45,
    backgroundColor: '#E90C31'
  },
  discoverMenuContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    color: '#E90C31',
    marginVertical: 8
  },
  discoverMenuText: {
    color: '#E90C31',
    fontSize: 18,
    fontWeight: '700'
  }
});
