import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity,BackHandler } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button } from 'react-native-elements';
import { themes } from '../color';
import DatePicker from 'react-native-date-picker';
import { CheckBox } from 'react-native-elements'
import AppIntroSlider from '@lomelidev/react-native-walkthrough';
//import Walkthrough from '@lomelidev/react-native-walkthrough';

export default function RegisterScreen({navigation}){
	const [pinSecure, setPinSecure] = useState(false);
	const [date, setDate] = useState(new Date());
	const [selectedZone, setSelectedZone] = useState();
	const checked = false;
	const slides = [
		<ScrollView contentContainerStyle={{flexGrow:1}}>
			<StatusBar backgroundColor="#019CD9" />
			<View style={styles.container}>
				<View style={styles.top}>
					<View style={styles.logo}>
						<Image source={logo} style={styles.img}/>
						<Text h4 >Créer un Compte</Text>
						{/* <Text style={{...themes.secondary, ...styles.subtitle}}>Paroise de soboum II</Text> */}
					</View>
					<View style={styles.form}>
						<View style={styles.input}>
							<Input
	                           placeholder="Votre nom"
	                           label="Nom(s) de Famille" 
	                           labelStyle={styles.thelabel}
	                           leftIcon={
	                            <Ionicons 
	                                name={"person"} 
	                                size={18}   
	                            />
	                           }
	                        //    onChangeText={value => defineUsername(value)}
	                        />

							<Input
	                           placeholder="Prénom(s)"
	                           label="Prénom(s)" 
	                           labelStyle={styles.thelabel}
	                           leftIcon={
	                            <Ionicons 
	                                name={"person"} 
	                                size={18}   
	                            />
	                           }
	                        //    onChangeText={value => defineUsername(value)}
	                        />
							<Input
	                           placeholder="Date de naissance"
	                           label="Date de naissance" 
	                           labelStyle={styles.thelabel}
	                           leftIcon={
	                            <Ionicons 
	                                name={"calendar"} 
	                                size={18}   
	                            />
	                           }
	                        //    onChangeText={value => defineUsername(value)}
	                        />

							<Input
	                           placeholder="Lieu"
	                           label="Lieu de Naissance" 
	                           labelStyle={styles.thelabel}
	                           leftIcon={
	                            <Ionicons 
	                                name={"person"} 
	                                size={18}   
	                            />
	                           }
	                        //    onChangeText={value => defineUsername(value)}
	                        />

							<Input
	                           placeholder="Email"
	                           label="Votre adresse email" 
	                           labelStyle={styles.thelabel}
	                           leftIcon={
	                            <Ionicons 
	                                name={"mail"} 
	                                size={18}   
	                            />
	                           }
	                        //    onChangeText={value => defineUsername(value)}
	                        />

							<Input
	                           placeholder="Numéro 1"
	                           label="Votre numéro de Téléphone" 
	                           labelStyle={styles.thelabel}
	                           leftIcon={
	                            <Ionicons 
	                                name={"call"} 
	                                size={18}   
	                            />
	                           }
	                        //    onChangeText={value => defineUsername(value)}
	                        />

							<Input
	                           placeholder="Numéro 2"
	                           label="Autre numéro de Téléphone" 
	                           labelStyle={styles.thelabel}
	                           leftIcon={
	                            <Ionicons 
	                                name={"call"} 
	                                size={18}   
	                            />
	                           }
	                        //    onChangeText={value => defineUsername(value)}
	                        />

							<Input
	                           placeholder="Date d'Adhésion"
	                           label="Date d'Adhésion" 
	                           labelStyle={styles.thelabel}
	                           leftIcon={
	                            <Ionicons 
	                                name={"calendar"} 
	                                size={18}   
	                            />
	                           }
	                        //    onChangeText={value => defineUsername(value)}
	                        />
							<Text style={styles.label}>
	                    			Votre genre
	                    	</Text>
							<CheckBox
							title='Masculin'
							checked={checked}
							/>
							<CheckBox
							title='Féminin'
							checked={checked}
							/>
						<Text style={styles.label}>
	                    			Zone d'habitation
	                    	</Text>
						<Picker
						selectedValue={selectedZone}
						onValueChange={(itemValue, itemIndex) =>
							setSelectedZone(itemValue)
						}>
						<Picker.Item label="Mendong" value="Mendong" />
						<Picker.Item label="Accacia" value="Accacia" />
						<Picker.Item label="Jouvence" value="Jouvence" />
						<Picker.Item label="Tam-Tam" value="Tam-Tam" />
						</Picker>
						</View>
	                       <View style={styles.button}>
	                     	<Button
							  title="Suivant"
							  onPress={()=>navigation.navigate('Drawer')}
							/>
	                    </View>
	                    <View style={styles.end}>
	                    	<TouchableOpacity>
	                    		<Text style={themes.secondary}>
	                    			Avez-vous déjà un compte?
	                    		</Text>
	                    	</TouchableOpacity>
	                    	<TouchableOpacity
	                    		onPress={()=>navigation.navigate('Login')}
	                    	>
	                    		<Text style={themes.primary}>Connexion</Text>
	                    	</TouchableOpacity>
	                    </View>
					</View>
				</View>
			</View>
		</ScrollView>,
	<ScrollView contentContainerStyle={{flexGrow:1}}>
	<StatusBar backgroundColor="#019CD9" />
	<View style={styles.container}>
		<View style={styles.top}>
			<View style={styles.logo}>
				<Image source={logo} style={styles.img}/>
				<Text h4 >État Civil</Text>
				{/* <Text style={{...themes.secondary, ...styles.subtitle}}>Paroise de soboum II</Text> */}
			</View>
			<View style={styles.form}>
				<View style={styles.input}>
					<Input
					   placeholder="Père"
					   label="Nom(s) du Père" 
					   labelStyle={styles.thelabel}
					   leftIcon={
						<Ionicons 
							name={"man"} 
							size={18}   
						/>
					   }
					//    onChangeText={value => defineUsername(value)}
					/>

					<Input
					   placeholder="Mère"
					   label="Nom(s) de la Mère" 
					   labelStyle={styles.thelabel}
					   leftIcon={
						<Ionicons 
							name={"woman"} 
							size={18}   
						/>
					   }
					//    onChangeText={value => defineUsername(value)}
					/>

					<Text style={styles.label}>
								Situation Matrimoniale
					</Text>
					<Picker
					selectedValue={selectedZone}
					onValueChange={(itemValue, itemIndex) =>
						setSelectedZone(itemValue)
					}>
					<Picker.Item label="Célibataire" value="celibataire" />
					<Picker.Item label="Marié(e)" value="marie" />
					<Picker.Item label="Fiancé(e)" value="fiance" />
					<Picker.Item label="Divorcé(e)" value="divorce" />
					</Picker>

					<Text style={styles.label}>
								Region d'Origine
					</Text>
					<Picker
					selectedValue={selectedZone}
					onValueChange={(itemValue, itemIndex) =>
						setSelectedZone(itemValue)
					}>
					<Picker.Item label="Nord" value="Nord" />
					<Picker.Item label="Centre" value="Centre" />
					<Picker.Item label="Sud" value="Sud" />
					<Picker.Item label="Ouest" value="Ouest" />
					</Picker>

					<Text style={styles.label}>
								Département d'origine
					</Text>
					<Picker
					selectedValue={selectedZone}
					onValueChange={(itemValue, itemIndex) =>
						setSelectedZone(itemValue)
					}>
					<Picker.Item label="Menoua" value="Menoua" />
					<Picker.Item label="Mbam et Kim" value="Mbam et Kim" />
					<Picker.Item label="Sanaga" value="Sanaga" />
					<Picker.Item label="Ndé" value="Ndé" />
					</Picker>

					<Text style={styles.label}>
								Arrondissement d'origine
					</Text>
					<Picker
					selectedValue={selectedZone}
					onValueChange={(itemValue, itemIndex) =>
						setSelectedZone(itemValue)
					}>
					<Picker.Item label="Bangangté" value="Bangangté" />
					<Picker.Item label="Tonga" value="Tonga" />
					<Picker.Item label="Dschang" value="Dschang" />
					<Picker.Item label="Faro" value="Faro" />
					</Picker>

					<Input
					   placeholder="Ville"
					   label="Ville de Résidence" 
					   labelStyle={styles.thelabel}
					   leftIcon={
						<Ionicons 
							name={"location"} 
							size={18}   
						/>
					   }
					//    onChangeText={value => defineUsername(value)}
					/>

					<Input
					   placeholder="Combien d'enfants avez vous?"
					   label="Nombre d'enfants" 
					   labelStyle={styles.thelabel}
					   leftIcon={
						<Ionicons 
							name={"people"} 
							size={18}   
						/>
					   }
					//    onChangeText={value => defineUsername(value)}
					/>

				   </View>
				   <View style={styles.button}>
					 <Button
					  title="Suivant"
					  onPress={()=>navigation.navigate('Drawer')}
					/>
				</View>
				<View style={styles.end}>
				</View>
			</View>
		</View>
	</View>
</ScrollView>,
	// {
	//   key: 'somethun1',
	//   title: 'Rocket guy',
	//   text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
	//   image: logo,
	//   backgroundColor: '#22bcb5',
	// }
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
	// return(
	// 	<ScrollView contentContainerStyle={{flexGrow:1}}>
	// 		<StatusBar backgroundColor="#019CD9" />
	// 		<View style={styles.container}>
	// 			<View style={styles.top}>
	// 				<View style={styles.logo}>
	// 					<Image source={logo} style={styles.img}/>
	// 					<Text h4 >Créer un Compte</Text>
	// 					{/* <Text style={{...themes.secondary, ...styles.subtitle}}>Paroise de soboum II</Text> */}
	// 				</View>
	// 				<View style={styles.form}>
	// 					<View style={styles.input}>
	// 						<Input
	//                            placeholder="Votre nom"
	//                            label="Nom(s) de Famille" 
	//                            labelStyle={styles.thelabel}
	//                            leftIcon={
	//                             <Ionicons 
	//                                 name={"person"} 
	//                                 size={18}   
	//                             />
	//                            }
	//                         //    onChangeText={value => defineUsername(value)}
	//                         />

	// 						<Input
	//                            placeholder="Prénom(s)"
	//                            label="Prénom(s)" 
	//                            labelStyle={styles.thelabel}
	//                            leftIcon={
	//                             <Ionicons 
	//                                 name={"person"} 
	//                                 size={18}   
	//                             />
	//                            }
	//                         //    onChangeText={value => defineUsername(value)}
	//                         />

	// 						<DatePicker
	// 							style={styles.datePickerStyle}
	// 							date={date} // Initial date from state
	// 							mode="date" // The enum of date, datetime and time
	// 							placeholder="select date"
	// 							format="DD-MM-YYYY"
	// 							maxDate={date}
	// 							confirmBtnText="Confirm"
	// 							cancelBtnText="Cancel"
	// 							customStyles={{
	// 								dateIcon: {
	// 								//display: 'none',
	// 								position: 'absolute',
	// 								left: 0,
	// 								top: 4,
	// 								marginLeft: 0,
	// 								},
	// 								dateInput: {
	// 								marginLeft: 36,
	// 								},
	// 							}}
	// 							onDateChange={(date) => {
	// 								setDate(date);
	// 							}}
	// 						/>

	// 						<Input
	//                            placeholder="Date de naissance"
	//                            label="Date de naissance" 
	//                            labelStyle={styles.thelabel}
	//                            leftIcon={
	//                             <Ionicons 
	//                                 name={"calendar"} 
	//                                 size={18}   
	//                             />
	//                            }
	//                         //    onChangeText={value => defineUsername(value)}
	//                         />

	// 						<Input
	//                            placeholder="Email"
	//                            label="Votre adresse email" 
	//                            labelStyle={styles.thelabel}
	//                            leftIcon={
	//                             <Ionicons 
	//                                 name={"mail"} 
	//                                 size={18}   
	//                             />
	//                            }
	//                         //    onChangeText={value => defineUsername(value)}
	//                         />

	// 						<Input
	//                            placeholder="Numéro"
	//                            label="Votre numéro de Téléphone" 
	//                            labelStyle={styles.thelabel}
	//                            leftIcon={
	//                             <Ionicons 
	//                                 name={"call"} 
	//                                 size={18}   
	//                             />
	//                            }
	//                         //    onChangeText={value => defineUsername(value)}
	//                         />

	                        {/* <Input
	                           placeholder="Mot de passe"
	                           label="Mot de passe"
	                           labelStyle={themes.primary}
	                           leftIcon={
	                                <Ionicons 
	                                    name={"lock-closed"} 
	                                    size={24}   
	                                />
	                            }
	                            // value={password}
	                            // onChangeText={value => setPassword(value)}
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
	                        /> */}
	//                       </View>
	//                       <View style={styles.button}>
	//                      	<Button
	// 						  title="Soumettre"
	// 						  onPress={()=>navigation.navigate('Drawer')}
	// 						/>
	//                     </View>
	//                     <View style={styles.end}>
	//                     	<TouchableOpacity>
	//                     		<Text style={themes.secondary}>
	//                     			Avez-vous déjà un compte?
	//                     		</Text>
	//                     	</TouchableOpacity>
	//                     	<TouchableOpacity
	//                     		onPress={()=>navigation.navigate('Login')}
	//                     	>
	//                     		<Text style={themes.primary}>Connexion</Text>
	//                     	</TouchableOpacity>
	//                     </View>
	// 				</View>
	// 			</View>
	// 		</View>
	// 	</ScrollView>
	// )
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
	},
	thelabel: { 
		fontSize: 15,
		color: "#0866C6" 
	},
	label: {
		fontSize: 15,
		color: "#0866C6",
		marginLeft: 8,
		fontWeight: 'bold'
	}
  });

