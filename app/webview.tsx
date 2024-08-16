import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

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
