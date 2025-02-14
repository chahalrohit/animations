const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
const {getDefaultConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

// Wrap with Reanimated Metro config
module.exports = wrapWithReanimatedMetroConfig(defaultConfig);
