import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets";
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text,Button, Input } from 'react-native-elements';
import { themes } from '../color';
import AppIntroSlider from '@lomelidev/react-native-walkthrough';


export default function Recovery({navigation}) {
    const [password, setPassword] = useState("");
    const [pinSecure, setPinSecure] = useState(false);

    const slides = [
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <StatusBar backgroundColor="#019CD9" />
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image source={logo} style={styles.img}/>
                    <Text h4 >Récupération</Text>
                    {/* <Text style={{...themes.secondary, ...styles.subtitle}}>Paroise de soboum II</Text> */}
				</View>
                <View style={styles.form}>
                    <View style={styles.input}>
                        <Input
                            placeholder="Quel est votre Code Fidèle ?"
                            label="Code Fidèle:" 
                            labelStyle={styles.thelabel}
                            leftIcon={
                            <Ionicons 
                                name={"apps"} 
                                size={18}   
                            />
                            }
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Suivant"
                            onPress={()=>navigation.navigate('Drawer')}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>,
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <StatusBar backgroundColor="#019CD9" />
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image source={logo} style={styles.img}/>
                    <Text h4 >Récupération</Text>
                    {/* <Text style={{...themes.secondary, ...styles.subtitle}}>Paroise de soboum II</Text> */}
                </View>
                <View style={styles.form}>
                    <View style={styles.input}>
                        <Input
                            placeholder="Votre Numéro de Téléphone"
                            label="Numéro:" 
                            labelStyle={styles.thelabel}
                            leftIcon={
                            <Ionicons 
                                name={"call"} 
                                size={18}   
                            />
                            }
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Suivant"
                            onPress={()=>navigation.navigate('Drawer')}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>,
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <StatusBar backgroundColor="#019CD9" />
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image source={logo} style={styles.img}/>
                    <Text h4 >Récupération</Text>
                    {/* <Text style={{...themes.secondary, ...styles.subtitle}}>Paroise de soboum II</Text> */}
                </View>
                    <View style={styles.form}>
                    <View style={styles.input}>
                        <Input
                            placeholder="Entrez le code evoyé"
                            label="Code SMS" 
                            labelStyle={styles.thelabel}
                            leftIcon={
                            <Ionicons 
                                name={"chatbox"} 
                                size={18}   
                            />
                            }
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Suivant"
                            onPress={()=>navigation.navigate('Drawer')}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>,
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <StatusBar backgroundColor="#019CD9" />
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={logo} style={styles.img}/>
                <Text h4 >Récupération</Text>
                {/* <Text style={{...themes.secondary, ...styles.subtitle}}>Paroise de soboum II</Text> */}
            </View>
                <View style={styles.form}>
                <View style={styles.input}>
                    <Input
                        placeholder="Entrez le mot de passe"
                        label="Mot de passe"
                        labelStyle={themes.primary}
                        leftIcon={
                            <Ionicons 
                                name={"lock-closed"} 
                                size={24}   
                            />
                        }
                        value={password}
                        onChangeText={value => setPassword(value)}
                        rightIcon={
                            <TouchableOpacity
                                style={{padding: 4}}
                                onPress={()=>setPinSecure(!pinSecure)}
                            >
                                <Ionicons 
                                    name={pinSecure ? "eye": "eye-off"} 
                                    size={24}   
                                />
                            </TouchableOpacity>
                        }
                        secureTextEntry={!pinSecure}
                    />

                    <Input
                        placeholder="Confirmez le mot de passe"
                        label="Confirmation"
                        labelStyle={themes.primary}
                        leftIcon={
                            <Ionicons 
                                name={"lock-closed"} 
                                size={24}   
                            />
                        }
                        value={password}
                        onChangeText={value => setPassword(value)}
                        rightIcon={
                            <TouchableOpacity
                                style={{padding: 4}}
                                onPress={()=>setPinSecure(!pinSecure)}
                            >
                                <Ionicons 
                                    name={pinSecure ? "eye": "eye-off"} 
                                    size={24}   
                                />
                            </TouchableOpacity>
                        }
                        secureTextEntry={!pinSecure}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Valider"
                        onPress={()=>navigation.navigate('Drawer')}
                    />
                </View>
            </View>
        </View>
    </ScrollView>
    ];

    const state = {
		showRealApp: false
	  }
	  const _renderItem = ({ item }) => {
		return (
		  item
		);
	  }
	  const _onDone = () => {
		// User finished the introduction. Show real app through
		// navigation or simply by controlling state
		//this.setState({ showRealApp: true });
		state = {
			showRealApp: true
		  }
	  }
	  if (state.showRealApp) {
		return (<App />);
	  } else {
		return (<AppIntroSlider renderItem={_renderItem} slides={slides} onDone={_onDone}/>);
      }
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: wp('8%'),
      flex: 1
    },
    header: {
        fontSize: 30
    },
    form: { marginTop: hp('2%') },
	input: {
		marginLeft: -10, 
		marginTop: hp('3%')
    },
    logo: {
		justifyContent: 'center',
	  alignItems: 'center',
    },
    img: { 
		width: wp("23%"), 
		height: hp("11%")
	},
	thelabel: { 
		fontSize: 15,
		color: "#0866C6" 
	},
  });