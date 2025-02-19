/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
LogBox.ignoreAllLogs();

// screens
import Simple from './src/screens/Simple';
import Animatedlist from './src/screens/Animatedlist';
import VerticalRuler from './src/screens/VerticalRuler';
import FakeImageList from './src/screens/FakeImageList';

AppRegistry.registerComponent(appName, () => FakeImageList);
