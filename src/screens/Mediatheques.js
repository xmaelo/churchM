import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets";
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, ListItem, Avatar,Button } from 'react-native-elements';
import { themes } from '../color';
import Head from '../components/Head';
import YoutubePlayer from "react-native-youtube-iframe";

export default function Mediatheques({navigation}){
	const list = [
		{
			id: 13,
			title: "zrfnkjfns",
			description: "khskhd dsndkshd hkj dkhqdnh",
			avatar_url: logo
		},
		{
			id: 15,
			title: "zrfnkjfns",
			description: "khskhd dsndkshd hkj dkhqdnh",
			avatar_url: logo
		},
		{
			id: 16,
			title: "zrfnkjfns",
			description: "khskhd dsndkshd hkj dkhqdnh",
			avatar_url: logo
		}
	];
	return(
		<ScrollView>
			<View>
				<Head screen={"Médiathèque"} n={navigation}/>
				<YoutubePlayer
					height={300}
					videoId={"iee2TATGMyI"}
				/>
				{
					list.map((l, i) => (
					<ListItem key={i} bottomDivider>
						<Avatar source={l.avatar_url} />
						<ListItem.Content>
						<ListItem.Title>{l.title}</ListItem.Title>
						<ListItem.Subtitle>{l.description}</ListItem.Subtitle>
						</ListItem.Content>
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
  },
  header: {
	  fontSize: 30
  }
})

