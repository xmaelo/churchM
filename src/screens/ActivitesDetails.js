import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Text, Input, Button } from 'react-native-elements';
import { themes, color } from '../color';
import Head from '../components/Head'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';

export default function ActivitesDetails({route}){

    const data = route.params.param;

	return(
		<ScrollView>
			<View>
				<View>
                    <Image source={data.avatar_url} style={styles.img}/>
                    <View style={styles.content}>
                        <Text>Debut:</Text>
                        <Text>{data.debut}</Text>
                    </View>
                    <View style={styles.content}>
                        <Text>Fin:</Text>
                        <Text>{data.fin}</Text>
                    </View>
                    <Text style={{textAlign: 'center', marginTop: hp("3px"),}}>{data.description}</Text>
                </View>
			</View>
		</ScrollView>
	)  
} 
 
const styles = StyleSheet.create({
	container: {
	  paddingHorizontal: wp('8%'),
	  flex: 1
    },
    content: {
        marginLeft: hp("4px"),
        marginTop: hp("2px"),
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between'
    },
	h1: {fontSize: 18, fontWeight: 'bold', color: color.textSeconday},
	img: {
		width: wp("80%"), 
		height: hp("40%"),
        borderRadius: wp('3px'),
        marginTop: hp("2px"),
        marginLeft: "auto",
        marginRight: "auto",
	},
  })

