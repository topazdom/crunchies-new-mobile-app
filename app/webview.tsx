import { ActivityIndicator, Linking, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';

import HomeLoadingPage from '@/components/HomeLoadingPage';
import { StatusBar } from 'expo-status-bar';
import { ThemedView } from '@/components/ThemedView';
import { WebView } from 'react-native-webview';

export default function WebViewCon() {
  const webViewRef = useRef<WebView>(null);

  const runFirst = `
      //alert("Injected");
      window.isRNWebView=true
      console.log("JSInjectWork") // note: this is required, or you'll sometimes get silent failures
    `;
  return (
    <ThemedView style={{flex: 1, marginTop: "7%"}}>
      <StatusBar hidden={false} backgroundColor='red' translucent={true}  />
      <SafeAreaView style={{flex: 1}}>
        <WebView
          pullToRefreshEnabled={true}
          style={styles.container}
          javaScriptEnabled
          scalesPageToFit
          injectedJavaScript={runFirst}
          source={{ uri: 'https://b56a-2c0f-2a80-76-e610-59d0-4d7f-6bbb-4d1f.ngrok-free.app/' }}
          //renderLoading={()=> <HomeLoadingPage />}
          renderLoading={() => <View style={styles.overlay}>
                                <ActivityIndicator size="large" color={"red"} />
                            </View>}
          onError={(event) => {
            const url = event.nativeEvent.url;
            if (
              url.startsWith('intent://') ||
              url.startsWith('tel:') ||
              url.startsWith('mailto:')
            ) {
              webViewRef.current?.goBack();
              Linking.openURL(url);
            }
          }}
        />
        {/* <HomeLoadingPage /> */}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.45)', // Transparent white overlay
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 50,
  },
});
