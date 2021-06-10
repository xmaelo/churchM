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
import { List } from 'react-native-paper';
import { ActivityIndicator, Divider} from 'react-native-paper';
import {
  ANIMATIONS_SLIDE,
  ANIMATIONS_FADE,
  CustomTabs
} from 'react-native-custom-tabs';


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
export default function Constributions(props){
	const [preparations, setPrepas] = useState([])


	useEffect(()=>{
		(async()=>{
		})()
	}, [])

	return(
		<View style={{flex: 1}}>
				<Head screen={"Contributions"} n={props.navigation} second/>
				<View>
        <View>
            <List.Accordion
              title={"Construction"}
            >

            <View>
              <View style={{paddingHorizontal: wp('5%')}}>
                  <TextInput
                    label={"Montant "}
                    mode={"outlined"}
                    value={"0"}
                    style={{height: 35}}
                  //  onChangeText={text => console.log(text)}
                  />
                </View>
                <View style={{...styles.end2, marginTop: hp('2%'), justifyContent: "center", paddingBottom: 20}} >
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
                    //  onPress = {()=>onPayment('XAF')}
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
                    title={"Carte / Paypal  "}
                    //onPress = {()=>onPayment('USD')}
                  />
                </View>
            </View>

            </List.Accordion>
            <Divider />
        </View>

        <View>
            <List.Accordion
              title={"Formations"}
            >

            <View>
              <View style={{paddingHorizontal: wp('5%')}}>
                  <TextInput
                    label={"Montant "}
                    mode={"outlined"}
                    value={"0"}
                    style={{height: 35}}
                  //  onChangeText={text => console.log(text)}
                  />
                </View>
                <View style={{...styles.end2, marginTop: hp('2%'), justifyContent: "center", paddingBottom: 20}} >
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
                    //  onPress = {()=>onPayment('XAF')}
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
                    title={"Carte / Paypal  "}
                    //onPress = {()=>onPayment('USD')}
                  />
                </View>
            </View>

            </List.Accordion>
            <Divider />
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
