import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import {img1} from "../assets"
import {img2} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, ListItem, Avatar, Button } from 'react-native-elements';
import { themes, color } from '../color';
import Head from '../components/Head'
import {annonce} from '../statefull/annonces'
import { List } from 'react-native-paper';
import { ActivityIndicator, Divider} from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export default function Annonces({navigation}){
const [list, setlist] = useState([]);
const {t} = useTranslation();

 useEffect(()=>{
	 (async()  => {
		 let list = await annonce.getAnnonce();
		 //setlist(list)
		 console.log('------------------->>>list', list)
		 getAnnonceImg(list);
	 })();
	 return;
 }, [])
 const getAnnonceImg = (lst) => {
    const imgRex = /<img.*?src="(.*?)"[^>]+>/g;
			let img;

			lst.forEach(element => {
				while ((img = imgRex.exec(element.content.rendered))) {
					element['img'] = img[1];
        }
        
        if(!(img = imgRex.exec(element.content.rendered))){
          element['img'] = logo
        }
      });
	  console.log("Annonces ------->:",lst);
	  setlist(lst);
  }

	return(
		<ScrollView>
			<View>
				<Head screen={t('common.app.annonce')} n={navigation}/>
					<View style={null}>
						{list && list.map((l, i) => (
							<View key={i}>
									<List.Accordion
										title={l.title?.rendered}
										description={t('common.app.add_the')+" "+new Date(l.modified).toISOString().split("T")[0]}
										//left={props => <Avatar source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}} />}
										style={null}
										left={props => <Avatar source={l.img} />}
									>
										<TouchableOpacity onPress={()=>navigation.navigate('AnnonceDetails', {param: l.title})}>
											<Text style={{fontStyle: 'italic', textDecorationLine: 'underline', color: color.primary, paddingBottom: 8}}>lire l'annonce</Text>
										</TouchableOpacity>
									</List.Accordion>
									<Divider />
							</View>
						))}
						{!list &&
							<View style={{margin: wp('20%')}}>
								<ActivityIndicator animating={true} color={color.primary} size={"large"}/>
							</View>
						}
					</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('8%'),
    flex: 1
  }
})
