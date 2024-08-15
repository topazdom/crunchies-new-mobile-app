import React from 'react';
import {View} from 'react-native';
import {RH, RW} from '@/constants/_responsiveSize';
/* ANCHOR SIZED BOX */
interface SizedBox {
  height?: number;
  width?: number;
  backgroundColor?: any;
  flex?: number;
  borderColor?: string;
  borderRadius?: number;
}
const SizedBox = ({
  width,
  height,
  flex,
  backgroundColor,
  borderColor,
  borderRadius,
}: SizedBox) => {
  return (
    <View
      style={[
        {
          width: width ? (typeof width === 'string' ? width : RW(width)) : 'auto',
          height: height
            ? typeof height === 'string'
              ? height
              : RH(height)
            : 'auto',
          flex,
          backgroundColor,
          borderRadius: borderRadius ? borderRadius : 0,
        },
        // @ts-ignore
        borderColor && {borderWidth: 0.331, borderColor},
      ]}
    />
  );
};

export default SizedBox
