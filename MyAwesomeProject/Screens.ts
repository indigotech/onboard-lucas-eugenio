import { Navigation } from 'react-native-navigation'
import { Login } from './components/Login'
import { UserList } from './components/UserList'
import { RegisterUser } from './components/RegisterUser'
import { UserDetail } from './components/UserDetail'

export function registerScreens() {
  Navigation.registerComponent('Login', () => Login)
  Navigation.registerComponent('Users', () => UserList)
  Navigation.registerComponent('NewUser', () => RegisterUser)
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