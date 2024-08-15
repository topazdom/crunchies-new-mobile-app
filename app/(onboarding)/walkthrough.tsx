import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { slides } from '@/data/onboardData';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Walkthrough() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
      translateX.value = withTiming(-SCREEN_WIDTH * (currentIndex + 1));
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      translateX.value = withTiming(-SCREEN_WIDTH * (currentIndex - 1));
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (event) => {
      const slideChange = -Math.round(event.translationX / SCREEN_WIDTH);
      let newIndex = currentIndex + slideChange;

      if (newIndex < 0) newIndex = 0;
      if (newIndex > slides.length - 1) newIndex = slides.length - 1;

      runOnJS(setCurrentIndex)(newIndex);
      translateX.value = withTiming(-newIndex * SCREEN_WIDTH);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar style="auto" />
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.slidesContainer, animatedStyle]}>
            {slides.map((slide, index) => (
              <View key={index} style={styles.slide}>
                <Image source={slide.image} style={styles.image} />
                <ThemedText style={styles.hashtag}>{slide.hashtag}</ThemedText>
                <ThemedText style={styles.title}>{slide.title}</ThemedText>
                <ThemedText style={styles.description}>{slide.description}</ThemedText>
              </View>
            ))}
          </Animated.View>
        </PanGestureHandler>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          {currentIndex > 0 ? (
            <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
              <ThemedText style={styles.navButtonText}>Previous</ThemedText>
            </TouchableOpacity>
          ) : (
            <Link href="/(tabs)" asChild>
              <TouchableOpacity style={styles.skipButton}>
                <ThemedText style={styles.skipButtonText}>Skip</ThemedText>
              </TouchableOpacity>
            </Link>
          )}
          {currentIndex < slides.length - 1 ? (
            <TouchableOpacity style={styles.navButton} onPress={handleNext}>
              <ThemedText style={styles.navButtonText}>Next</ThemedText>
            </TouchableOpacity>
          ) : (
            <Link href="/(tabs)" asChild>
              <TouchableOpacity style={styles.finishButton}>
                <ThemedText style={styles.finishButtonText}>Finish</ThemedText>
              </TouchableOpacity>
            </Link>
          )}
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  slidesContainer: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * slides.length,
  },
  slide: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    padding: 20,
    paddingTop: SCREEN_WIDTH * 0.1
  },
  image: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_WIDTH - 40,
    resizeMode: 'contain',
  },
  hashtag: {
    fontSize: 18,
    color: '#FF0000',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#666',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.dark.primaryLight,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: Colors.dark.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  skipButton: {
    padding: 10,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#666',
  },
  nextButton: {
    paddingVertical: 10,
    borderRadius: 5,
  },
  nextButtonText: {
    fontSize: 16,
    color: Colors.dark.primary,
    fontWeight: 'bold',
  },
  navButton: {
    paddingVertical: 10,
    borderRadius: 5,
  },
  navButtonText: {
    fontSize: 16,
    color: Colors.dark.primary,
    fontWeight: 'bold',
  },
  finishButton: {
    paddingVertical: 10,
    borderRadius: 5,
  },
  finishButtonText: {
    fontSize: 16,
    color: Colors.dark.primary,
    fontWeight: 'bold',
  },
});