import React, {useState, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, useWindowDimensions, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input } from 'react-native-elements';
import { themes, color } from '../color';
import Head from '../components/Head'
import { TextInput, Switch, RadioButton  } from 'react-native-paper';
import {auth, prepas} from '../statefull/preparation'
import { List } from 'react-native-paper';
import { ActivityIndicator, Divider} from 'react-native-paper';
import { Button, Snackbar  } from 'react-native-paper';
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

export default function DetailsContribution({navigation, route}){
  const [conts, setCon] = useState({})
  const [input, setInput] = useState('0')
  const [loadingXAF, setLXaf] = useState(false)
	const [desabledXaf, setDesabledXaf] = useState(false)
	const [loadingUSD, setUS] = useState(false)
	const [desabledUsd, setDesabledUsd] = useState(false)
  const [visible, setVisible] = useState(false)

  const onToggleSnackBar = () => setVisible(!visible);
	const onDismissSnackBar = () => setVisible(false);

  const cont = route.params?.param
  /**
	useEffect(()=>{
		(async()=>{
      setCon(route.params?.param)
		})()
	}, [])
  */

  useFocusEffect(
    React.useCallback(() => {
      async function get() {
        console.log('on oute.params?.param===>>>>', route.params?.param?.intitule)
        setCon(route.params?.param)
      }
      get()
      return;
    }, [])
  );

  const onPayment = async (devise) => {
      console.log('contributions contributions status')
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
          var allContrib = [];
          var items = [];
          allContrib.push(cont.intitule);
          allContrib.push(cont.description);
          const montant = input && input.trim() !== "" ? parseInt(input) : 0
          allContrib.push(montant);
          items.push(allContrib);

          var data = {
            "id": auth.getUserId(),
            "devise": devise,
            "items":items,
            "preparation":"no",
            "type": "AUTRE",
          };
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

  return(
    <View style={{flex: 1}}>
      <Head screen={"Contribuer"} n={navigation} second/>
      <View style={{paddingHorizontal: wp('4%')}}>
        <Text h3>{cont.intitule}</Text>
        <Text>{cont.description}</Text>

        <View style={{paddingHorizontal: wp('2%')}}>
           <TextInput
            keyboardType="numeric"
             label={"Montant "}
             mode={"outlined"}
             value={input}
             style={{height: 35}}
             onChangeText={text => setInput(text)}
           />
         </View>
         <View style={{...styles.end2, marginTop: hp('2%'), justifyContent: "center", paddingBottom: 20}} >
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
             {"Mobile  "}
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
             {"Carte / Paypal  "}
           </Button>
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
