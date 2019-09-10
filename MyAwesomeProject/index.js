import { registerScreens, goToNewUser } from './Screens'
import { Navigation } from 'react-native-navigation'

registerScreens()

Navigation.events().registerAppLaunchedListener(() => {goToNewUser()})
