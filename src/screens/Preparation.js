import React, {useState, useEffect} from 'react';
import { View, ScrollView, useWindowDimensions, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button } from 'react-native-elements';
import { themes, color } from '../color';
import Head from '../components/Head'
import { TextInput, Switch, RadioButton  } from 'react-native-paper';
import {prepas, auth} from '../statefull/preparation'
import {
  ANIMATIONS_SLIDE,
  ANIMATIONS_FADE,
  CustomTabs
} from 'react-native-custom-tabs';
import { useTranslation } from 'react-i18next';

const onChrome = (url) => {
  CustomTabs.openURL(url, {
    toolbarColor: '#607D8B',
    enableUrlBarHiding: true,
    showPageTitle: false,
    enableDefaultShare: false,
    animations: {
      startEnter: 'slide_in_bottom',
      startExit: 'slide_out_bottom',
      endEnter: 'slide_in_bottom',
      endExit: 'slide_out_bottom',
    },
    headers: {
      'my-custom-header': 'PAIEMENT'
    },
    forceCloseOnRedirection: false,
  });
}
export default function Preparation(props){
  const {t} = useTranslation();
	const [preparations, setPrepas] = useState([])
	const [idPrepa, setIdPrepa] = useState(null)
	const [contributions, setC] = useState(null)
	const [finalContributions, setCF] = useState(null)


	const  getContrib = async() => {
    try {
      console.log('>>>> YESYEYEYSYSY ', auth.getUserInfo());

        let datas = await prepas.getActualPrepa()
        console.log(datas);
				let finalContributions = []
        if(datas[0]) {
            setC(datas);
            setIdPrepa(datas[0].idpreparation);

            //for(let contribution of datas) contribution['montant'] = 0;
	          let id, number;
	          datas.forEach(contrib => {
							console.log('_______________', contrib.nom)
	            if (contrib.nom != "Offrandes des Corps d'Elites(Anciens, Diacres, Conseillers)" && contrib.nom != 'Offrandes des Hommes' && contrib.nom != 'Offrandes des Femmes' && contrib.nom != 'Offrandes des Jeunes(Elèves et Etudiants)') {
	              console.log('>>>>> Nouvelles contribution', contrib.nom);
	              finalContributions.push(contrib);
	            }
	            if (contrib.nom == "Offrandes des Corps d'Elites(Anciens, Diacres, Conseillers)" && (auth.getUserInfo().status=='ANCIEN' || auth.getUserInfo().status=='PASTEUR' || auth.getUserInfo().status=='DIACRE' || auth.getUserInfo().status=='CONSEILLER')) {
	              id = contrib.id; number = 1; console.log(contrib);
	            } else if (contrib.nom == 'Offrandes des Hommes' && auth.getUserInfo().status=='FIDELE' && (auth.getUserInfo().sexe=='Masculin' || auth.getUserInfo().sexe=='MASCULIN') && auth.getUserInfo().statusPro != "eleve/etudiant") {
	              id = contrib.id; number = 2; console.log(contrib);
	            } else if (contrib.nom == 'Offrandes des Femmes' && auth.getUserInfo().status=='FIDELE' && (auth.getUserInfo().sexe=='Féminin' || auth.getUserInfo().sexe=='FEMININ') && auth.getUserInfo().statusPro != "eleve/etudiant") {
	              id = contrib.id; number = 3; console.log(contrib);
	            } else if (contrib.nom == 'Offrandes des Jeunes(Elèves et Etudiants)' && auth.getUserInfo().status=='FIDELE' && auth.getUserInfo().statusPro == 'eleve/etudiant') {
	              id = contrib.id; number = 4; console.log(contrib);
	            }
	          });
          finalContributions.push({nom: t('common.app.offering'), montant: 0, id: id, number: number});
          console.log('COntributions:', finalContributions);
					setCF(finalContributions)
        } else {
          //this.prepas = true;
        }
    } catch (error) {
      console.warn(error);
    }
  }

	 	const onPayment = async (devise) => {
    try {
        let allContrib = [];
        let item = [];
        if(contributions[contributions.length-1].number == 1) {
          contributions[contributions.length-1].nom = "Offrandes des Corps d'Elites(Anciens, Diacres, Conseillers)";
        } else if(contributions[contributions.length-1].number == 2) {
          contributions[contributions.length-1].nom = "Offrandes des Hommes";
        } else if(contributions[contributions.length-1].number == 3) {
          contributions[contributions.length-1].nom = "Offrandes des Femmes";
        } else if(contributions[contributions.length-1].number == 4) {
          contributions[contributions.length-1].nom = "Offrandes des Jeunes(Elèves et Etudiants)";
        }
        contributions.forEach(contrib => {
          allContrib.push(contrib.nom);
          allContrib.push(contrib.id);
          allContrib.push(contrib.montant);
          item.push(allContrib);
          allContrib = [];
        });

        const data = {
          "id": auth.getUserInfo().id,
          "devise": devise,
          "items":item,
          "preparation": idPrepa,
          "type": "PREPARATION"
        };
        console.log(item);
        console.log(data);
        let payLink = await prepas.getpaymentlink(data)

        console.log('>>>> Paiement:', payLink);
        console.log("link of payneent");
        console.log(payLink['payment_url']);
				//onChrome(payLink['payment_url'])

      } catch (error) {
        console.warn(error);
      }
  }

	useEffect(()=>{
		(async()=>{
			await getContrib();
		})()
	}, [])

	return(
		<View style={{flex: 1}}>
				<Head screen={t('common.app.prepa')} n={props.navigation} second/>
				<View>
	  			<View style={styles.container_card_main}>
		        	<View style={styles.container_all_dec}>
		        		<Text style={styles.h1}>{t('common.app.preparation_of')} 13/05/2021</Text>
		        		<Text>{t('common.app.contrib_list')}</Text>
								{finalContributions && finalContributions.map((c, i) =>
									<View key={i}>
										<TextInput
											label={t('common.app.amount')+" "+c.nom}
											mode={"outlined"}
											value={c.montant ? String(c.montant) : ""}
											style={{height: 35}}
											onChangeText={text => console.log(text)}
										/>
									</View>
								)}
		        		<View style={{...styles.end2, marginTop: hp('2%')}} >
		        			<Button
									  icon={
									    <Ionicons
									      name="cash-outline"
									      size={22}
									      color={color.primary}
									    />
									  }
									  iconRight= {true}
									  containerStyle={{width: wp('30%')}}
									  type="outline"
									  title={"Mobile  "}
											onPress = {()=>onPayment('XAF')}
									/>

									<Button
									  icon={
									    <Ionicons
									      name="cash-outline"
									      size={22}
									      color={color.primary}
									    />
									  }
									  iconRight= {true}
									  containerStyle={{width: wp("45%"), marginLeft: wp('3%')}}
									  type="outline"
									  title={t('common.app.card')+" / Paypal  "}
										onPress = {()=>onPayment('USD')}
									/>
		        		</View>
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
  end: {
  	flexDirection: 'row',
  	justifyContent: 'space-around',
  	alignItems: 'center',
  },
  end2: {
  	flexDirection: 'row',
  	//alignItems: 'center',
  },
  container_card_main: {
    backgroundColor: 'white',
    marginLeft: hp('2%'),
    marginRight: hp('2%'),
    borderRadius: 10,
    //minHeight: hp('30%'),
    marginTop: hp('2%'),
		paddingBottom: 20,
		paddingRight: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,

    elevation: 13,
  },
  container_all_dec: {
    // alignItems: 'left',
    marginLeft: hp('3%'),
    paddingTop: hp('2%')
  },
  h1: {fontSize: 18, fontWeight: 'bold', color: color.textSeconday}
})
