import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button } from 'react-native-elements';
import { themes } from '../color';
import Head from '../components/Head'

export default function DetailLecture({route}){
    const data = route.params.param;
	return(
		<ScrollView style={{ flex: 1}}>
			<View>
				{/* <Head screen={data.title} n={navigation}/> */}
                {
                    data.passages.map(el => 
                        <View style={styles.texte}>
                            <Text style={styles.passage}>{el.passage}</Text>
                            <Text style={styles.contenu}>{el.contenu}</Text>
                        </View>
                    )
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
  texte: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      marginBottom: 20
  },
  passage: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 7
  },
  contenu: {
    fontStyle: 'italic',
    paddingLeft: 15,
    paddingRight: 15,
  }
})

