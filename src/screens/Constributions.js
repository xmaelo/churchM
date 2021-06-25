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
import { List } from 'react-native-paper';
import { ActivityIndicator, Divider} from 'react-native-paper';
import {finance} from '../statefull/finance'
import {
  ANIMATIONS_SLIDE,
  ANIMATIONS_FADE,
  CustomTabs
} from 'react-native-custom-tabs';


const onChrome = (url) => {
  CustomTabs.openURL(url, {
    toolbarColor: '#607D8B',
    enableUrlBarHiding: false,
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
export default function Constributions(props){
	const [preparations, setPrepas] = useState([])
	const [formation, setF] = useState("0")
	const [construction, setCons] = useState("0")
	const [cont, setCon] = useState(null)


	useEffect(()=>{
		(async()=>{
      const mo = await finance.getEntreeFinanciere()
      setCon(mo['hydra:member'])
      console.log('getEntreeFinanciere getEntreeFinanciere')
		})()
	}, [])

	return(
    <ScrollView>
  		<View style={{flex: 1}}>
  				<Head screen={"Contributions"} n={props.navigation} second/>
  				<View>
          {cont&&cont.map((t, i)=>
              <View key={t.id}>
                  <List.Accordion
                    title={t.intitule}
                  >

                  <TouchableOpacity onPress={()=>props.navigation.navigate('DetailsContribution', {param: t})} style={{flexDirection: 'row', paddingHorizontal: wp('10%')}}>
                    <Ionicons name="arrow-forward-outline" size={23} color={color.primary} />
                    <Text style={{fontStyle: 'italic', textDecorationLine: 'underline', color: color.primary, paddingBottom: 8}}>Contribuer</Text>
                  </TouchableOpacity>

                  </List.Accordion>
                  <Divider />
              </View>
          )}
          </View>
  		</View>
    </ScrollView>
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
