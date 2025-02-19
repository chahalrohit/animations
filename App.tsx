/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PixelRatio,
  Dimensions,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import {faker, he} from '@faker-js/faker';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

const users = faker.lorem.sentence(20);

const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;

const {width, height} = Dimensions.get('window');
const pixelDensity = PixelRatio.get(); // Pixel density (dots per inch scaling)
const totalDots = width * height * pixelDensity;

const App = () => {
  const {width, height} = Dimensions.get('window');
  const pixelDensity = PixelRatio.get(); // Pixel density (dots per inch scaling)
  const totalDots = width * height * pixelDensity;

  console.log(`Screen width: ${width}px`);
  console.log(`Screen height: ${height}px`);
  console.log(`Pixel density: ${pixelDensity}`);
  console.log(`Total Dots: ${totalDots}`);
  console.log(users);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal: wp(5),
        overflow: 'hidden',
        marginTop: wp(5),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <FastImage
          style={{width: wp(90), height: hp(30)}}
          source={require('./src/assets/images/owl.jpg')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text
          style={{
            fontSize: wp(3),
            fontFamily: 'Poppins-Regular',
            // flexShrink: 1,
          }}>
          {text}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
