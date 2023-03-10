import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet,Platform, StatusBar, PlatformImage, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button, Divider } from 'react-native-elements';
import { themes, color} from '../color';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import Head from '../components/Head'
import Head2 from '../components/Head'
import { useTranslation } from 'react-i18next';
import { login } from '../statefull/login';
import { user } from '../statefull/query'
export default function ContactEglise({navigation}){
	const {t} = useTranslation();
	const [objec, setOb] = useState('')
	const [text, setText] = useState('')
	async function onSend(){
		console.log('onsend reun')
		let res = await login.send(objec, text)
		console.log('erul send mail', res)
	}
	return(
		<View>
			<Head screen={t('common.app.contact_church')} n={navigation} second/>
			<ScrollView>
				<View style={styles.container}>
					<View style={{...styles.end2, marginTop: hp('2%')}} >
	        			<Ionicons name={"globe-outline"} size={24} color={color.primary}/>
	        			<Text>{user.getEinfos()&&" "+user.getEinfos()[0].siteweb}</Text>
	        		</View>
	        		<View style={{...styles.end2, marginTop: hp('2%')}} >
	        			<Ionicons name={"call"} size={24} color={color.primary}/> 
	        			<Text>{user.getEinfos()&&" "+user.getEinfos()[0].telephone}</Text>
	        		</View>
	        		<View style={{...styles.end2, marginTop: hp('2%')}} >
	        			<Ionicons name={"mail"} size={24} color={color.primary}/>
	        			<Text>{user.getEinfos()&&" "+user.getEinfos()[0].email}</Text>
	        		</View>
	        		<Divider style={{ backgroundColor: "#898A8F", marginTop: hp('1%'), height: 3 }} />

					<View style={styles.container_card_main}>
			        	<View style={styles.container_all_dec}>
			        		<Input
		                      label={t('common.app.object')}
							  onChangeText={(e)=> setOb(e)}
							/>
							<AutoGrowingTextInput
				              style={styles.textInput}
				              placeholder="Message..."
				              //placeholderTextColor="grey"
				              //value={messageText}
				              onChangeText={(e)=> setText(e)}
				              maxHeight={170}
				              minHeight={70}
				              enableScrollToCaret
				            />
				            <View style={{height: 20}}/>
				            <Button
							  title={t('common.app.send')}
							  type="outline"
							  onPress={()=> onSend()}
							/>
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
  	justifyContent: 'space-around',
  	alignItems: 'center',
  },
  end2: {
  	flexDirection: 'row',
  	alignItems: 'center',
  },
  container_card_main: {
    backgroundColor: 'white',
    //marginLeft: hp('2%'),
    //marginRight: hp('2%'),
    borderRadius: 10,
    minHeight: hp('35%'),
    marginTop: hp('2%'),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,

    elevation: 5,
  },
  container_all_dec: {
    // alignItems: 'left',
    // marginLeft: hp('3%'),
    // paddingTop: hp('2%')
    padding: hp('2%')
  },
  h1: {fontSize: 18, fontWeight: 'bold', color: color.textSeconday},
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '300',
    color: '#8c8c8c',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'ios' ? 14 : 10,
    paddingBottom: Platform.OS === 'ios' ? 14 : 10,
    //paddingRight: 35,
    backgroundColor: 'whitesmoke',
  },
})
