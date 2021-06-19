import * as React from 'react';
import { Text, Input, Button, Header, Avatar} from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Appbar } from 'react-native-paper';
import { themes, color } from '../color';

export default function Head({n, screen, second, dialog, isNeedFetchUsers, isGroup}){

  const _goBack = () =>n.toggleDrawer();

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  //props.navigate('GroupDetails', { dialog: props?.route?.params?.dialog, isNeedFetchUsers })

	return(
    <Header
    leftComponent={
      !second ?
      {
        icon:'menu',
        color: '#fff',
        onPress: ()=>n.toggleDrawer()
      }
      :
      ()=>
        <TouchableOpacity onPress={()=>n.goBack(null)}>
          <Ionicons name={"chevron-back-outline"} size={24} color={"#fff"}/>
        </TouchableOpacity>
      }
      centerComponent={()=><Text style={{fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', color: "white"}}>{screen}</Text>}

      rightComponent={isGroup ? ()=>
          <TouchableOpacity onPress={()=>n.navigate('GroupDetails', { dialog: dialog, isNeedFetchUsers })}>
            <Ionicons name={"cog-outline"} size={24} color={"#fff"}/>
          </TouchableOpacity> : null
      }
  />

	)
}

const styles = StyleSheet.create({
  container: {
  	//height={hp('30%')}
  	flexDirection: 'row',
  	alignItems: 'center',
  	justifyContent: 'space-around',
  	paddingHorizontal: wp('10%'),
    borderRadius: 10,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,

    elevation: 7,
  }
})
		/*<Header
				  placement="left"
				  leftComponent={{ icon: 'menu', color: '#fff', onPress:  ()=>n.toggleDrawer()}}
				  centerComponent={{ text: screen, style: { color: '#fff' } }}
				  rightComponent={{ icon: 'home', color: '#fff' }}
				/>*/
