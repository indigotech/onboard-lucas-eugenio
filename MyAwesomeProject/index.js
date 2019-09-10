import { registerScreens, goToNewUser, goToLogin } from './Screens'
import { Navigation } from 'react-native-navigation'

registerScreens()

Navigation.events().registerAppLaunchedListener(() => {goToLogin()})
