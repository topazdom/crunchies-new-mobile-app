import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import OrderButton from '../OrderNowBtn';
import React from 'react';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { commonColors } from '@/constants/Colors';
import { router } from 'expo-router';

const HomeHeader = () => {
  return (
    <ThemedView>
      <View style={styles.header}>
        <View style={styles.greeting}>
          <ThemedText style={styles.name}>Welcome to Crunchies!</ThemedText>
          <ThemedText style={styles.message}>Taste the Difference!</ThemedText>
        </View>
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="search-outline" size={24} color={commonColors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.orderbtn}>
        <OrderButton onPress={()=>router.push('/webview')} />
        </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  orderbtn: {
    alignSelf: "center",
    paddingVertical: 20
  },
  greeting: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 24,
    fontWeight: '500',
    // color: '#333',
  },
  message: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  searchIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#ffeeee',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeHeader;