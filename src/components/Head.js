import * as React from 'react';
import { Text, Input, Button, Header } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Head({n, screen}){
	return(
		<Header
		  leftComponent={()=>
		  	<TouchableOpacity
		  		onPress={()=>n.toggleDrawer()}
		  	>
		  		<Ionicons name={"menu-outline"} size={25} color={"#fff"} style={{marginLeft: 10}}/>
		  	</TouchableOpacity>
		  }
		  centerComponent={{ text: screen, style: { color: '#fff' } }}
		  //rightComponent={{ icon: 'home', color: '#fff' }}
		/>
	)
}