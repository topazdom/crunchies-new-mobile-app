import { ActivityIndicator, Linking, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';

import CustomTabBar from '@/components/CustomTabBar';
//import HomeLoadingPage from '@/components/HomeLoadingPage';
import { RefreshControl } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { ThemedView } from '@/components/ThemedView';
import { WebView } from 'react-native-webview';
import { commonColors } from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';

export default function WebViewCon() {
  const webViewRef = useRef<WebView>(null);
  const { linkparam } = useLocalSearchParams();

  const [refreshing, setRefreshing] = useState(false);
const [refresherEnabled, setEnableRefresher] = useState(true);


// Handle message from CustomTabBar
const handleTabBarMessage = (message: string) => {
  if (webViewRef.current) {
    let jsexec = `
      window.postMessage(${JSON.stringify(message)}, "*");
    `;
    webViewRef.current.injectJavaScript(jsexec);
    console.log(jsexec)
    //webViewRef.current.postMessage(message);
  }
};

  //Code to get scroll position
  const handleScroll = (event: { nativeEvent: { contentOffset: { y: any; }; }; }) =>  {
    //console.log(Number(event.nativeEvent.contentOffset.y))
    const yOffset = Number(event.nativeEvent.contentOffset.y)
    if (yOffset === 0){
      //console.log('top of the page')
      setEnableRefresher(true)
    }else if(refresherEnabled){
      setEnableRefresher(false)
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (webViewRef.current) {
        webViewRef.current.reload();
    }
}, []);

  const runFirst = `
      //alert("Injected");
      window.isRNWebView=true
      console.log("JSInjectWork") // note: this is required, or you'll sometimes get silent failures
    `;
  return (
    <ThemedView style={{flex: 1, marginTop: "8%"}}>
      <StatusBar hidden={false} backgroundColor='red' translucent={true}  />
      <SafeAreaView style={{flex: 1}}>
      <ScrollView  
      contentContainerStyle={{flex: 1}}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing}
          enabled={refresherEnabled}
          onRefresh={onRefresh}
        />
      }>
        <WebView
          ref={webViewRef}
          //pullToRefreshEnabled={true}
          userAgent='Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
          style={styles.container}
          javaScriptEnabled
          scalesPageToFit
          injectedJavaScript={runFirst}
          startInLoadingState={true}
          cacheEnabled={false}
          onScroll={handleScroll}
          onLoadEnd={()=>setRefreshing(false)}
          source={{ uri: linkparam as string ?? 'https://www.crunchiesonline.com/menu' }}
          //renderLoading={()=> <HomeLoadingPage />}
          renderLoading={() => <View style={styles.overlay}>
                                <ActivityIndicator size="large" color={commonColors.loader} />
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
        </ScrollView>
        <CustomTabBar onMessage={handleTabBarMessage} />
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
