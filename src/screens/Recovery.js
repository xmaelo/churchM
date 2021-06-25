import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets";
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text,Button, Input } from 'react-native-elements';
import { themes } from '../color';
import AppIntroSlider from '@lomelidev/react-native-walkthrough';
import Head from '../components/Head';
import { params } from '../statefull/params';
import { profil } from '../statefull/profil';
import { useTranslation } from 'react-i18next';

export default function Recovery({navigation}) {
		const {t} = useTranslation()
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [pinSecure, setPinSecure] = useState(false);
    const [code, setCode] = useState("");
    const [numeroConfirm, setNumeroConfirm] = useState("");
    const [numero, setNumero] = useState("");
    const [cryptNum, setCryptNum] = useState("");
    const [userId, setUserId] = useState();
    const [codeSms, setCodeSms] = useState("");
    var [changeView1, setChangeView1] = useState(1);
	const [loading, setLoan] = useState(false);
    

    const codeVerification = async () => {
        console.log(code);
        if (!loading) {
            setLoan(true);
            profil.passChange({code: code, confirm: null, iduser: null}).then(async res => {
                let datas =  res;
                console.log("Données reçues:",datas);
                console.log(datas[0]);
                // datas['hydra:member'][0] = true;
                if (datas[0] == true && datas[1] == 'un compte est deja associer a ce code') {
                    setLoan(false);
                  // date  = '1985-05-20';
                  // numero = '+237*******6';
                  setNumero(datas[2]);
                  setUserId(datas[3]);
                  console.log("numero: ", numero);
                  setCryptNum(numero[0]+numero[1]+numero[2]+numero[3]+numero[4]+numero[5]+"******"+numero[numero.length -1]);
                  setChangeView1(2);
                } else {
                  // if (datas[1] == 'un compte est deja associer a ce code') {
                    showToast(t('common.toast.code_associate'));
                    setLoan(false)
                  // } else {
                  //   showToast("Votre code Fidèle n'est pas correct", 'top');
                  //   await loader.stop();
                  // }
                }
              }).catch(async err => {
                console.log(err);
                showToast(t('common.toast.server_error'));
                setLoan(false)
              });
        }
      }

    const numberVerification = async() => {
        if(numero == numeroConfirm) {
          var plusCode = "+237";
          var moinsCode = "237";
          var theNumber = numeroConfirm[0]+numeroConfirm[1]+numeroConfirm[2]+numeroConfirm[3];
          var theNumber2 = numeroConfirm[0]+numeroConfirm[1]+numeroConfirm[2];
          if (theNumber == plusCode) {
            if(!loading) {
                profil.smsConfirm({numero: numeroConfirm, id: userId, password: ""}).then(async res => {
                    console.log(res);
                    if(res['hydra:member']){
                      setLoan(false);
                      changeView1(3);
                    } else {
                      setLoan(false);
                      showToast('Erreur');
                    }
                  }).catch(async error => {
                    console.warn(error);
                    showToast(t('common.toast.sms_error'));
                    setLoan(false);
                  });
            }
          } else if(theNumber2 == moinsCode){
            var theLast = "+"+numeroConfirm;
            console.log(theLast);
            if(!loading) {
                profil.smsConfirm({numero: theLast, id: userId, password: ""}).then(async res => {
                    if(res['hydra:member']){
                      setLoan(false);
                      changeView1(3)
                    } else {
                      setLoan(false)
                      showToast('Erreur');
                    }
                  }).catch(async error => {
                    console.warn(error);
                    showToast(t('common.toast.sms_error'));
                    setLoan(false);
                });
            }
          } else {
            var theLast2 = "+237"+numeroConfirm;
            console.log(theLast2);
            if(!loading) {
                profil.smsConfirm({numero: theLast2, id: userId, password: ""}).then(async res => {
                    if(res['hydra:member']){
                      setLoan(false)
                      changeView1(3);
                    } else {
                      setLoan(false);
                      showToast('Erreur');
                    }
                  }).catch(async error => {
                    console.warn(error);
                    showToast(t('common.toast.sms_error'));
                    setLoan(false);
                });
            }
            
          }
        } else {
          showToast(t('common.toast.error_num'));
        }
      }

      const smsVerification = async () => {
        if(!loading) {
            profil.passChange({confirm: codeSms, iduser: this.userId, code: null}).then(async res => {
                if (res[0] == true) {
                  setLoan(false);
                  changeView1(4);
                } else {
                  setLoan(false);
                  showToast(t('common.toast.bad_code'));
                }
              });
        }
      }

      const changePassword = async () => {
        if(!loading) {
            profil.smsConfirm({password: password, id: userId, numero: null}).then(async res =>  {
                console.log(res);
                if(res[0] == true) {
                  showToast(t('common.toast.pass_success'));
                  setLoan(false);
                  navigation.navigate('Login');
                } else {
                  setLoan(false);
                  showToast(t('common.toast.pass_error'));
                }
              }).catch( error => {
                console.log(error);
                setLoan(false);
              });
        }
      }

      const checkPassword = (password) => {
		if (this.password == password) {
			return true;
		} else {
			return false;
		}
    }

      const showToast = (message) => {
		ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.TOP);
	  };


    const slide1 = 
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <StatusBar backgroundColor="#019CD9" />
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image source={logo} style={styles.img}/>
                    {/* <Text h4 >Récupération</Text> */}
                    {/* <Text style={{...themes.secondary, ...styles.subtitle}}>Paroise de soboum II</Text> */}
				</View>
                <View style={styles.form}>
                    <View style={styles.input}>
                        <Input
                            placeholder={t('common.app.which_code')}
                            label={t('common.app.fidele_code')}
                            labelStyle={styles.thelabel}
                            leftIcon={
                            <Ionicons 
                                name={"apps"} 
                                size={18}   
                            />
                            }
                            value={code}
                            onChangeText={value => {setCode(value); console.log('Code Fidèle:',value)}}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title={t('common.app.next')}
						    loading={loading}
                            onPress={()=> codeVerification()}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>;

    const slide2 = 
    <ScrollView contentContainerStyle={{flexGrow:1}}>
            <StatusBar backgroundColor="#019CD9" />
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image source={logo} style={styles.img}/>
                    {/* <Text h4 >Récupération</Text> */}
                    {/* <Text style={{...themes.secondary, ...styles.subtitle}}>Paroise de soboum II</Text> */}
                </View>
                <View style={styles.form}>
                    <View style={styles.input}>
                        <Input
                            placeholder={t('common.app.your number')}
                            label={t('common.app.numero')+':'} 
                            labelStyle={styles.thelabel}
                            leftIcon={
                            <Ionicons 
                                name={"call"} 
                                size={18}   
                            />
                            }
                            value={numeroConfirm}
                            onChangeText={value => setNumeroConfirm(value)}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title= {t('common.app.next')}
                            loading={loading}
                            onPress={()=>numberVerification()}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>;

    const slide3 = 
    <ScrollView contentContainerStyle={{flexGrow:1}}>
            <StatusBar backgroundColor="#019CD9" />
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image source={logo} style={styles.img}/>
                    {/* <Text h4 >Récupération</Text> */}
                    {/* <Text style={{...themes.secondary, ...styles.subtitle}}>Paroise de soboum II</Text> */}
                </View>
                    <View style={styles.form}>
                    <View style={styles.input}>
                        <Input
                            placeholder={t('common.app.send_code')}
                            label={t('common.app.sms_code')} 
                            labelStyle={styles.thelabel}
                            leftIcon={
                            <Ionicons 
                                name={"chatbox"} 
                                size={18}   
                            />
                            }
                            value={codeSms}
                            onChangeText={value => setCodeSms(value)}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title={t('common.app.next')}
                            loading={loading}
                            onPress={()=>smsVerification()}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>;

    const slide4 = 
    <ScrollView contentContainerStyle={{flexGrow:1}}>
        <StatusBar backgroundColor="#019CD9" />
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={logo} style={styles.img}/>
                {/* <Text h4 >Récupération</Text> */}
                {/* <Text style={{...themes.secondary, ...styles.subtitle}}>Paroise de soboum II</Text> */}
            </View>
                <View style={styles.form}>
                <View style={styles.input}>
                    <Input
                        placeholder={t('common.app.password_change')}
                        label={t('common.app.password')}
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
                        placeholder={t('common.app.pass_confirm')}
                        label="Confirmation"
                        labelStyle={themes.primary}
                        leftIcon={
                            <Ionicons 
                                name={"lock-closed"} 
                                size={24}   
                            />
                        }
                        value={passwordConfirm}
                        onChangeText={value => setPasswordConfirm(value)}
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
                    {(!checkPassword)?<Text style={{fontSize: 12, color: 'red', textAlign: Center}}>{t('common.app.diff_pass')}</Text>:<Text></Text>}
                </View>
                <View style={styles.button}>
                    <Button
                        title={t('common.app.validate')}
                        loading={loading}
                        onPress={()=>changePassword()}
                    />
                </View>
            </View>
        </View>
    </ScrollView>;

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
		//setState({ showRealApp: true });
		state = {
			showRealApp: true
		  }
	  }
      
      return (
          <View style={{flex: 1}}>
			<Head screen={t('common.app.recup')} n={navigation} second/>
            {
                (changeView1 == 1)?slide1:(changeView1 == 2)?slide2:(changeView1 == 3)?slide3:slide4
            }
          </View>
      )
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