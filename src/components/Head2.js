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

export default function Head2({title, n}){
  const _goBack = () =>n.goBack(null);

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return(
    <Appbar.Header style={{backgroundColor: color.primary}}>
      <Appbar.Action  icon={()=><Ionicons name={"chevron-back-outline"} size={24} color={"#fff"}/>}  onPress={_goBack} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  )
}
/**
<Header
  leftComponent={()=><TouchableOpacity onPress={()=>n.goBack(null)}><Ionicons name={"chevron-back-outline"} size={24} color={"#fff"}/></TouchableOpacity>}
  centerComponent={{ text: title, style: { color: '#fff' } }}
  //rightComponent={{ icon: 'home', color: '#fff' }}
/>
*/
