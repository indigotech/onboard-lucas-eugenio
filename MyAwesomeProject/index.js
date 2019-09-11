import { registerScreens, goToNewUser, goToLogin, goToUsers, goToUserDetail } from './Screens'
import { Navigation } from 'react-native-navigation'

registerScreens()

Navigation.events().registerAppLaunchedListener(() => goToLogin())
