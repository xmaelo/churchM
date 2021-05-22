import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button } from 'react-native-elements';
import { themes, color} from '../color';
import Head from '../components/Head'

export default function Parametres({navigation}){
	return(
		<View>
			<Head screen={"Paramètres"} n={navigation}/>
			<View>
	  			<View style={styles.container_card_main}>
		        	<View style={styles.container_all_dec}>
		        		<Text style={styles.h1}>Personnel</Text>

		        		<View style={{...styles.end2, marginTop: hp('2%')}} >
		        			<Ionicons name={"person-circle-outline"} size={27} color={color.primary}/>
		        			<Text>{" Mon compte"}</Text>
		        		</View>
		        		<View style={{...styles.end2, marginTop: hp('2%')}} >
		        			<Ionicons name={"log-out-outline"} size={27} color={color.primary}/>
		        			<Text>{" Deconnexion"}</Text>
		        		</View>
		        	</View>
		        </View>

		        <View style={styles.container_card_main}>
		        	<View style={styles.container_all_dec}>
		        		<Text style={styles.h1}>Application</Text>

		        		<View style={{...styles.end2, marginTop: hp('2%')}} >
		        			<Ionicons name={"send-outline"} size={27} color={color.primary}/>
		        			<TouchableOpacity onPress={()=>navigation.navigate('ContactEglise')}>
		        				<Text>{" Contacter l'église"}</Text>
		        			</TouchableOpacity>
		        		</View>
		        		<View style={{...styles.end2, marginTop: hp('2%')}} >
		        			<Ionicons name={"help-circle-outline"} size={27} color={color.primary}/>
		        			<Text>{" A Propos de l'application"}</Text>
		        		</View>
		        	</View>
		        </View>
	  		</View>
		</View>
	)
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('8%'),
    flex: 1
  },
  end: {
  	flexDirection: 'row',
  	justifyContent: 'space-around',
  	alignItems: 'center',
  },
  end2: {
  	flexDirection: 'row',
  	alignItems: 'center',
  },
  container_card_main: {
    backgroundColor: 'white',
    marginLeft: hp('2%'),
    marginRight: hp('2%'),
    borderRadius: 10,
    height: hp('20%'),
    marginTop: hp('2%'),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,

    elevation: 5,
  },
  container_all_dec: {
    // alignItems: 'left',
    marginLeft: hp('3%'),
    paddingTop: hp('2%')
  },
  h1: {fontSize: 18, fontWeight: 'bold', color: color.textSeconday}
})
