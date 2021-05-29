import React, {useState, useEffect} from 'react';
import { View, ScrollView, useWindowDimensions, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo } from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input } from 'react-native-elements';
import { themes, color } from '../color';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
//import { Divider } from 'react-native-paper';
import { Divider } from 'react-native-elements';
import { Button, TextInput, Switch   } from 'react-native-paper';
import {profil} from '../statefull/profil'
import { Avatar } from 'react-native-elements';
import Head from '../components/Head';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const OnInput = ({d, l, v, f}) => <TextInput label={d} mode={"outlined"} value={v} style={{height: 35}} onChangeText={text => f(text, l)}/>
const FirstRoute = ({userInfo, onUpdate}) => {
	const [edit, setSate] = useState(false)
	const [pick1, setShowPic1] = useState(false)
	const [pick2, setShowPic2] = useState(false)
  return(
		<View style={{ flex: 1}}>
			<ScrollView>
					{!edit&&
						<View style={{...styles.theContent, ...styles.container_card_main}}>
							<Text style={{color: color.primary, paddingBottom: 8}}>INFORMATION PERSONNELLES</Text>
							<Divider style={{ marginBottom: 8 }} />
							<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 12}}>
								<View>
									<Text style={styles.Text}>Nom:</Text>
									<Text style={styles.Text}>Prénom:</Text>
									<Text style={styles.Text}>Date de Naissance:</Text>
									<Text style={styles.Text}>Lieu de Naissance:</Text>
									<Text style={styles.Text}>Tel 1:</Text>
									<Text style={styles.Text}>Tel 2:</Text>
									<Text style={styles.Text}>Email:</Text>
									<Text style={styles.Text}>Date d'Adhésion:</Text>
									<Text style={styles.Text}>Genre:</Text>
									<Text style={styles.Text}>Zone d'habitation:</Text>
								</View>
								<View>
									<Text style={styles.Text2}>{userInfo.nom}</Text>
									<Text style={styles.Text2}>{userInfo.prenom}</Text>
									<Text style={styles.Text2}>{userInfo.datenaiss && new Date(userInfo.datenaiss).toISOString().split("T")[0]}</Text>
									<Text style={styles.Text2}>{userInfo.lieunaiss}</Text>
									<Text style={styles.Text2}>{userInfo.telephone}</Text>
									<Text style={styles.Text2}>{userInfo.telephone2}</Text>
									<Text style={styles.Text2}>{userInfo.email}</Text>
									<Text style={styles.Text2}>{userInfo.dateInscription && new Date(userInfo.dateInscription).toISOString().split("T")[0]}</Text>
									<Text style={styles.Text2}>{userInfo.sexe}</Text>
									<Text style={styles.Text2}>{userInfo.zone?.nom}</Text>
								</View>
							</View>
							<Button
								icon={()=><Ionicons name="create" size={25} color={color.primary}/>}
								mode="outlined"
								color={color.primary}
								onPress={() => setSate(true)}
							>
								Modifier
							</Button>
						</View>
					}
					{edit&&
						<View style={{...styles.theContent, ...styles.container_card_main}}>
							<Text style={{color: color.primary, paddingBottom: 8}}>
								INFORMATIONS PERSONNELLES
							</Text>
							<View>
								<OnInput d={'Nom'} l={'nom'} v={userInfo.nom} f={onUpdate}/>
								<OnInput d={'Prenom'} l={'prenom'} v={userInfo.prenom} f={onUpdate}/>
								<OnInput d={'Lieu de Naissance'} l={'lieunaiss'} v={userInfo.lieunaiss} f={onUpdate}/>

								<View>
										<TextInput
											label={"Date de Naissance"}
											mode={"outlined"}
											value={userInfo.datenaiss ? new Date(userInfo.datenaiss).toISOString().split("T")[0] :  new Date().toISOString().split("T")[0]}
											style={{height: 35}}
											onFocus = {()=>setShowPic2(true)}
											onBlur = {()=>setShowPic2(true)}
											//onChangeText={text => f(text, 'dateInscription')}
										/>
										<DateTimePickerModal
											testID="dateTimePicker"
											display={"calendar"}
											isVisible={pick2}
											date={userInfo.datenaiss ? new Date(userInfo.datenaiss) :  new Date()}
											onConfirm={(date)=>{setShowPic2(false); onUpdate(date, 'datenaiss'); console.log("nnnnnnn", userInfo.datenaiss)}}
											onCancel={()=>setShowPic2(false)}
										/>
								</View>

								<OnInput d={'Tel 1'} l={'telephone'} v={userInfo.telephone} f={onUpdate}/>
								<OnInput d={'Tel 2'} l={'telephone2'} v={userInfo.telephone2} f={onUpdate}/>
								<OnInput d={'Email'} l={'email'} v={userInfo.email} f={onUpdate}/>
								<View>
										<TextInput
											label={"Date d'Adhésion"}
											mode={"outlined"}
											value={userInfo.dateInscription ? new Date(userInfo.dateInscription).toISOString().split("T")[0] :  new Date().toISOString().split("T")[0]}
											style={{height: 35}}
											onFocus = {()=>setShowPic1(true)}
											onBlur = {()=>setShowPic1(true)}
											//onChangeText={text => f(text, 'dateInscription')}
										/>
										<DateTimePickerModal
											testID="dateTimePicker"
											display={"calendar"}
											isVisible={pick1}
											date={userInfo.dateInscription ? new Date(userInfo.dateInscription) :  new Date()}
											onConfirm={(date)=>{setShowPic1(false); onUpdate(date, 'dateInscription'); console.log("nnnnnnn", userInfo.dateInscription)}}
											onCancel={()=>setShowPic1(false)}
										/>
								</View>
								<OnInput d={'Genre'} l={'genre'} v={userInfo.genre} f={onUpdate}/>
								<OnInput d={"Zone d'habitation"} l={'zone'} v={userInfo.zone} f={onUpdate}/>
							</View>
							<View style={{paddingTop: hp('2%'), flexDirection: 'row', justifyContent: 'space-around'}}>
								<Button
									icon={()=><Ionicons name="close" size={25} color={color.red}/>}
									mode="outlined"
									color={color.red}
									onPress={() => setSate(false)}
								>
									Annuler
								</Button>

								<Button
									icon={()=><Ionicons name="save" size={25} color={color.primary}/>}
									mode="outlined"
									color={color.primary}
									onPress={() => console.log('Pressed')}
								>
									Sauvegarder
								</Button>
							</View>
						</View>
					}
					<View style={{height: hp('5%')}}/>
		  </ScrollView>
		</View>
	)
};

