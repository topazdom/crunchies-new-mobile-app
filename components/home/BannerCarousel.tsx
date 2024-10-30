import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { BASE_URL, webviewLinkTo } from '@/constants/Url';
import { Dimensions, Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Href, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';

import { deviceWidth } from '@/constants/Size';

const width = deviceWidth - 40;
const BANNER_HEIGHT = 140;
const AUTO_SWIPE_INTERVAL = 3000;

const defaultBanners = [
  { image: require('@/assets/images/banner-1.png'), url: 'menu?cat=Pastry' },
  { image: require('@/assets/images/banner-2.png'), url: 'menu?cat=Food' },
  { image: require('@/assets/images/banner-3.png'), url: '/offers' },
];

const BannerCarousel = () => {
  const [banners, setBanners] = useState(defaultBanners);
  const scrollX = useSharedValue(0);
  const scrollRef = useRef<Animated.ScrollView>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const autoSwipe = () => {
    const nextIndex = Math.floor(scrollX.value / width) + 1;
    if (nextIndex < banners.length) {
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    } else {
      scrollRef.current?.scrollTo({ x: 0, animated: true });
    }
  };

  useEffect(() => {
    const interval = setInterval(autoSwipe, AUTO_SWIPE_INTERVAL);
    return () => clearInterval(interval);
  }, [banners]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('https://api.crunchiesonline.com/api/v1/banners');
        const data = await response.json();
        const dynamicBanners = data.map((item: any) => ({
          image: { uri: item.image },
          url: item.url,
        }));
        setBanners([...defaultBanners, ...dynamicBanners]);
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      }
    };

    fetchBanners();
  }, []);

  const handleBannerPress = (url: string) => {
    //check if the url is a web url and if the domain is the same as the BASE_URL open externally usign Linking
    if (url.startsWith('http') && !url.startsWith (BASE_URL)) {
      Linking.openURL(url);
      return;
    } 
    const link = webviewLinkTo(url);
    
    router.push(link);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {banners.map((banner, index) => (

            <TouchableOpacity key={index} onPress={() => handleBannerPress(banner.url)}>
              <Image source={banner.image} style={styles.banner} />
            </TouchableOpacity>

        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: BANNER_HEIGHT,
    width: width,
    borderRadius: 30,
    overflow: 'hidden',
  },
  banner: {
    width: width,
    height: BANNER_HEIGHT,
    //resizeMode: 'cover',
  },
});

export default BannerCarousel;