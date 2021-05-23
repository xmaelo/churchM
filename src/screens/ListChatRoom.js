import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, FlatList, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button } from 'react-native-elements';
import { themes, color } from '../color';
import Head from '../components/Head'
import Dialog from '../components/dialog'

let n = null;
const dialogs = [
	{name: 'Chorale', last_message: "Bonjour tout les monde! quoi de neuf.", last_message_date_sent: new Date(), updated_date: new Date(), unread_messages_count: 55}
]
const _renderDialog = ({ item }) => {
    return (
      <Dialog dialog={item} navigation={n} />
    )
}

const keyExtractor = (item, index) => index.toString()

export default function ListChatRoom({navigation}){
	n = navigation;
	return(
		<View>
			<Head screen={"Groupes && Messages"} n={navigation}/>
			<View style={styles.content}>
				<FlatList
	                data={dialogs}
	                keyExtractor={keyExtractor}
	                renderItem={(item) => _renderDialog(item)}
	             />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container2: {
    paddingHorizontal: wp('2%')
  },
  content: {
  	marginTop: hp('2%')
  },
  ProgressBar: {
    paddingRight: wp('3%'),
    paddingTop: hp('1%')
   },
   text: {justifyContent: "flex-end", flexDirection: 'row'},
   titleP: { fontSize: 16, color: "#7F7F9A", paddingBottom: hp('2%') },
   progressCircle: {
  		alignItems: 'center',
  		justifyContent: 'center'
   },
   circle: {
   	flexDirection: 'row',
   	alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: hp('2%')
   }
})