const SecondRoute = ({userInfo, onUpdate}) => {

	const [edit, setSate] = useState(false)
	return(
	  <View style={{ flex: 1}}>
			<ScrollView>
					{!edit&&
					<View style={{...styles.theContent, ...styles.container_card_main}}>
						<Text style={{color: color.primary, paddingBottom: 8}}>ETAT CIVIL</Text>
						<Divider style={{ marginBottom: 8 }} />
						<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15}}>
							<View>
								<Text style={styles.Text}>Statut Matrimonial:</Text>
								<Text style={styles.Text}>Nom du Père:</Text>
								<Text style={styles.Text}>Nom de la mère:</Text>
								<Text style={styles.Text}>Region d'origine:</Text>
								<Text style={styles.Text}>Département:</Text>
								<Text style={styles.Text}>Arrondissement:</Text>
								<Text style={styles.Text}>Ville de Résidence:</Text>
								<Text style={styles.Text}>Nombre d'enfants:</Text>
							</View>

							<View>
								<Text style={styles.Text2}>{userInfo.situationMatrimoniale}</Text>
								<Text style={styles.Text2}>{userInfo.nomPere}</Text>
								<Text style={styles.Text2}>{userInfo.nomMere}</Text>
								<Text style={styles.Text2}>{userInfo.situationMatrimoniale}</Text>
								<Text style={styles.Text2}>{userInfo.situationMatrimoniale}</Text>
								<Text style={styles.Text2}>{userInfo.situationMatrimoniale}</Text>
								<Text style={styles.Text2}>{userInfo.villeOrigine}</Text>
								<Text style={styles.Text2}>{userInfo.nbreEnfant}</Text>
							</View>
						</View>
						<Button
							icon={()=><Ionicons name="create" size={25} color={color.primary}/>}
							mode="outlined"
							color={color.primary}
							onPress={() =>  setSate(true)}
						>
							Modifier
						</Button>
					</View>
					}
					{edit&&
						<View style={{...styles.theContent, ...styles.container_card_main}}>
							<Text style={{color: color.primary, paddingBottom: 8}}>
								ETAT CIVIL
							</Text>
							<View>
								<OnInput d={'Statut Matrimonial'} l={'situationMatrimoniale'} v={userInfo.situationMatrimoniale} f={onUpdate}/>
								<OnInput d={'Nom du Pere'} l={'nomPere'} v={userInfo.nomPere} f={onUpdate}/>
								<OnInput d={'Nom de la Mere'} l={'situationMatrimoniale'} v={userInfo.nomPere} f={onUpdate}/>
								<OnInput d={"Region d'origine"} l={'situationMatrimoniale'} v={userInfo.situationMatrimoniale} f={onUpdate}/>
								<OnInput d={'Département'} l={'situationMatrimoniale'} v={userInfo.situationMatrimoniale} f={onUpdate}/>
								<OnInput d={'Arrondissement'} l={'situationMatrimoniale'} v={userInfo.situationMatrimoniale} f={onUpdate}/>
								<OnInput d={'Ville de Résidence'} l={'villeOrigine'} v={userInfo.villeOrigine} f={onUpdate}/>
								<OnInput d={"Nombre d'enfants"} l={'nbreEnfant'} v={userInfo.nbreEnfant} f={onUpdate}/>
							</View>
							<View style={{paddingTop: hp('2%'), flexDirection: 'row', justifyContent: 'space-around'}}>
								<Button
									icon={()=><Ionicons name="close" size={25} color={color.red}/>}
									mode="outlined"
									color={color.red}
									onPress={() => setSate(false)}
								>
									Annuler
								</Button>

								<Button
									icon={()=><Ionicons name="save" size={25} color={color.primary}/>}
									mode="outlined"
									color={color.primary}
									onPress={() => console.log('Pressed')}
								>
									Sauvegarder
								</Button>
							</View>
						</View>
					}
			</ScrollView>
	  </View>
	)
};

