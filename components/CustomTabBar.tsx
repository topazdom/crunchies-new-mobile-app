import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from './ThemedView';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');
const TAB_BAR_WIDTH = width;
const TAB_WIDTH = TAB_BAR_WIDTH / 5;
const INDICATOR_WIDTH = 60;
const INDICATOR_HEIGHT = 10;

const CustomTabBar = () => {
  const [activeTab, setActiveTab] = useState(0);

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring((activeTab * TAB_WIDTH) + (TAB_WIDTH - INDICATOR_WIDTH) / 2) }],
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
          {renderIcon(activeTab === 1 ? 'heart' : 'heart-outline', 1, '/(tabs)/explore')}
          <TouchableOpacity style={styles.centerButton} onPress={() => setActiveTab(2)}>
            <Ionicons name="bag-outline" size={28} color="white" />
          </TouchableOpacity>
          {renderIcon(activeTab === 3 ? 'list' : 'list-outline', 3)}
          {renderIcon(activeTab === 4 ? 'person' : 'person-outline', 4)}
          <Animated.View style={[styles.indicator, indicatorStyle]} />
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
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E32636',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    shadowColor: '#E32636',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    width: INDICATOR_WIDTH,
    height: INDICATOR_HEIGHT,
    backgroundColor: '#E32636',
    borderTopLeftRadius: INDICATOR_WIDTH,
    borderTopRightRadius: INDICATOR_WIDTH,
  },
});

export default CustomTabBar;