import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const AppStack = createStackNavigator();
import App from '../app';
import AuthScreens from '../auth';
import {NavigationContainer} from '@react-navigation/native';
const AppNavigation = () => {
  return (
	<NavigationContainer>

	  <>
        <AppStack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Auth">
          <AppStack.Screen name="App" component={App} />
          <AppStack.Screen name="Auth" component={AuthScreens} />
        </AppStack.Navigator>
		</>
		</NavigationContainer>
  );
};

export default AppNavigation;