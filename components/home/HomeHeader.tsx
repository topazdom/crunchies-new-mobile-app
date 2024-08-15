import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonColors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';

const HomeHeader = () => {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.greeting}>
          <ThemedText style={styles.name}>Hi Olumide Fala</ThemedText>
          <ThemedText style={styles.message}>It's lunch time!</ThemedText>
        </View>
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="search-outline" size={24} color={commonColors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  greeting: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 24,
    fontWeight: '500',
    color: '#333',
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