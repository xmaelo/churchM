import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import {img1} from "../assets"
import {img2} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, ListItem, Avatar, Button } from 'react-native-elements';
import { themes } from '../color';
import Head from '../components/Head'

export default function Annonces({navigation}){
	const list = [
		{
			id: 13,
			title: "Chrorale UCJG",
			description: "khskhd dsndkshd hkj dkhqdnh",
			avatar_url: img1
		},
		{
			id: 15,
			title: "Concert Chretien",
			description: "khskhd dsndkshd hkj dkhqdnh",
			avatar_url: img2
		},
		{
			id: 16,
			title: "Visite Orphelinat",
			description: "khskhd dsndkshd hkj dkhqdnh",
			avatar_url: img1
		}
	];
	return(
		<ScrollView>
			<View>
				<Head screen={"Annonces"} n={navigation}/>
				{
					list.map((l, i) => (
					<ListItem key={i} bottomDivider onPress={()=>navigation.navigate('AnnonceDetails', {param: l})}>
						<ListItem.Content>
						<ListItem.Title>{l.title}</ListItem.Title>
						{/* <ListItem.Subtitle>{l.description}</ListItem.Subtitle> */}
						</ListItem.Content>
						<Avatar source={l.avatar_url} />
					</ListItem>
					))
				}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('8%'),
    flex: 1
  }
})

