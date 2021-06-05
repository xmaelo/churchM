import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input } from 'react-native-elements';
import { Button, Snackbar  } from 'react-native-paper';
import { themes, color } from '../color';
import {login} from '../statefull/login'

export default function LoginScreen({navigation}){

	const [password, setPassword] = useState("password");
		const [username, defineUsername] = useState("admin");
		const [disabled, setDisabled] = useState(false);
		const [pinSecure, setPinSecure] = useState(false);
		const [loading, setLoan] = useState(false);
		const [visible, setVisible] = useState(false);

		const onToggleSnackBar = () => setVisible(!visible);
  	const onDismissSnackBar = () => setVisible(false);

		useEffect(() => {
			BackHandler.addEventListener('hardwareBackPress', () => true)
			return () => BackHandler.removeEventListener('hardwareBackPress', () => true)
		}, [])

		const get_token =  async() => {
			 try {
				 if(!loading){
					 setLoan(true)
				 	 const personne = await login.auth(username, password);
					 setLoan(false)
					 if (personne) {
 						 navigation.navigate('Accueil', {personne: personne});
					 }else{
						 setVisible(true)
						 setLoan(false)
					 }
				 }
			 } catch (e) {
				 console.log('error==>>',e)
				 setVisible(true)
				 setLoan(false)
			 }
		}
	return(
		<View style={{flex: 1}}>
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.top}>
						<View style={styles.logo}>
							<Image source={logo} style={styles.img}/>
							<Text h4 style={themes.primary}>EEC</Text>
							<Text style={{...themes.secondary, ...styles.subtitle}}>Paroise de soboum II</Text>
						</View>
						<View style={styles.form}>
							<Text h4>Connexion</Text>
							<Text style={{...themes.secondary, ...styles.mt}}>
								Bonjour ! Heureux de vous revoir.
							</Text>
							<View style={styles.input}>
								<Input
															 placeholder="Votre Identifiant"
															 label="FIDELE ID / Nr. Tel"
															 labelStyle={themes.primary}
															 leftIcon={
																<Ionicons
																		name={"person"}
																		size={24}
																/>
															 }
															 value={username}
															 onChangeText={value => defineUsername(value)}
														/>

														<Input
															 placeholder="Mot de passe"
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
												</View>
												<View style={styles.button}>
													<Button
														//title="Connexion"
														icon={()=><Ionicons name="log-in-outline" size={30} color={'white'}/> }
														mode="contained"
														color={color.primary}
														loading={loading}
														onPress={()=>get_token()}
													>
														Connexion
	 												</Button>
												</View>
												<View style={{...styles.logo, ...styles.bottom}}>
													<Text style={themes.secondary}>Votre paroise, votre maison</Text>
													<Text style={{...themes.secondary, ...styles.penser}}>
														Confiez-vous en l'Eternel, votre Dieu, et vous serez affermis (...)
														2 Chroniques 20.20
													</Text>
												</View>
												<View style={styles.end}>
													<TouchableOpacity>
														<Text style={themes.secondary}>
															Mot de passe oublié
														</Text>
													</TouchableOpacity>
													<TouchableOpacity
														onPress={()=>navigation.navigate('Register')}
													>
														<Text style={themes.primary}>S'incrire</Text>
													</TouchableOpacity>
												</View>
						</View>
					</View>
				</View>
			</ScrollView>
			<Snackbar
				visible={visible}
				onDismiss={onDismissSnackBar}
				action={{
					label: 'Fermer',
					onPress: () => {
						// Do something
					},
				}}>
				Problème de connexion ou identifiant incorrect !
			</Snackbar>
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
		justifyContent: 'space-between',
		marginTop: hp('4%')
	},
	penser: {
		fontStyle: 'italic',
		marginTop: hp('2%'),
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
	},
	mt: {
		marginTop: hp('1%')
	},
	bottom: { marginTop: hp('2%')},
	logo: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	img: {
		width: wp("23%"),
		height: hp("11%")
	},
	top: { marginTop: hp('3%') },
	subtitle: { fontSize: 17 },
	form: { marginTop: hp('2%') },
	input: {
		marginLeft: -10,
		marginTop: hp('3%')
	}
});