const ThirdRoute = ({userInfo, onUpdate}) => {
	const [edit, setSate] = useState(false)
	return(
	  <View style={{ flex: 1}}>
			<ScrollView>
					{!edit &&
						<View style={{...styles.theContent, ...styles.container_card_main}}>
								<Text style={{color: color.primary, paddingBottom: 8}}>
									INFORMATIONS PROFESSIONNELLES
								</Text>
							<Divider style={{ marginBottom: 8 }} />
							<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15}}>
								<View>
									<Text style={styles.Text}>Profession:</Text>
									<Text style={styles.Text}>Etablissement:</Text>
									<Text style={styles.Text}>Serie / Filière:</Text>
									<Text style={styles.Text}>Classe / Niveau:</Text>
								</View>

								<View>
									<Text style={styles.Text2}>{userInfo.profession}</Text>
									<Text style={styles.Text2}>{userInfo.etablissement}</Text>
									<Text style={styles.Text2}>{userInfo.serieFiliere}</Text>
									<Text style={styles.Text2}>{userInfo.classeNiveau}</Text>
								</View>
							</View>

							<Button
								icon={()=><Ionicons name="create" size={25} color={color.primary}/>}
								mode="outlined"
								color={color.primary}
								onPress={() => setSate(true)}
							>
								Modifier
							</Button>
						</View>
					}

					{edit&&
						<View style={{...styles.theContent, ...styles.container_card_main}}>
							<Text style={{color: color.primary, paddingBottom: 8}}>
								INFORMATIONS PROFESSIONNELLES
							</Text>
							<View>
								<OnInput d={'Profession'} l={'profession'} v={userInfo.profession} f={onUpdate}/>
								<OnInput d={'Etablissement'} l={'etablissement'} v={userInfo.etablissement} f={onUpdate}/>
								<OnInput d={'Serie / Filière'} l={'serieFiliere'} v={userInfo.serieFiliere} f={onUpdate}/>
								<OnInput d={'Classe / Niveau'} l={'classeNiveau'} v={userInfo.classeNiveau} f={onUpdate}/>
							</View>
							<View style={{paddingTop: hp('2%'), flexDirection: 'row', justifyContent: 'space-around'}}>
								<Button
									icon={()=><Ionicons name="close" size={25} color={color.red}/>}
									mode="outlined"
									color={color.red}
									onPress={() => setSate(false)}
								>
									Annuler
								</Button>

								<Button
									icon={()=><Ionicons name="save" size={25} color={color.primary}/>}
									mode="outlined"
									color={color.primary}
									onPress={() => console.log('Pressed')}
								>
									Sauvegarder
								</Button>
							</View>
						</View>
					}
			</ScrollView>
	  </View>
	)
};

