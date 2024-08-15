import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Recommendations = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <Image
          source={require('@/assets/images/recom-1.png')}
          style={styles.btnImage}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Image
          source={require('@/assets/images/recom-2.png')}
          style={styles.btnImage}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Image
          source={require('@/assets/images/recom-3.png')}
          style={styles.btnImage}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Recommendations

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 15,
    paddingTop: 5
  },
  btn: {
    flex: 1,
    height: 104,
  },
  btnImage: {
    height: '120%',
    width: '120%',
    resizeMode: 'cover',
    marginLeft: -10
  }
})