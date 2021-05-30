import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, ListItem, Avatar, Button } from 'react-native-elements';
import { themes } from '../color';
import Head from '../components/Head'

export default function AnnonceDetails({route, navigation}){
	const data = route.params?.param;
	return(
		<View>
      <Head screen={+route?.params?.param?.title} n={navigation} second/>
			<ScrollView>
				<View>
					{/* <Head screen={data.title} n={navigation}/> */}
					<View>

	        </View>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('8%'),
    flex: 1
  }
})
