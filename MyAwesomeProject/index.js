/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Login } from './components/Login';
import { UserList } from './components/UserList'
import { RegisterUser } from './components/RegisterUser'

AppRegistry.registerComponent(appName, () => RegisterUser);
