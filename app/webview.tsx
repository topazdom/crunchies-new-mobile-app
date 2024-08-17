import { SafeAreaView, StyleSheet } from 'react-native';

import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { WebView } from 'react-native-webview';

export default function WebViewCon() {
  return (
    <ThemedView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <WebView
          style={styles.container}
          source={{ uri: 'https://crunchies-nextjs-2.vercel.app/' }}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
