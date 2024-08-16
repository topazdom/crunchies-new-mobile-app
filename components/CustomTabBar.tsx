import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, Image } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from './ThemedView';
import { Link } from 'expo-router';
import { whatTheme } from '@/hooks/useThemeColor';

const { width } = Dimensions.get('window');
const TAB_BAR_WIDTH = width;
const TAB_WIDTH = TAB_BAR_WIDTH / 5;
const INDICATOR_WIDTH = 60;
const INDICATOR_HEIGHT = 10;

const CustomTabBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = whatTheme();

  const indicatorStyle = useAnimatedStyle(() => {
    let xPosition;
    if (activeTab === 0) {
      // For the first two tabs
      xPosition = activeTab * TAB_WIDTH + (TAB_WIDTH - INDICATOR_WIDTH) / 1.5;
    } else if (activeTab === 1) {
      // For the center button
      xPosition = activeTab * TAB_WIDTH + (TAB_WIDTH - INDICATOR_WIDTH) / 1.08;
    } else if (activeTab === 2) {
      // For the center button
      xPosition = 2 * TAB_WIDTH + (TAB_WIDTH - INDICATOR_WIDTH) / 2;
    } else if (activeTab === 3) {
      // For the center button
      xPosition = activeTab * TAB_WIDTH + (TAB_WIDTH - INDICATOR_WIDTH) / 4;
    } else {
      // For the last two tabs
      xPosition = activeTab * TAB_WIDTH + (TAB_WIDTH - INDICATOR_WIDTH) / 2.5;
    }
    return {
      transform: [{ translateX: withSpring(xPosition) }],
    };
  });

  const renderIcon = (name, index, href='') => (
    <Link
      asChild
      href={href}
    >
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => setActiveTab(index)}
      >
        <Ionicons
          name={name}
          size={24}
          color={activeTab === index ? '#010101' : '#8E8E8E'}
        />
      </TouchableOpacity>
    </Link>
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView>
        <View style={styles.tabBar}>
          {renderIcon(activeTab === 0 ? 'home' : 'home-outline', 0, '/(tabs)/')}
          {renderIcon(activeTab === 1 ? 'heart' : 'heart-outline', 1, '/(tabs)/')}
          <TouchableOpacity style={[styles.centerButtonCon, {backgroundColor: theme === 'light' ? '#fff' : '#fff'}]} onPress={() => setActiveTab(2)}>
            <View style={styles.centerButton}>
              <Ionicons name="bag-outline" size={28} color="white" />
            </View>
          </TouchableOpacity>
          {renderIcon(activeTab === 3 ? 'list' : 'list-outline', 3)}
          {renderIcon(activeTab === 4 ? 'person' : 'person-outline', 4)}
          <Animated.View style={[styles.indicator, indicatorStyle]}>
            <Image
              source={require('@/assets/images/tab-indicator.png')}
              style={styles.indicatorImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButtonCon: {
    width: 72,
    height: 72,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
  },
  centerButton: {
    width: 52,
    height: 52,
    borderRadius: 30,
    backgroundColor: '#E32636',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E32636',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 8,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    width: INDICATOR_WIDTH,
    height: INDICATOR_HEIGHT,
  },
  indicatorImage: {
    width: INDICATOR_WIDTH,
    height: INDICATOR_HEIGHT,
  },
});

export default CustomTabBar;