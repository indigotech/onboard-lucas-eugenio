import { Navigation } from 'react-native-navigation'
import { Login } from './components/Login'
import { UserList } from './components/UserList'
import { RegisterUser } from './components/RegisterUser'

export function registerScreens() {
  Navigation.registerComponent('Login', () => Login)
  Navigation.registerComponent('Users', () => UserList)
  Navigation.registerComponent('NewUser', () => RegisterUser)
}

export function goToLogin() {
	Navigation.setRoot({root:{component:{name:'Login'}}})
}

export function goToUsers() {
	Navigation.setRoot({root:{component:{name:'Users'}}})
}

export function goToNewUser() {
  Navigation.setRoot({root:{component:{name:'NewUser'}}})
}