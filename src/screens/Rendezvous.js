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
import { rendezvous } from '../statefull/rendezvous';

export default function Rendezvous({navigation}){
	const [rdzvous, setRdzvous] = useState([]);

    useEffect(() => {
		(async () => {
			var rdzv = await rendezvous.getAll();
			setRdzvous(rdzv);
			console.log('Rendez-Vous: ',rdzv);
		})();
        return;
      }, [])
	
	return(
		<View style={{ flex: 1}}>
			<Head screen={"Rendez-Vous"} n={navigation}/>
				<ScrollView style={{ flex: 1}}>
				{   (!rdzvous)? <View><Text style={{fontSize: 20}}> Aucun Rendez-Vous demandé</Text></View>:
					rdzvous.map((l, i) => (
					<ListItem key={i} bottomDivider onPress={()=>navigation.navigate('DetailRdv', {param: l})}>
						<ListItem.Content>
						<View style={styles.textStyle}>
							<View>
                  {(l.etat == "EN ATTENTE")? <Text style={{fontWeight: 'bold', color: 'blue'}}>{l.etat}</Text>:(l.etat == "ACCEPTER")?<Text style={{fontWeight: 'bold', color: 'green'}}>{l.etat}</Text>: 
				  (l.etat == "REPORTER")?<Text style={{fontWeight: 'bold', color: 'rgb(255, 94, 0)'}}>{l.etat}</Text>: <Text style={{fontWeight: 'bold', color: 'red'}}>{l.etat}</Text>}
                  <Text>{l.raison}</Text>
							</View>
							<View style={{marginLeft: 300, position: 'absolute'}}>
                                {
                                    (l.etat == "EN ATTENTE")?<Ionicons
									name={"time-outline"}
                                    size={30}
                                    color={color.primary}
								/> : (l.etat == "ACCEPTER")? <Ionicons
                                name={"checkmark-done-sharp"}
                                size={30}
                                color={color.green}
                            />: (l.etat == "REPORTER")? <Ionicons
								name={"calendar-outline"}
								size={30}
								color={color.green}
							/>: <Ionicons
								name={"close-circle-outline"}
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
