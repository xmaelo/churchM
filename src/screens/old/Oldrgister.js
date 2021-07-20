import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input } from 'react-native-elements';
import { Button, Snackbar  } from 'react-native-paper';
import { themes, color } from '../../color';
import {confirm} from '../../statefull/confirmation'
import { useTranslation } from 'react-i18next';
import Head from '../../components/Head'
import DatePicker from 'react-native-datepicker'

export default function Oldrgister({navigation}){
	const {t} = useTranslation()

	const [username, defineUsername] = useState("");
	const [disabled, setDisabled] = useState(false);
	const [pinSecure, setPinSecure] = useState(false);
	const [loading, setLoan] = useState(false);
	const [visible, setVisible] = useState(false);

	const [code, setCodeFIlde] = useState("");
	const [numero, setNumero] = useState("");
	const [state, setState] = useState(1);
	const [date, setDate] = useState(new Date());
	const [phone, setPhone] = useState(1);

	const [password, setPassword] = useState("");
	const [passCon, setPassC] = useState(1);

	const toask = (msg) => {
		ToastAndroid.showWithGravityAndOffset(
	      msg,
	      ToastAndroid.LONG,
	      ToastAndroid.BOTTOM,
	      25,
	      50
	    );
	}

	const userCreate = async() => {
		if(password.trim() !== "" && password == passCon){
			setLoan(true)
		    let data = {
		        code: code,
		        datedenaissance: date,
		        password: password,
		        numero: numero
		    };
		    console.log(data);
		    let res = await confirm.createUser(data)
		    console.log('res res', res)
		    setLoan(false)
		    if(res[0] == true) {
		        navigation.navigate('Login');
		    }else{
		    	toask('Une erreur est survenue ! Vérifier bien les informations que vous aviez fourni.')
		    }

		}else{
			setLoan(false)
			toask('Les mot de passe ne correspondent pas !')
		}
  	}


	const codeVerification = async () => {
	    console.log(code);
	    setLoan(true)
	    const res = await confirm.confirmFidele({code: code});
	    console.log('ressss', res)

	    if (res[0] == true) {
		    setNumero(res[2])
		    setState(2)
        }else{
        	toask('Une erreur est survenue !')
        }
        setLoan(false)
	  }

	return(
		<View style={{flex: 1}}>
			<Head screen={t('Verification')} n={navigation} second/>
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.top}>
						<View style={styles.logo}>
							<Text h4 style={themes.primary}>EEC</Text>
						</View>
						{state == 1 &&
							<View style={{alignContent: 'center'}}>
								<View style={styles.form}>
									<View style={styles.input}>
										<Input
											 placeholder="Renseignez votre code fidèl"
											 label="Code fidèl"
											 labelStyle={themes.primary}
											 leftIcon={
												<Ionicons
														name={"lock-closed"}
														size={24}
												/>
											 }
											 value={code}
											 onChangeText={value => setCodeFIlde(value)}
										/>
									</View>
								</View>
							</View>
						}
						{state == 2 &&
							<View style={{alignContent: 'center'}}>
								<View style={styles.form}>
									<View style={styles.input}>
										<DatePicker
									        style={{width: 200}}
									        date={date}
									        mode="date"
									        value={date}
									        placeholder="Date de naissance"
									        format="YYYY-MM-DD"
									        androidMode="spinner"
									        confirmBtnText="Confirm"
									        cancelBtnText="Cancel"
									        customStyles={{
									          dateIcon: {
									            position: 'absolute',
									            left: 0,
									            top: 4,
									            marginLeft: 0
									          },
									          dateInput: {
									            marginLeft: 36
									          }
									          // ... You can check the source to find the other keys.
									        }}
									        onDateChange={(date) => {
									        	setDate(date)
									        	console.log('setDate setDate setDate', date)
									        }}
									      />
									</View>
									<View style={styles.input}>
										<Input
											 placeholder="Numéro de Téléphone"
											 label="Téléphone"
											 labelStyle={themes.primary}
											 leftIcon={
												<Ionicons
														name={"call-outline"}
														size={24}
												/>
											 }
											 value={phone}
											 onChangeText={value => setPhone(value)}
										/>
									</View>
									<View style={styles.input}>
										<Input
											 placeholder="Mot de passe"
											 label="Mot de passse"
											 labelStyle={themes.primary}
											 leftIcon={
												<Ionicons
														name={"lock-closed"}
														size={24}
												/>
											 }
											 secureTextEntry={true}
											 value={password}
											 onChangeText={value => setPassword(value)}
										/>
									</View>
									<View style={styles.input}>
										<Input
											 placeholder="Confirmer"
											 label="Confirmer"
											 labelStyle={themes.primary}
											 leftIcon={
												<Ionicons
														name={"lock-closed"}
														size={24}
												/>
											 }
											 secureTextEntry={true}
											 value={passCon}
											 onChangeText={value => setPassC(value)}
										/>
									</View>
								</View>
							</View>
						}

						<View style={null}>
							<View style={styles.button}>
								{state == 1&&
									<Button
										//title="Connexion"
										icon={()=><Ionicons name="log-in-outline" size={30} color={'white'}/> }
										mode="contained"
										color={color.primary}
										loading={loading}
										onPress={()=>codeVerification()}
									>
										{t('Vérifier')}
									</Button>
								}
								{state == 2&&
									<Button
										//title="Connexion"
										icon={()=><Ionicons name="log-in-outline" size={30} color={'white'}/> }
										mode="contained"
										color={color.primary}
										loading={loading}
										onPress={()=>userCreate()}
									>
										{t('Finaliser')}
									</Button>
								}
							</View>	
						</View>					
					</View>
				</View>
			</ScrollView>
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