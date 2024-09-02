import { Placeholder, PlaceholderMedia, ShineOverlay } from 'rn-placeholder';
import { StyleSheet, View, ViewStyle } from 'react-native';

import React from 'react';

interface LoadingPlaceholderProps {
  height: number;
  width: number;
  borderRadius?: number;
  shape?: 'circle';
  style?: ViewStyle;
}

const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = ({ height, width, borderRadius, shape, style }) => {
  return (
    <Placeholder Animation={ShineOverlay}>
      <PlaceholderMedia
        style={[
          {
            height,
            width,
            borderRadius: shape === 'circle' ? width / 2 : borderRadius,
          },
          style,
        ]}
      />
    </Placeholder>
  );
};

export default LoadingPlaceholder;
