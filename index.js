/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import Layout from "./src/Layout"
import { name as appName } from './app.json';
import 'react-native-gesture-handler'; 

AppRegistry.registerComponent(appName, () => Layout);