const FourthRoute = ({userInfo, onUpdate}) => {

	const [edit, setSate] = useState(false)
	const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

	return(
	  <View style={{ flex: 1}}>
			<ScrollView>
				{!edit &&
						<View style={{...styles.theContent, ...styles.container_card_main}}>
								<Text style={{color: color.primary, paddingBottom: 8}}>
									INFORMATIONS PAROISSIALLES
								</Text>
							<Divider style={{ marginBottom: 8 }} />
							<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15}}>
								<View>
									<Text style={styles.Text}>Statut:</Text>
									<Text style={styles.Text}>Malade ?</Text>
									<Text style={styles.Text}>Chrétien Communiant?</Text>
									<Text style={styles.Text}>Membre de Groupe?</Text>
								</View>

								<View>
									<Text style={styles.Text2}>{userInfo.status}</Text>
									<Text style={styles.Text2}>{(userInfo.isMalade)?'Oui':'Non'}</Text>
									<Text style={styles.Text2}>{(userInfo.isMalade)?'Oui':'Non'}</Text>
									<Text style={styles.Text2}>{(userInfo.groupes)?'Oui':'Non'}</Text>
								</View>
							</View>
							<Button
								icon={()=><Ionicons name="create" size={25} color={color.primary}/>}
								mode="outlined"
								color={color.primary}
								onPress={() => setSate(true)}
							>
								Modifier
							</Button>
						</View>
				}

				{edit&&
					<View style={{...styles.theContent, ...styles.container_card_main}}>
						<Text style={{color: color.primary, paddingBottom: 8}}>
							INFORMATIONS PAROISSIALLES
						</Text>
						<View>
							<OnInput d={'Statut'} l={'status'} v={userInfo.status} f={onUpdate}/>
							<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: hp('1.5%')}}>
								<Text style={styles.Text}>Malade</Text>
								<Switch value={userInfo.isMalade} onValueChange={()=>onUpdate(!userInfo.isMalade, 'isMalade')} />
							</View>
							<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: hp('1.5%')}}>
								<Text style={styles.Text}>Chrétien Communiant?</Text>
								<Switch value={!userInfo.isMalade} onValueChange={()=>onUpdate(userInfo.isMalade, 'isMalade')} />
							</View>
						</View>
						<View style={{paddingTop: hp('2%'), flexDirection: 'row', justifyContent: 'space-around'}}>
							<Button
								icon={()=><Ionicons name="close" size={25} color={color.red}/>}
								mode="outlined"
								color={color.red}
								onPress={() => setSate(false)}
							>
								Annuler
							</Button>

							<Button
								icon={()=><Ionicons name="save" size={25} color={color.primary}/>}
								mode="outlined"
								color={color.primary}
								onPress={() => console.log('Pressed')}
							>
								Sauvegarder
							</Button>
						</View>
					</View>
				}
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
		  <View style={{...styles.end, justifyContent: 'center', alignItems: 'center'}}>
			  {focused &&<Ionicons name={lab2[route.title]} size={24} style={{paddingRight: 20}} color={color.primary}/>}
				{!focused &&<Ionicons name={lab[route.title]} size={24} style={{paddingRight: 20}} color={color.textSeconday}/>}
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
const lab2 = {
	'Info. Perso': 'person-circle',
	'Etat Civil': 'man',
	'Stat. Profes.': 'business',
	'Stat. Paroiss': 'ribbon',
}

