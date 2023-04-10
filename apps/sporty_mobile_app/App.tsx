import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PlansScreen from './screens/Plans.screen';
import CalendarScreen from './screens/Calendar.screen';
import HomeScreen from './screens/Home.screen';
import ProfileScreen from './screens/Profile.screen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        {/* <Tab.Screen name="Plans" component={PlansScreen} /> */}
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
