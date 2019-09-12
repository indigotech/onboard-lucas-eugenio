import { Navigation } from 'react-native-navigation'
import { LoginScreen } from './components/LoginScreen'
import { UserList } from './components/UserList'
import { RegisterUserScreen } from './components/RegisterUserScreen'
import { UserDetail } from './components/UserDetail'

export function registerScreens() {
  Navigation.registerComponent('Login', () => LoginScreen)
  Navigation.registerComponent('Users', () => UserList)
  Navigation.registerComponent('NewUser', () => RegisterUserScreen)
  Navigation.registerComponent('UserDetail', () => UserDetail)
}

export function goToLogin() {
	Navigation.setRoot({ root: { component: { name: 'Login' } } })
}

export function goToUsers() {
	Navigation.setRoot({ root: { component: { name: 'Users' } } })
}

export function goToNewUser() {
  Navigation.setRoot({ root: { component: { name: 'NewUser' } } })
}

export function goToUserDetail(id: number) {
  Navigation.setRoot({ root: { component: { name:'UserDetail', passProps: { userId: id } } } })
}