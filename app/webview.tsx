import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function WebViewCon() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        style={styles.container}
        source={{ uri: 'https://crunchies-nextjs-2.vercel.app/' }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
