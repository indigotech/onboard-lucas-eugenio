import { Navigation } from 'react-native-navigation'
import { Login } from './components/Login'
import { UserList } from './components/UserList';

export function registerScreens() {
  Navigation.registerComponent('Login', () => Login)
  Navigation.registerComponent('Users', () => UserList)
}