import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Dimensions, Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Href, Link } from 'expo-router';
import React, { useState } from 'react';

import { BASE_URL } from '@/constants/Url';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from './ThemedView';
import { whatTheme } from '@/hooks/useThemeColor';

const { width } = Dimensions.get('window');
const TAB_BAR_WIDTH = width;
const TAB_WIDTH = TAB_BAR_WIDTH / 5;
const INDICATOR_WIDTH = 60;
const INDICATOR_HEIGHT = 10;

const CustomTabBar = ({ onMessage }: { onMessage: (message: string) => void }) => {
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

  const webviewLinkTo = (endpoint?: string): Href<string> => {
    return "/webview?linkparam="+ BASE_URL + endpoint as Href<string>;
  }

  const openCart = () => {
    onMessage('open-cart');
    //setActiveTab(2)
  }

  const renderIcon = (name: any | undefined, index: React.SetStateAction<number>, href: Href<any> = '/home' ) => (
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
          {renderIcon(activeTab === 0 ? 'home' : 'home-outline', 0, webviewLinkTo('/menu'))}
          {renderIcon(activeTab === 1 ? 'pricetags' : 'pricetags-outline', 1, webviewLinkTo('/offers'))}
          <TouchableOpacity style={[styles.centerButtonCon, {backgroundColor: theme === 'light' ? '#fff' : '#fff'}]} onPress={() => openCart()}>
            <View style={styles.centerButton}>
              <Ionicons name="bag-outline" size={28} color="white" />
            </View>
          </TouchableOpacity>
          {renderIcon(activeTab === 3 ? 'chatbubbles' : 'chatbubbles-outline', 3, webviewLinkTo('/contact-us'))}
          {renderIcon(activeTab === 4 ? 'person' : 'person-outline', 4, webviewLinkTo('/account'))}
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