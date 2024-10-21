import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons'; // Importing icons from Expo Vector Icons
import Blink from './Blink';
import React from 'react';

interface OrderButtonProps {
  onPress?: (event: GestureResponderEvent) => void; // Optional onPress function prop
}

const OrderButton: React.FC<OrderButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Blink duration={500}>
        <AntDesign name="arrowright" style={styles.icon} />
      </Blink>
      <Text style={styles.text}>Click to Start Your Order!</Text>
      <Blink duration={500}>
        <AntDesign name="arrowleft" style={styles.icon} />
      </Blink>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E63946', // Crunchies-red color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignSelf: 'flex-end',
    borderRadius: 15,
    fontSize: 24,
  },
  icon: {
    fontSize: 18,
    marginHorizontal: 5,
    color: '#fff', // Ensure the icon color matches the text color
  },
  text: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default OrderButton;
