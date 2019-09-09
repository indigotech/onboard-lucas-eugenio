/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import {name as appName} from './app.json'
import { registerScreens } from './Screens'
import { Navigation } from 'react-native-navigation'

registerScreens()

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: 'Login'
        }
      }
    })
  })
