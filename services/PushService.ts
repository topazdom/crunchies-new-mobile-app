import * as SecureStore from 'expo-secure-store';

import { AppMessage } from '@/components/WebViewLoader';
import { NavigationContainerRef } from '@react-navigation/native';
import WebView from 'react-native-webview';
import messaging from '@react-native-firebase/messaging';
import { router } from 'expo-router';

//import notifee, { AndroidColor } from '@notifee/react-native';


// Request user permission for notifications
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

// Function to get the FCM token
async function getFcmToken() {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log('Your Firebase Token is:', fcmToken);
    return fcmToken;
  } else {
    console.log('Failed to get FCM token');
    return null;
  }
}

async function saveTokenToSecureStore(token: string) {
  await SecureStore.setItemAsync('fcmToken', token);
}

export async function saveTokenStatusToSecureStore(status: boolean) {
  await SecureStore.setItemAsync('fcmTokenSaved', JSON.stringify(status));
}

async function getTokenFromSecureStore() {
  return await SecureStore.getItemAsync('fcmToken');
}

async function getTokenStatusFromSecureStore() {
  const status = await SecureStore.getItemAsync('fcmTokenSaved');
  return status === 'true';
}

// Function to save token from backend
export async function saveTokenFromBackend(data: string) {
  const response = JSON.parse(data);
  if (response.ok) {
    await saveTokenStatusToSecureStore(true);
  }
  if (!response.ok) {
    console.error('Failed to send token to backend');
  }
}


const RespondToTokenRequest = (webviewRef: WebView, token: string) => {
  let msg: AppMessage = {
    action: 'SaveToken',
    payload: { token }
  }
  //console.log(JSON.stringify(msg));
  webviewRef.postMessage(JSON.stringify(msg));
}

const getPushCode = (pushToken: string) => {
  let pushcodejs = `
  if (typeof subscribeToPush === 'function') {
    subscribeToPush('${pushToken}');
  }
  `
  return pushcodejs;
}

// Main function to handle notification workflow
export async function handleNotificationWorkflow() {
  const storedToken = await getTokenFromSecureStore();
  const tokenSaved = await getTokenStatusFromSecureStore();

  let token = "";
  //console.log(await getUserFromStore());
  if (!storedToken) {
    await requestUserPermission();
    const newToken = await getFcmToken();
    if (newToken) {
      await saveTokenToSecureStore(newToken);

      token = newToken;
      //RespondToTokenRequest(webviewRef, newToken);
    }
  } else {
      //console.log(storedToken);
      token = storedToken;
      //RespondToTokenRequest(webviewRef, storedToken);
  }

  return { token, tokenSaved }
}

// Handle incoming messages
export function setupNotificationHandler() {
  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //let channelId = 'default';
    /* notifee.displayNotification({
        title: 'Foreground Service Notification',
        body: 'Press the Quick Action to stop the service',
        android: {
            channelId,
            asForegroundService: true,
            color: AndroidColor.RED,
            colorized: true,
          actions: [
            {
              title: 'Stop',
              pressAction: {
                id: 'stop',
              },
            },
          ],
        },
      }); */
    // Display a notification using Notifee
    /* await notifee.displayNotification({
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
      android: {
        channelId: 'default',
        smallIcon: 'ic_launcher', // Your app icon
      },
    }); */

    /* messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification caused app to open from background state:', remoteMessage.notification);
        navigationRef.navigate('notification');
      });
    
      messaging().getInitialNotification().then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage.notification);
          navigationRef.navigate('notification');
        }
      }); */
  });
  /* messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
    if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        navigationRef.navigate('notification');
      }
  }); */
}
