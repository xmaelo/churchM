import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button } from 'react-native-elements';
import { themes, color} from '../color';
import Head from '../components/Head'
import Lang from '../components/Lang';
import { useTranslation } from 'react-i18next';

export default function Parametres({navigation}){
const {t} = useTranslation();
return(
		<View>
			<Head screen={t('common.app.settings')} n={navigation}/>
			<View>
	  			<View style={styles.container_card_main}>
		        	<View style={styles.container_all_dec}>
		        		<Text style={styles.h1}>{t('common.app.personnal')}</Text>

		        		<View style={{...styles.end2, marginTop: hp('2%')}} >
		        			<Ionicons name={"person-circle-outline"} size={27} color={color.primary}/>
		        			<TouchableOpacity onPress={()=>navigation.navigate('Profil')}>
		        			  <Text>{" "+t('common.app.my2')+" "+t('common.app.account')}</Text>
		        			</TouchableOpacity>
		        		</View>
		        		<View style={{...styles.end2, marginTop: hp('2%')}} >
		        			<Ionicons name={"log-out-outline"} size={27} color={color.primary}/>
		        			<TouchableOpacity onPress={()=>navigation.navigate('Login')}>
		        			  <Text>{" "+t('common.app.logout')}</Text>
		        			</TouchableOpacity>
		        		</View>
		        	</View>
		        </View>

		        <View style={styles.container_card_main2}>
		        	<View style={styles.container_all_dec}>
		        		<Text style={styles.h1}>{t('common.app.application')}</Text>

		        		<View style={{...styles.end2, marginTop: hp('2%')}} >
		        			<Ionicons name={"send-outline"} size={27} color={color.primary}/>
		        			<TouchableOpacity onPress={()=>navigation.navigate('ContactEglise')}>
		        				<Text>{" "+t('common.app.contact_church')}</Text>
		        			</TouchableOpacity>
		        		</View>
		        		<View style={{...styles.end2, marginTop: hp('2%')}} >
		        			<Ionicons name={"help-circle-outline"} size={27} color={color.primary}/>
		        			<Text>{" "+t('common.app.about_church')}</Text>
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
    height: hp('25%'),
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
  container_card_main2: {
    backgroundColor: 'white',
    marginLeft: hp('2%'),
    marginRight: hp('2%'),
    borderRadius: 10,
    height: hp('35%'),
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
