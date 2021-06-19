import React, {useState, useEffect} from 'react';
import { View, ScrollView, useWindowDimensions, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input } from 'react-native-elements';
import { themes, color } from '../color';
import Head from '../components/Head'
import { TextInput, Button, Snackbar  } from 'react-native-paper';
import {prepas, auth} from '../statefull/preparation'
import {
  ANIMATIONS_SLIDE,
  ANIMATIONS_FADE,
  CustomTabs
} from 'react-native-custom-tabs';


const onChrome = (url) => {
  CustomTabs.openURL(url, {
    toolbarColor: color.primary,
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
	const [preparations, setPrepas] = useState([])
	const [idPrepa, setIdPrepa] = useState(null)
	const [contributions, setC] = useState(null)
	const [finalContributions, setCF] = useState(null)
	const [loadingXAF, setLXaf] = useState(false)
	const [desabledXaf, setDesabledXaf] = useState(false)
	const [loadingUSD, setUS] = useState(false)
	const [desabledUsd, setDesabledUsd] = useState(false)

	const [intinialObj, setInitialObj] = useState({})
	const [visible, setVisible] = useState(false)

	const onToggleSnackBar = () => setVisible(!visible);
	const onDismissSnackBar = () => setVisible(false);

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
          finalContributions.push({nom: "Offrandes des Corps d'Elites(Anciens, Diacres, Conseillers)", montant: 0, id: id, number: number});
          console.log('COntributions ===>>>:', finalContributions);

          let obj = {}
          finalContributions.map((contrib)=>{
            obj[contrib.nom] = contrib.montant
            return;
          })
					setInitialObj(obj)
					setCF(finalContributions)


					console.log('obj obj================>>>>>', obj)

        } else {
          //this.prepas = true;
        }
    } catch (error) {
      console.warn(error);
    }
  }

	 	const onPayment = async (devise) => {
			console.log('contributions contributions status')
			let contributions = finalContributions
			if (devise === "XAF") {
				setLXaf(true)
				setDesabledUsd(true)
			}
			else if (devise === "USD"){
				setUS(true)
				setDesabledXaf(true)
			}
			if(!loadingUSD && !loadingXAF){
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
					console.log('intinialObj intinialObj intinialObj', intinialObj)
	        contributions.forEach(contrib => {
	          allContrib.push(contrib.nom);
	          allContrib.push(contrib.id);
						let amount = intinialObj[contrib.nom] !== undefined ? parseInt(intinialObj[contrib.nom]) : 0
	          allContrib.push(amount);
	          item.push(allContrib);
	          allContrib = [];
	        });

					console.log(' auth.getUserInfo()  auth.getUserInfo()')
	        const data = {
	          "id": auth.getUserId(),
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
					setLXaf(false)
					setUS(false)
					if(payLink['payment_url']){
						onChrome(payLink['payment_url'])
					}else {
						setVisible(true)
					}
	      } catch (error) {
					console.log('an error ==============>>>', error)
	        console.warn(error);
	      }
				setLXaf(false)
				setDesabledUsd(false)
				setUS(false)
				setDesabledXaf(false)
			}
  }

	useEffect(()=>{
		(async()=>{
			await getContrib();
		})()
	}, [])

	return(
		<View style={{flex: 1}}>
				<Head screen={"Préparation"} n={props.navigation} second/>
				<View>
	  			<View style={styles.container_card_main}>
		        	<View style={styles.container_all_dec}>
		        		<Text style={styles.h1}>PREPARATION DU 13/05/2021</Text>
		        		<Text>Liste des contributions</Text>
								{finalContributions && finalContributions.map((c, i) =>
									<View key={i}>
										<TextInput
											label={"Montant "+c.nom}
											mode={"outlined"}
											keyboardType="numeric"
											value={intinialObj && intinialObj[c.nom] !== undefined ? String(intinialObj[c.nom]) : "0"}
											style={{height: 45, paddingBottom: 10}}
											onChangeText={text => setInitialObj({...intinialObj, [c.nom]: text})}
										/>
									</View>
								)}
		        		<View style={{...styles.end2, marginTop: hp('2%'), alignItems: 'center', justifyContent: 'center'}} >
		        			<Button
									  icon={() =>
									    <Text style={{color: color.primary, fontWeight: 'bold'}}>XAF</Text>
									  }
										disabled={desabledXaf}
									  //iconRight= {true}
									  //containerStyle={{width: wp('30%')}}
									  mode="outlined"
										loading={loadingXAF}
										onPress = {()=>onPayment('XAF')}
									>
										{"Mobile"}
									</Button>

									<Button
									  icon={() =>
									    <Ionicons
									      name="logo-usd"
									      size={22}
									      color={color.primary}
									    />
									  }
										disabled={desabledUsd}
										loading={loadingUSD}
									  mode="outlined"
										onPress = {()=>onPayment('USD')}
									>
										{"Carte / Paypal"}
									</Button>
		        		</View>
		        	</View>
		        </View>
	  		</View>
				<Snackbar
					visible={visible}
					onDismiss={onDismissSnackBar}
					action={{
						label: 'Fermer',
						onPress: () => {
							// Do something
						},
					}}>
					Une erreur est survenu !
					Verifier si vous avez entré un montant correct ou si vous avez toujours accès a internet
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
