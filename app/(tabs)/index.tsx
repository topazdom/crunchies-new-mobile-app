import { Image, StyleSheet, Platform, ScrollView, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '@/components/home/HomeHeader';
import BannerCarousel from '@/components/home/BannerCarousel';
import Recommendations from '@/components/home/Recommendations';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <HomeHeader />
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={{paddingHorizontal: 20}}>
              <BannerCarousel />
              <Recommendations />
            </View>
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
