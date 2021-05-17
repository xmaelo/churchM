import React, {useState, useEffect} from 'react';
import { View, ScrollView, useWindowDimensions, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button } from 'react-native-elements';
import { themes, color } from '../color';

export default function Preparation(props){
	return(
		<View>
			<View>
	  			<View style={styles.container_card_main}>
		        	<View style={styles.container_all_dec}>
		        		<Text style={styles.h1}>PREPARATION DU 13/05/2021</Text>
		        		<Text>Liste des contributions</Text>

		        		<View style={{...styles.end2, marginTop: hp('2%')}} >
		        			<Button
							  icon={
							    <Ionicons
							      name="cash-outline"
							      size={22}
							      color={color.primary}
							    />
							  }
							  iconRight= {true}
							  containerStyle={{width: wp('30%')}}
							  type="outline"
							  title={"Mobile  "}
							/>

							<Button
							  icon={
							    <Ionicons
							      name="cash-outline"
							      size={22}
							      color={color.primary}
							    />
							  }
							  iconRight= {true}
							  containerStyle={{width: wp("45%"), marginLeft: wp('3%')}}
							  type="outline"
							  title={"Carte / Paypal  "}
							/>
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
  	//alignItems: 'center',
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

    elevation: 13,
  },
  container_all_dec: {
    // alignItems: 'left',
    marginLeft: hp('3%'),
    paddingTop: hp('2%')
  },
  h1: {fontSize: 18, fontWeight: 'bold', color: color.textSeconday}
})