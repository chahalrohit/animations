import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
} from 'react-native-reanimated';

const DATA = Array.from({length: 20}, (_, i) => ({
  id: i.toString(),
  title: `Item ${i + 1}`,
}));

const AnimatedItem = ({item, index, scrollY}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [(index - 1) * 100, index * 100, (index + 1) * 100],
      [0.8, 1, 0.8],
    );

    return {transform: [{scale}]};
  });

  return (
    <Animated.View style={[styles.item, animatedStyle]}>
      <Text style={styles.text}>{item.title}</Text>
    </Animated.View>
  );
};

const AnimatedFlatListExample = () => {
  const scrollY = useSharedValue(0);

  // ✅ Correct way to handle scroll events in Reanimated 2+
  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <AnimatedItem item={item} index={index} scrollY={scrollY} />
        )}
        onScroll={handleScroll} // 🔥 Using `useAnimatedScrollHandler` correctly
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    height: 100,
    marginVertical: 10,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AnimatedFlatListExample;
