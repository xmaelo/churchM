import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, ListItem, Avatar, Button } from 'react-native-elements';
import { themes } from '../color';
import Head from '../components/Head'
import { useTranslation } from 'react-i18next';
import { useIsFocused } from "@react-navigation/native";
import { WebView } from 'react-native-webview';

export default function AnnonceDetails({route, navigation}){
const {t} = useTranslation();
 const isFocused = useIsFocused();
const link = route.params?.link;
console.log('link link link link', link)
useEffect(() => {
	console.log('_____________________________________________________________________')
}, [isFocused])

	return(
		<View style={{ flex: 1}}>
      		<Head screen={t('common.app.details')} n={navigation} second/>
			<WebView source={{ uri: link }} />
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('8%'),
    flex: 1
  }
})
