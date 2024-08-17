import 'react-native-reanimated';

import * as SplashScreen from 'expo-splash-screen';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean|null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkIfFirstLaunch() {
      try {
        const value = await AsyncStorage.getItem('@first_launch');
        if (value === null) {
          // App is launched for the first time
          await AsyncStorage.setItem('@first_launch', 'false');
          setIsFirstLaunch(true);
        } else {
          // App has been launched before
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking if first launch:', error);
        setIsFirstLaunch(false); // Default to false if there's an error
      }
    }

    checkIfFirstLaunch();
  }, []);

  useEffect(() => {
    if (loaded && isFirstLaunch !== null) {
      SplashScreen.hideAsync();
      if (!isFirstLaunch) {
        // If it's not the first launch, navigate to tabs
        router.replace('/webview');
      }
    }
  }, [loaded, isFirstLaunch]);

  if (!loaded || isFirstLaunch === null) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Stack>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="webview" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}