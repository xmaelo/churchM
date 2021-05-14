import * as React from 'react';
import { Text, Input, Button, Header } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Head({n, screen}){
	return(
		<Header
		  placement="left"
		  leftComponent={{ icon: 'menu', color: '#fff', onPress:  ()=>n.toggleDrawer()}}
		  centerComponent={{ text: screen, style: { color: '#fff' } }}
		  rightComponent={{ icon: 'home', color: '#fff' }}
		/>
	)
}