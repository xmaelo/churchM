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
import { Card, Title, Paragraph } from 'react-native-paper';
import {activite} from '../statefull/activites'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
export default function Activites({navigation}){
	const [p0, setA] =  useState(0);

  useEffect(() => {
    (async()  => {
      const acts = await activite.getdetailcategorues();
      console.log('acts acts agin', acts)
    })();
    return;
  }, [])


	return(
		<View style={{flex: 1}}>
			<Head screen={"Activités Paroissiales"} n={navigation}/>
			<ScrollView>
				<View style={{ paddingHorizontal: wp('2%'), paddingTop: hp('2%')}}>
					<Card>
						<Card.Title title="Card Title" subtitle="Card Subtitle" />
						<Card.Content>
							<Paragraph>
								Resting elevation of the card which controls the drop shadow.
								Resting elevation of the card which controls the drop shadow.
							</Paragraph>
						</Card.Content>
						<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
						<Card.Actions>
							<Button>Cancel</Button>
							<Button>Ok</Button>
						</Card.Actions>
					</Card>

				</View>
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
		marginLeft: wp('1.7%'),
		marginRight: wp('1.7%'),
		padding: hp('2%'),
		paddingHorizontal: wp('4%'),
		borderRadius: 10,
		minHeight: hp('5%'),
		marginTop: hp('2%'),
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.39,
		shadowRadius: 8.30,

		elevation: 2,
	},
	container_all_dec: {
	  // alignItems: 'left',
	  marginLeft: hp('3%'),
	  paddingTop: hp('2%')
	},
	h1: {fontSize: 18, fontWeight: 'bold', color: color.textSeconday},
	img: {
		width: wp("30%"),
		height: hp("15%"),
		borderRadius: wp('3px'),
	},
	image: {
		resizeMode: "cover",
		width: wp('40%'),
	}
  })
