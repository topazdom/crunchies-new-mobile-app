import { handleNotificationWorkflow, saveTokenStatusToSecureStore } from '@/services/PushService';
import { User, saveUserToStore } from '@/services/UserService';
import { AndroidColor } from '@notifee/react-native';
import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Linking, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import { WebView, WebViewMessageEvent } from 'react-native-webview';
import RefreshIcon from './RefreshIcon';

interface WebViewLoaderProps {
    link: string;
}

export type AppMessage = {
  action: string,
  payload?: any
}

const WebViewLoader: React.FC<WebViewLoaderProps> = ({ link }) => {
    const [refreshing, setRefreshing] = useState(false);
    const webViewRef = useRef<WebView>(null);

    const runFirst = `
      console.log("JSInjectWork") // note: this is required, or you'll sometimes get silent failures
    `;

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        if (webViewRef.current) {
            webViewRef.current.reload();
        }
    }, []);

    const handleLoadEnd = () => {
        setRefreshing(false);
    };

    const handleMessage = async (event: WebViewMessageEvent) => {
      const { data } = event.nativeEvent;

      let msg = JSON.parse(data) as AppMessage;

      if (msg.action === 'RequestToken') {
        saveUserToStore(msg.payload as User);
        if (webViewRef.current) {
          const {token, tokenSaved} = await handleNotificationWorkflow();
          let msg: AppMessage = {
            action: 'SaveToken',
            payload: { token }
          }
          //console.log(JSON.stringify(msg));
          if (!tokenSaved) {
            webViewRef.current.postMessage(JSON.stringify(msg));
          }
        }
      }
      if (msg.action === 'TokenSaved') {
        console.log('Returning proper');
        saveTokenStatusToSecureStore(true);
      }
      console.log('Received message from WebView:', data);
    };



    return (
        <ScrollView
            contentContainerStyle={{ flex: 1, paddingTop: '0%' }}
            /* refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            } */
        >
            <WebView
                ref={webViewRef}
                source={{ uri: link }}
                onLoadEnd={handleLoadEnd}
                onMessage={handleMessage}
                style={{ flex: 1 }}
                javaScriptEnabled
                scalesPageToFit
                injectedJavaScript={runFirst}
                renderLoading={() => <View style={styles.overlay}>
                                <ActivityIndicator size="large" color={AndroidColor.RED} />
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
            <RefreshIcon onButtonPress={onRefresh} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    webview: {
      flex: 1,
      //top: '0%',
      //bottom: '5%',
    },
    errorContainer: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.65)', // Transparent white overlay
      position: 'absolute',
      padding: 20,
      zIndex: 999999999999
    },
    errorText: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255, 255, 255, 0.45)', // Transparent white overlay
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      zIndex: 50,
    }
  });

export default WebViewLoader;
