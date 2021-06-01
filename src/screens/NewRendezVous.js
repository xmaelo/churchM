import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo, bible} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button, ListItem } from 'react-native-elements';
import { themes, color } from '../color';
import Head from '../components/Head';
import { Picker } from '@react-native-picker/picker';


export default function NewRendezVous({navigation}) {
	const [selectedZone, setSelectedZone] = useState();
    
    return (
        <View style={{ flex: 1}}>
			<Head screen={"Nouveau Rendez-Vous"} n={navigation} second/>
            <View>
                <Text style={{textAlign: 'center', fontSize: 23, marginBottom: wp("5%")}}>Prendre un Rendez-Vous</Text>
                <View>
                    <View style={styles.horizontal}>
                        <Text style={styles.label}>
                                    Pasteur:
                        </Text>
                        <Picker style={{width: wp("65%")}}
                            selectedValue={selectedZone}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedZone(itemValue)
                            }>
                            <Picker.Item label="Jean Bolveng" value="Jean Bolveng" />
                            <Picker.Item label="Tonga Georges" value="Tonga Georges" />
                            <Picker.Item label="Bikat Stephane" value="Bikat Stephane" />
                            <Picker.Item label="Faro Faro" value="Faro Faro" />
                        </Picker>
                    </View>
                    <Input
                        placeholder="Choisissez une date"
                        label="Date:"
                        labelStyle={styles.thelabel}
                        leftIcon={
                        <Ionicons
                            name={"calendar"}
                            size={18}
                        />
                        }
                    />
                    <Input
                        placeholder="Quel problème avez-vous?"
                        label="Raison:"
                        labelStyle={styles.thelabel}
                        leftIcon={
                        <Ionicons
                            name={"document-text"}
                            size={18}
                        />
                        }
                        multiline={true}
                        numberOfLines={3}
                    />

                    <View>
						<Button
						title="Demander"
						onPress={()=> console.log('Rendez-Vous Demandé')}
						/>
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
    label: {
		fontSize: 15,
		color: "#0866C6",
		marginLeft: 8,
        fontWeight: 'bold',
        marginTop: 'auto', 
        marginBottom: 'auto'
    },
    horizontal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    thelabel: {
		fontSize: 15,
		color: "#0866C6"
	},
})