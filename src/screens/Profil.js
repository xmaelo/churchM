import React, {useState, useEffect} from 'react';
import { View, ScrollView, useWindowDimensions, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo } from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button } from 'react-native-elements';
import { themes, color } from '../color';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import Head from '../components/Head';

const FirstRoute = () => (
	<View style={{ flex: 1}}>
		<ScrollView>
			<View style={styles.theContent}>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Nom:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>Ghost</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Prénom:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>Ghost</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Date de Naissance: </Text>
					<Text style={{marginRight: 65, fontSize: 17}}>20/10/2021</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Lieu de Naissance</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>Yaoundé</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Téléphone 1:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>+23769326541</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Téléphone 2:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}></Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Email:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>ghost@ghost.ghost</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Date d'Adhésion:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>20/10/2021</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Genre:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>Masculin</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Zone d'habitation: </Text>
					<Text style={{marginRight: 65, fontSize: 17}}>MENDONG</Text>
				</View>
			</View>
	  </ScrollView>
	</View>
);

const SecondRoute = () => {
	return(
	  <View style={{ flex: 1}}>
		  <ScrollView>
		  <View style={styles.theContent}>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Statut Matrimonial:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>Célibataire</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Nom du Père:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>Ghost</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Nom de la mère: </Text>
					<Text style={{marginRight: 65, fontSize: 17}}>Ghost</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Region d'origine:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>OUEST</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Département:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>NDE</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Arrondissement:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>Bangangté</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17, fontSize: 17}}>Ville de Résidence:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>Yaoundé</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Nombre d'enfants:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>5</Text>
				</View>
			</View>
		  </ScrollView>
	  </View>
	)
};

const ThirdRoute = () => {
	return(
	  <View style={{ flex: 1}}>
		  <ScrollView>
		  <View style={styles.theContent}>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Profession:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>Elève</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Etablissement:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>KTC</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Serie/Filière: </Text>
					<Text style={{marginRight: 65, fontSize: 17}}>Informatique</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Classe/Niveau:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>DQP</Text>
				</View>
			</View>
		  </ScrollView>
	  </View>
	)
};

const FourthRoute = () => {
	return(
	  <View style={{ flex: 1}}>
		  <ScrollView>
		  <View style={styles.theContent}>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Statut:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>FIDELE</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Malade?:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>Non</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Chrétien Communiant?: </Text>
					<Text style={{marginRight: 65, fontSize: 17}}>Non</Text>
				</View>
				<View style={styles.textStyle}>
					<Text style={{fontSize: 17}}>Membre de Groupe:</Text>
					<Text style={{marginRight: 65, fontSize: 17}}>Oui</Text>
				</View>
			</View>
		  </ScrollView>
	  </View>
	)
};

const renderTabBar = props => (
	<TabBar
	  {...props}
	  indicatorStyle={{ backgroundColor: color.primary }}
	  style={{ backgroundColor: 'white'}}
	  renderLabel={({ route, focused }) => (
		  <View style={styles.end}>
			  {focused &&<Ionicons name={lab[route.title]} size={24} style={{paddingRight: 20}} color={color.primary}/>}
			  <Text style={{ color: !focused ?'black' : color.primary, margin: 5, fontSize: 17 }}>
				{route.title}
			  </Text>
		  </View>
	  )}
	/>
  );

const lab = {
	'Info. Perso': 'person-circle-outline',
	'Etat Civil': 'man-outline',
	'Stat. Profes.': 'business-outline',
	'Stat. Paroiss': 'ribbon-outline',
}

export default function Profil({navigation}){
	const layout = useWindowDimensions();

	const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
    	{ key: 'first', title: 'Info. Perso' },
    	{ key: 'second', title: 'Etat Civil' },
    	{ key: 'third', title: 'Stat. Profes.' },
    	{ key: 'fourth', title: 'Stat. Paroiss' },
    ]);

    const renderScene = SceneMap({
    	first: FirstRoute,
    	second: SecondRoute,
    	third: ThirdRoute,
    	fourth: FourthRoute,
    });
	return(
		<>
			<Head screen={"Mon Profile"} n={navigation}/>
			<View style={styles.display}>
				<Text h2> Mon Profil</Text>
				<Image source={logo} style={styles.img}/>
			</View>
			<TabView
			  renderTabBar={renderTabBar}
			  navigationState={{ index, routes }}
			  renderScene={renderScene}
		      onIndexChange={setIndex}
		      initialLayout={{ width: layout.width }}
		    />
		</>
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
img: {
	width: wp("23%"),
	height: hp("11%")
},
display: {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: 15
},
theContent: {
	marginLeft: 10,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-evenly',

},
textStyle: {
	fontSize: 17,
	marginTop: 10,
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
}
})
