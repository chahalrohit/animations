import React, {useRef, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useDerivedValue,
  useAnimatedStyle,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Octicons';

const {height, fontScale} = Dimensions.get('window');

const VerticalRuler = ({
  min = 0,
  max = 200,
  initialValue = 165,
  unit = 'cm',
  onValueChange,
}) => {
  const ITEM_HEIGHT = 20;
  const HEIGHT_VALUES = Array.from({length: max - min + 1}, (_, i) => min + i);
  const scrollY = useSharedValue(initialValue * ITEM_HEIGHT);
  const flatListRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState(initialValue);

  useDerivedValue(() => {
    const adjustedIndex = Math.round(scrollY.value / ITEM_HEIGHT);
    if (
      HEIGHT_VALUES[adjustedIndex] !== undefined &&
      HEIGHT_VALUES[adjustedIndex] !== selectedValue
    ) {
      runOnJS(setSelectedValue)(HEIGHT_VALUES[adjustedIndex]);
      if (onValueChange) {
        runOnJS(onValueChange)(HEIGHT_VALUES[adjustedIndex]);
      }
    }
  });

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const indicatorStyle = useAnimatedStyle(() => ({
    top: height / 2.06 - ITEM_HEIGHT / 2,
  }));

  return (
    <View style={styles.container}>
      {/* Selected Value Display */}
      <View style={styles.selectedValueContainer}>
        <Text style={styles.selectedValue}>{selectedValue}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>

      {/* Scrollable Ruler */}
      <Animated.FlatList
        style={styles.ruler}
        ref={flatListRef}
        data={HEIGHT_VALUES}
        keyExtractor={item => item.toString()}
        renderItem={({item, index}) => {
          const scale = interpolate(
            scrollY.value / ITEM_HEIGHT,
            [index - 1, index, index + 1],
            [0.8, 1.0, 0.8],
            'clamp',
          );

          const opacity = interpolate(
            scrollY.value / ITEM_HEIGHT,
            [index - 1, index, index + 1],
            [1, 0.5, 1],
            'clamp',
          );

          return (
            <Animated.View
              style={[styles.itemContainer, {transform: [{scale}], opacity}]}>
              {item % 5 === 0 && (
                <Animated.Text style={styles.leftLabel}>{item}</Animated.Text>
              )}
              <View
                style={[
                  styles.tick,
                  item % 5 === 0 ? styles.majorTick : styles.mediumTick,
                ]}
              />
            </Animated.View>
          );
        }}
        showsVerticalScrollIndicator={false}
        snapToOffsets={HEIGHT_VALUES.map((_, i) => i * ITEM_HEIGHT)}
        decelerationRate="fast"
        onScroll={onScroll}
        initialScrollIndex={initialValue}
        contentContainerStyle={{paddingVertical: (height - ITEM_HEIGHT) / 2}}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: index * ITEM_HEIGHT,
          index,
        })}
      />

      {/* Indicator */}
      <Animated.View style={[styles.indicator, indicatorStyle]}>
        <View style={{transform: [{rotate: '180deg'}]}}>
          <Icon name="triangle-right" size={40} color="blue" />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    position: 'absolute',
    right: 20,
  },
  selectedValueContainer: {
    position: 'absolute',
    right: fontScale * 200,
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectedValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  unit: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  ruler: {
    width: fontScale * 150,
    borderRightWidth: 1,
  },
  itemContainer: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  leftLabel: {
    fontSize: fontScale * 25,
    color: '#777',
    position: 'absolute',
    right: 90,
  },
  tick: {
    backgroundColor: 'gray',
  },
  majorTick: {
    width: fontScale * 100,
    height: 2,
    backgroundColor: 'gray',
    position: 'absolute',
    left: 80,
  },
  mediumTick: {
    width: fontScale * 50,
    height: 2,
    backgroundColor: 'gray',
    left: 25,
  },
  indicator: {
    position: 'absolute',
    right: -fontScale * 22,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VerticalRuler;
