import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import {img1} from "../assets"
import {img2} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button } from 'react-native-elements';
import { themes, color } from '../color';
import Head from '../components/Head'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';

export default function Activites({navigation}){

	const list = [
		{
			id: 13,
			title: "Excursion à Buea",
			description: "khskhd dsndkshd hkj dkhqdnh",
			avatar_url: img1,
			debut: "15 Juin 2021",
			fin: "22 Juin 2021"
		},
		{
			id: 15,
			title: "Formation Croix Rouge",
			description: "khskhd dsndkshd hkj dkhqdnh",
			avatar_url: img2,
			debut: "10 Juin 2021",
			fin: "22 Juin 2021"
		},
		{
			id: 16,
			title: "Visite",
			description: "khskhd dsndkshd hkj dkhqdnh",
			avatar_url: img1,
			debut: "17 Juin 2021",
			fin: "18 Juin 2021"
		},
		{
			id: 17,
			title: "Voyage En Israël",
			description: "khskhd dsndkshd hkj dkhqdnh",
			avatar_url: img1,
			debut: "23 Juin 2021",
			fin: "28 Juillet 2021"
		},
	];

	return(
		<View style={{flex: 1}}>
			<Head screen={"Activités Paroissiales"} n={navigation}/>
			<ScrollView>
			{
				list.map((l, i) => (
					<TouchableOpacity key={i} style={styles.container_card_main} onPress={()=>navigation.navigate('ActivitesDetails', {param: l})}>
						<View style={styles.image}>
							<Image source={l.avatar_url} style={styles.img}/>
						</View>
						<View style={styles.container_all_dec}>
							<Text style={styles.h1}>{l.title}</Text>
							<Text>{l.description}</Text>
						</View>
					</TouchableOpacity>
				))
			}
			</ScrollView>
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
	  display: 'flex',
	  flexDirection: 'row'
	},
	container_all_dec: {
	  // alignItems: 'left',
	  marginLeft: hp('3%'),
	  paddingTop: hp('2%')
	},
	h1: {fontSize: 18, fontWeight: 'bold', color: color.textSeconday},
	img: {
		width: wp("40%"), 
		height: hp("20%"),
		borderRadius: wp('3px'),
	},
	image: {
		resizeMode: "cover",
		width: wp('40%'),
	}
  })

