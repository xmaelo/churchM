import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo, bible} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button, ListItem } from 'react-native-elements';
import { themes, color } from '../color';
import Head from '../components/Head';
import FAB from 'react-native-fab'

export default function Rendezvous({navigation}){

	const rdv = [
		{
			id: 1,
			etat: "EN ATTENTE",
			raison: "jzzl dzfejndj kelnd",
            date: "20/05/2021",
            heure: "12:00"
		},
		{
			id: 2,
			etat: "EN ATTENTE",
			raison: "jzzl dzfejndj kelnd",
            date: "20/06/2021",
            heure: "10:00"
		},
		{
			id: 3,
			etat: "ACCEPTER",
			raison: "jzzl dzfejndj kelnd",
            date: "20/05/2021",
            heure: "14:30"
		},
    ];

	return(
		<View style={{ flex: 1}}>
			<Head screen={"Rendez-Vous"} n={navigation}/>
				<ScrollView style={{ flex: 1}}>
				{
					rdv.map((l, i) => (
					<ListItem key={i} bottomDivider onPress={()=>navigation.navigate('DetailRdv', {param: l})}>
						<ListItem.Content>
						<View style={styles.textStyle}>
							<View>
                  {(l.etat == "EN ATTENTE")? <Text style={{fontWeight: 'bold', color: 'blue'}}>{l.etat}</Text>:<Text style={{fontWeight: 'bold', color: 'green'}}>{l.etat}</Text>}
                  <Text>{l.raison}</Text>
							</View>
							<View style={{marginLeft: 200}}>
                                {
                                    (l.etat == "EN ATTENTE")?<Ionicons
									name={"time-outline"}
                                    size={30}
                                    color={color.primary}
								/> : <Ionicons
                                name={"checkmark-done-sharp"}
                                size={30}
                                color={color.green}
                            />
                                }

							</View>
						</View>
						</ListItem.Content>
					</ListItem>
					))
				}
				</ScrollView>

                <FAB buttonColor={color.primary}
		  		iconTextColor="#FFFFFF"
		  		onClickAction={() => navigation.navigate('NewRendezVous')}
		  		visible={true}
		  		iconTextComponent={<Ionicons name="add"/>}/>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('8%'),
    flex: 1
  },
  textStyle: {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center'
    },
  thecolor: {color: 'green'}
})
