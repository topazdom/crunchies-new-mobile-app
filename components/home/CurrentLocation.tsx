import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons if not already installed
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

const CurrentLocation = ({ location }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={require('@/assets/images/location-bg.png')} // Replace with your actual background image
        style={styles.backgroundImage}
      />
      <ThemedView style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="location" size={24} color="#FF0000" />
        </View>
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>Current location</ThemedText>
          <ThemedText numberOfLines={1} style={styles.address}>{location}</ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#888888" />
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(185,187,200,0.3)'
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFill,
    resizeMode: 'cover'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    // backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  address: {
    fontSize: 14,
    color: '#666',
  },
});

export default CurrentLocation;