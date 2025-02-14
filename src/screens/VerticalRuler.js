import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import VerticalRuler from '../components/VerticalRuler';

const HeightSelectionScreen = () => {
  const [height, setHeight] = useState(165);

  return (
    <View style={styles.screen}>
      <VerticalRuler
        min={50}
        max={250}
        initialValue={height}
        onValueChange={setHeight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectedHeight: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default HeightSelectionScreen;
