import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import Preparation from '../screens/Preparation'
import ContactEglise from '../screens/ContactEglise'
import Chat from '../screens/Chat'
import Drawer from './Drawer'
import { themes, color } from '../color';


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
	        <Stack.Screen 
	        	name="Preparation" 
	        	component={Preparation} 
	        	options={{ 
	        		title: "Préparation",
	        		headerTransparent: false
	        	}}
	        />
	        <Stack.Screen 
	        	name="Chat" 
	        	component={Chat} 
	        	options={{ 
	        		title: "Chat",
	        		headerTransparent: false
	        	}}
	        />
	        <Stack.Screen 
	        	name="ContactEglise" 
	        	component={ContactEglise} 
	        	options={{ 
	        		title: "Contacter l'Eglise",
	        		headerTransparent: false
	        	}}
	        />
	        <Stack.Screen 
	        	name="Drawer" 
	        	component={Drawer} 
	        	options={{ 
	        		//headerTitle: () => <Ionicons name={"grid-outline"} size={25} color={color.primary}/>,
	        		headerTransparent: true,
	        		headerLeft: null,
	        		title: null
	        	}}
	        />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigate;