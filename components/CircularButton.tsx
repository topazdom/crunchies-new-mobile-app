import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link } from 'expo-router';

const CircularButton = () => {
  const text = 'Get Started - Get Started - ';
  const chars = text.split('');

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {chars.map((char, index) => (
          <View
            key={index}
            style={[
              styles.charWrapper,
              {
                transform: [
                  { rotate: `${index * (360 / chars.length)}deg` },
                ],
              },
            ]}
          >
            <ThemedText style={styles.char}>{char}</ThemedText>
          </View>
        ))}
      </View>
      <Link
        asChild
        href='/(onboarding)/walkthrough'
      >
        <TouchableOpacity style={styles.button}>
          <FontAwesome6 name="arrow-right-long" size={24} color="#fff" />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  charWrapper: {
    position: 'absolute',
    left: '43%',
    // top: '50%',
    width: 20,
    height: 160,
  },
  char: {
    position: 'absolute',
    left: -10,
    top: 10, // Adjust this value to move text closer to or further from the center
    width: 20,
    textAlign: 'center',
    fontSize: 12, // Adjusted for better fit
    // color: 'black',
  },
  button: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    color: 'white',
    fontSize: 24,
  },
});

export default CircularButton;