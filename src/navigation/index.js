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
import Mediatheques from '../screens/Mediatheques';
import Recovery from '../screens/Recovery';
import Annonces from '../screens/Annonces';
import AnnonceDetails from '../screens/AnnonceDetails';
import Profil from '../screens/Profil';
import LectureBiblique from '../screens/LectureBiblique';
import DetailLecture from '../screens/DetailLecture';
import ActivitesDetails from '../screens/ActivitesDetails';
import Rendezvous from '../screens/Rendezvous';


const Stack = createStackNavigator();

export function StackNav(){
  return(
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
        name="Mediatheque"
        component={Mediatheques}
        options={{
          title: null,
          headerTransparent: true
        }}
      />
  <Stack.Screen
    name="Recovery"
    component={Recovery}
    options={{
          title: null,
          headerTransparent: true
        }}
  />
  <Stack.Screen
    name="Annonces"
    component={Annonces}
    options={{
          title: null,
          headerTransparent: true
        }}
  />
  <Stack.Screen
    name="Rendezvous"
    component={Rendezvous}
    options={{
          title: null,
          headerTransparent: true
        }}
  />
  <Stack.Screen
    name="AnnonceDetails"
    component={AnnonceDetails}
    options={({route})=> ({
          title: route.params.param.title,
          headerTransparent: false
        })}
  />
  <Stack.Screen
    name="ActivitesDetails"
    component={ActivitesDetails}
    options={({route})=> ({
          title: route.params.param.title,
          headerTransparent: false
        })}
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
	        	name="Profil"
	        	component={Profil}
	        	options={{
	        		title: "Profil",
	        		headerTransparent: false
	        	}}
	        />
			<Stack.Screen
	        	name="LectureBiblique"
	        	component={LectureBiblique}
	        	options={{
	        		title: "Lecture biblique",
	        		headerTransparent: false
	        	}}
	        />
			<Stack.Screen
				name="DetailLecture"
				component={DetailLecture}
				options={({route})=> ({
	        		title: 'Lecture du '+route.params.param.jour,
	        		headerTransparent: false
	        	})}
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

    </Stack.Navigator>
  )
}

export function Navigate() {
  return (
    <NavigationContainer>
    </NavigationContainer>
  );
}

//export default Navigate;
