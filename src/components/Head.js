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

export default function Head({n, screen}){
	return(
		<View style={styles.container}>
			<TouchableOpacity
				onPress={()=>n.toggleDrawer()}
				style={{position: 'absolute', left: wp('7%'), width: wp('50%')}}
			>
				<Ionicons name="menu" size={30}/>
			</TouchableOpacity>
			<View>
				<Text style={{fontSize: 18}}>{screen}</Text>
			</View>
			<View style={{position: 'absolute', right: wp('7%')}}>
				 <Avatar
				    title={"IS"}
				    rounded
				    size="small"
				    source={{ uri: "https://randomuser.me/api/portraits/women/62.jpg" }}
				  />
			</View>
		</View>
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