export default function Profil({navigation}){
	const layout = useWindowDimensions();

	const onPickImage = () => {
    return ImagePicker.openPicker({
      width: 300,
      height: 400,
			includeBase64: true,
      cropping: true
    }).then(async image => {
			console.log('image image image', image)
			let res =  await profil.postPhoto(image);
			console.log('resssssssssssssssssssss', res);
      return
    })
  }

	const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
    	{ key: 'first', title: 'Info. Perso' },
    	{ key: 'second', title: 'Etat Civil' },
    	{ key: 'third', title: 'Stat. Profes.' },
    	{ key: 'fourth', title: 'Stat. Paroiss' },
    ]);

		const [userInfo, setUserInfos] = useState({})
		const [zone, setSone] = useState({})

		const updateUserInfo = (tex, key) => {
			console.log('keyyyy=====>>', key, tex)
			userInfo[key] = tex
			console.log("=========>>>>", userInfo[key])
			setUserInfos(userInfo);
		}
		useEffect(()=>{
			(async()=>{
				setUserInfos(profil.userData())
				console.log('===>>>userinfo', userInfo)
				let z = await profil.getRegion();
				setSone(z)
				console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>reg depart', z)
			})()
		}, [])

    const renderScene = SceneMap({
    	first: () => <FirstRoute userInfo={userInfo} onUpdate={updateUserInfo}/>,
    	second: () => <SecondRoute userInfo={userInfo} onUpdate={updateUserInfo}/>,
    	third: () => <ThirdRoute userInfo={userInfo} onUpdate={updateUserInfo}/>,
    	fourth: () => <FourthRoute userInfo={userInfo} onUpdate={updateUserInfo}/>,
    });
	return(
		<>
			<Head screen={"Mon Profile"} n={navigation}/>
			<View style={styles.display}>
				<Text h2> Mon Profil</Text>

				<Avatar
					size={wp("23%")}
					rounded
				  source={logo}
					onPress={() => onPickImage()}
				  >
				  <Avatar.Accessory style={{width: 100}} />
				</Avatar>

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
	Text: {
		fontSize: 16,
		paddingBottom: 5,
	},
	Text2: {
		fontSize: 16,
		paddingBottom: 5,
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
},
container_card_main: {
	backgroundColor: 'white',
	marginLeft: wp('1.7%'),
	marginRight: wp('1.7%'),
	padding: hp('2%'),
	paddingHorizontal: wp('4%'),
	borderRadius: 10,
	minHeight: hp('5%'),
	marginTop: hp('2%'),
	shadowColor: "#000",
	shadowOffset: {
		width: 0,
		height: 6,
	},
	shadowOpacity: 0.39,
	shadowRadius: 8.30,

	elevation: 2,
},
})
