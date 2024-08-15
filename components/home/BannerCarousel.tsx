import { deviceWidth } from '@/constants/Size';
import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

const width = deviceWidth - 40;
const BANNER_HEIGHT = 140;
const AUTO_SWIPE_INTERVAL = 3000;

const banners = [
  require('@/assets/images/banner-1.png'),
  require('@/assets/images/banner-2.png'),
  require('@/assets/images/banner-3.png'),
];

const BannerCarousel = () => {
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
  }, []);

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
          <View key={index} style={styles.imageContainer}>
            <Image
              source={banner}
              style={styles.banner}
              resizeMode="cover"
            />
          </View>
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
    overflow: 'hidden'
  },
  imageContainer: {
    width: width,
    height: BANNER_HEIGHT,
    overflow: 'hidden',
  },
  banner: {
    width: width + (deviceWidth * 0.35),
    height: BANNER_HEIGHT,
    // marginLeft: -5,
  },
});

export default BannerCarousel;