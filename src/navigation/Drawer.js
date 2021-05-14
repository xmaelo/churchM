import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Accueil from '../screens/Accueil'
import Activites from '../screens/Activites'
import Annonces from '../screens/Annonces'
import Candiques from '../screens/Candiques'
import Mediatheques from '../screens/Mediatheques'
import Finaces from '../screens/Finaces'
import SainteScene from '../screens/SainteScene'
import Profil from '../screens/Profil'
import Parametres from '../screens/Parametres'
import RendezVous from '../screens/RendezVous'
import { Text, Input, Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { themes, color } from '../color';
import {logo} from "../assets"

const ARG__ = createDrawerNavigator();

const Title = ({display}) => <Text style={themes.menuStyle}>{display}</Text>
const DrawIcon = ({name, f}) => <Ionicons name={name} size={25} color={f ? color.primary : '#ccc'}/>

export default function Drawer() {
  return (
      <ARG__.Navigator 
      	initialRouteName="Accueil"
      	drawerContentOptions={{
          //activeTintColor: 'black',
          //inactiveTintColor: 'black',
          //itemStyle: { alignItems:'flex-end' },
        }}
        //drawerContent={(props) => <Image source={logo} />}
      >
      	
        <ARG__.Screen 
        	name="Accueil" 
        	component={Accueil} 
        	options={{
	           title: ()=><Title display={"Accueil"}/>,
	           drawerIcon: ({focused}) => (
	               <DrawIcon name={"home-outline"} f={focused}/>
	           ),
	        }}
        />
        <ARG__.Screen 
        	name="Finaces" 
        	component={Finaces} 
        	options={{
	           title: ()=><Title display={"Mes Finaces"}/>,
	           drawerIcon: ({focused}) => (
	               <DrawIcon name={"logo-usd"} f={focused}/>
	           ),
	        }}
        />
        <ARG__.Screen 
        	name="Profil" 
        	component={Profil} 
        	options={{
	           title: ()=><Title display={"Mon Profile"}/>,
	           drawerIcon: ({focused}) => (
	               <DrawIcon name={"person-circle-outline"} f={focused}/>
	           ),
	        }}
        />

        <ARG__.Screen 
        	name="Annonces" 
        	component={Annonces} 
        	options={{
	           title: ()=><Title display={"Annonces"}/>,
	           drawerIcon: ({focused}) => (
	               <DrawIcon name={"newspaper-outline"} f={focused}/>
	           ),
	        }}
        />

        <ARG__.Screen 
        	name="Candiques" 
        	component={Candiques} 
        	options={{
	           title: ()=><Title display={"Candiques/Bible"}/>,
	           drawerIcon: ({focused}) => (
	               <DrawIcon name={"book-outline"} f={focused}/>
	           ),
	        }}
        />
        <ARG__.Screen 
        	name="Mediatheques" 
        	component={Mediatheques} 
        	options={{
	           title: ()=><Title display={"Médiathèque"}/>,
	           drawerIcon: ({focused}) => (
	               <DrawIcon name={"musical-notes-outline"} f={focused}/>
	           ),
	        }}
        />

        <ARG__.Screen 
        	name="Activites" 
        	component={Activites} 
        	options={{
	           title: ()=><Title display={"Activités Paroissiales"}/>,
	           drawerIcon: ({focused}) => (
	               <DrawIcon name={"logo-react"} f={focused}/>
	           ),
	        }}
        />

        <ARG__.Screen 
        	name="SainteScene" 
        	component={SainteScene} 
        	options={{
	           title: ()=><Title display={"Sainte Cène"}/>,
	           drawerIcon: ({focused}) => (
	               <DrawIcon name={"restaurant-outline"} f={focused}/>
	           ),
	        }}
        />

        <ARG__.Screen 
        	name="RendezVous" 
        	component={RendezVous} 
        	options={{
	           title: ()=><Title display={"Rendez-Vous"}/>,
	           drawerIcon: ({focused}) => (
	               <DrawIcon name={"stopwatch-outline"} f={focused}/>
	           ),
	        }}
        />
        <ARG__.Screen 
        	name="Parametres" 
        	component={Parametres} 
        	options={{
	           title: ()=><Title display={"Mes Paramètres"}/>,
	           drawerIcon: ({focused}) => (
	               <DrawIcon name={"cog-outline"} f={focused}/>
	           ),
	        }}
        />
      </ARG__.Navigator>
  );
}