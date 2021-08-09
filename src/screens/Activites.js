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
import { List } from 'react-native-paper';
import { ActivityIndicator, Divider} from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
export default function Activites({navigation}){
const {t} = useTranslation();
const [acts, setA] =  useState(null);

  useEffect(() => {
    (async()  => {
      let acts = await activite.getdetailcategorues();
			setA(acts)
			let tab = [];
			for(let i = 0; i< acts.length; i++){
				let arr = await activite.getAllActivitybycategorie(acts[i].id)
				console.log('subca===>>>', acts[i], arr)
				tab.push({ ...acts[i], supActivity: arr})
			}
			setA(tab)
			console.log("sx========>>>>", tab)
    })();
    return;
  }, [])


	return(
		<View style={{flex: 1}}>
			<Head screen={t('common.app.activites')} n={navigation}/>
			<ScrollView>
				<View style={{ paddingHorizontal: wp('2%'), paddingTop: hp('2%')}}>
					{acts && acts.map((a, i) => (
						<View key={i}>
								<List.Accordion
									title={a.intitule? a.intitule: ""}
									description={a.description?.trim() !=="" ? a.description+" " : null}
									//{a.description&&a.description.trim() !==""? "...acts" : null}
									//left={props => <Avatar source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}} />}
									style={null}
									//left={props => <Avatar source={logo} />}
								>
									{a.supActivity&&a.supActivity.map((sub, k) =>
										<TouchableOpacity key={k} onPress={()=>navigation.navigate('ActivitesDetails', {act: sub})} style={{flexDirection: 'row'}}>
											<Ionicons name="arrow-forward-outline" size={23} />
											<Text style={{fontStyle: 'italic', color: color.primary, paddingBottom: 8}}>{sub.intitule}</Text>
										</TouchableOpacity>
									)}
								</List.Accordion>
								<Divider />
						</View>
					))}
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
