import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'


const Stack = createStackNavigator();

function Navigate() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
	        <Stack.Screen 
	        	name="Login" 
	        	component={LoginScreen} 
	        	options={{ 
	        		title: null,
	        		headerTransparent: true,  
              		headerLeft: ()=> null
	        	}}
	        />
	        <Stack.Screen 
	        	name="Register" 
	        	component={RegisterScreen} 
	        	options={{ 
	        		title: null,
	        		headerTransparent: true
	        	}}
	        />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigate;