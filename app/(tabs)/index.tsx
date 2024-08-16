import { Image, StyleSheet, Platform, ScrollView, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '@/components/home/HomeHeader';
import BannerCarousel from '@/components/home/BannerCarousel';
import Recommendations from '@/components/home/Recommendations';
import Categories from '@/components/home/Categories';
import FoodMenu from '@/components/home/FoodMenu';
import SizedBox from '@/components/SizedBox';
import CurrentLocation from '@/components/home/CurrentLocation';
import HotDealsCarousel from '@/components/home/HotDealsCarousel';
import TrendingPlatters from '@/components/home/TrendingPlatters';
import RecommendedSection from '@/components/home/RecommendedSection';
import AllInCrunchies from '@/components/home/AllInCrunchies';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <HomeHeader />
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={{paddingHorizontal: 20}}>
              <CurrentLocation location="3 Ajayi Street Lekki Phase 1 Lagos" />
              <SizedBox height={15} />
              <BannerCarousel />
              <Recommendations />
            </View>
            <Categories />
            <FoodMenu />
            <HotDealsCarousel />
            <TrendingPlatters />
            <RecommendedSection />
            <AllInCrunchies />
            <SizedBox height={90} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
