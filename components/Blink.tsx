import { Animated, View, ViewStyle } from 'react-native';
import React, { Component } from 'react';

// Define the props interface
interface BlinkProps {
  duration: number;
  repeat_count?: number;
  style?: ViewStyle;
  children?: React.ReactNode;
}

// Define the state interface (if any)
interface BlinkState {}

// Use generic typing for the React Component
export default class Blink extends Component<BlinkProps, BlinkState> {
  private fadeAnimation: Animated.Value;

  constructor(props: BlinkProps) {
    super(props);
    this.fadeAnimation = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.fadeAnimation, {
          toValue: 0,
          duration: this.props.duration,
          useNativeDriver: true,
        }),
        Animated.timing(this.fadeAnimation, {
          toValue: 1,
          duration: this.props.duration,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: this.props.repeat_count,
      }
    ).start();
  }

  render() {
    return (
      <View style={this.props.style}>
        <Animated.View style={{ opacity: this.fadeAnimation }}>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}
