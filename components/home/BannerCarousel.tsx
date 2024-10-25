import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { Dimensions, Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import { deviceWidth } from '@/constants/Size';

const width = deviceWidth - 40;
const BANNER_HEIGHT = 140;
const AUTO_SWIPE_INTERVAL = 3000;

const webviewLinkTo = (endpoint?: string): string => {
  return "/webview?linkparam=" + BASE_URL + endpoint;
};

const defaultBanners = [
  { image: require('@/assets/images/banner-1.png'), url: '/path/to/page1' },
  { image: require('@/assets/images/banner-2.png'), url: '/path/to/page2' },
  { image: require('@/assets/images/banner-3.png'), url: '/path/to/page3' },
];

const BannerCarousel = () => {
  const [banners, setBanners] = useState(defaultBanners);
  const scrollX = useSharedValue(0);
  const scrollRef = useRef(null);

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
        const response = await fetch('https://example.com/api/banners');
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
    const link = webviewLinkTo(url);
    Linking.openURL(link);
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
  },
  banner: {
    width,
    height: BANNER_HEIGHT,
    resizeMode: 'cover',
  },
});

export default BannerCarousel;