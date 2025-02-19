import React, {useState} from 'react';
import {SafeAreaView, FlatList, View, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {faker} from '@faker-js/faker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fakeImages} from './data';

const {width} = Dimensions.get('window');

const FakeImageList = () => {
  const [data, setData] = useState(fakeImages);
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={{padding: wp(2)}}
        renderItem={({item}) => (
          <View style={{margin: wp(1)}}>
            <FastImage
              style={{
                width: width / 3.5, // Responsive width for 3-column layout
                height: hp(15), // Dynamic height
                borderRadius: 10,
              }}
              source={{
                uri: item.imageUrl,
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.web,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default FakeImageList;
