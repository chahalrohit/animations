import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Button} from 'react-native';

const Simple = () => {
  const width = useSharedValue(100);
  const height = useSharedValue(100);
  const opacity = useSharedValue(1);

  const onExpand = () => {
    width.value = withSpring(width.value + 50);
  };

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Animated.View
        style={{
          height,
          width,
          backgroundColor: 'violet',
          opacity: opacity.value, // Apply shared value to opacity
          marginBottom: 25,
        }}></Animated.View>
      <Button title="Expand" onPress={onExpand} />
    </SafeAreaView>
  );
};
export default Simple;

const styles = StyleSheet.create({
  container: {},
});
