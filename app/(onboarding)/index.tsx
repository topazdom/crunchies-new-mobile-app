import { Link, Stack } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { deviceWidth } from '@/constants/Size';
import { SafeAreaView } from 'react-native-safe-area-context';
import CircularButton from '@/components/CircularButton';

export default function OnboardingLanding() {
  return (
    <ThemedView style={styles.container}>
      {/* Watermark */}
      <ThemedView style={styles.bgContainer}>
        <View style={{
          height: '80%',
          width: '100%',
          paddingRight: deviceWidth * 0.08
        }}>
          <Image
            source={require('@/assets/images/watermark.png')}
            style={{
              resizeMode: 'contain',
              width: '100%',
              height: '100%'
            }}
          />
        </View>
      </ThemedView>
      <SafeAreaView style={{flex: 1}}>
        <View style={[styles.subContainer]}>
          <View
            style={styles.logo}
          >
            <Image
              source={require('@/assets/images/logo.png')}
              style={{
                resizeMode: 'contain',
                width: '100%',
                height: '100%'
              }}
            />
          </View>
          <View style={styles.imagesContainer}>
            <Image
              source={require('@/assets/images/sp1.png')}
              style={[styles.absImage]}
            />
            <Image
              source={require('@/assets/images/sp2.png')}
              style={[
                styles.absImage,
                {
                  width: deviceWidth * 0.75,
                  height: deviceWidth * 0.75,
                  left: 'auto',
                  right: -(deviceWidth * 0.47),
                  top: -20
                }
              ]}
            />
            <Image
              source={require('@/assets/images/sp3.png')}
              style={[
                styles.absImage,
                {
                  width: deviceWidth * 0.70,
                  height: deviceWidth * 0.70,
                  top: deviceWidth * 0.40,
                  left: -(deviceWidth * 0.48)
                }
              ]}
            />
            <Image
              source={require('@/assets/images/sp4.png')}
              style={[
                styles.absImage,
                {
                  width: deviceWidth * 0.55,
                  height: deviceWidth * 0.55,
                  left: 'auto',
                  right: -(deviceWidth * 0.37),
                  top: deviceWidth * 0.65,
                }
              ]}
            />
          </View>
        </View>
        <CircularButton />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  subContainer: {
    flex: 1,
  },
  bgContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center'
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  logo: {
    width: deviceWidth * 0.45,
    height: deviceWidth * 0.45
  },
  imagesContainer: {

  },
  absImage: {
    position: 'absolute',
    width: deviceWidth * 0.40,
    height: deviceWidth * 0.40,
    resizeMode: 'contain',
    left: -(deviceWidth * 0.39)
  }
});
