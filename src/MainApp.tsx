import { createStackNavigator, createAppContainer } from 'react-navigation'
import TweetsList from './modules/TweetsList'
import './common/ui/EStyleSheet'

import { colors } from './common/ui'

const MainAppStack = createStackNavigator(
  {
    home: { screen: TweetsList }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.$primaryColor
      },
      headerTitleStyle: {
        fontSize: 20
      }
    }
  } as any // TODO: Remove as any when @types/react-navigation will be updated
)

export default createAppContainer(MainAppStack)
