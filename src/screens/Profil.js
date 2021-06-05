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
import { Button, TextInput, Switch, RadioButton  } from 'react-native-paper';
import {profil} from '../statefull/profil'
import { Avatar } from 'react-native-elements';
import Head from '../components/Head';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import { ActivityIndicator} from 'react-native-paper';

const OnInput = ({d, l, v, f}) => {
	return <TextInput label={d} mode={"outlined"} value={v && typeof v !== 'function' ? String(v) : ""} style={{height: 35}} onChangeText={text => f(text)}/>
}
const FirstRoute = (props) => {
	const [edit, setSate] = useState(false)
	const [pick1, setShowPic1] = useState(false)
	const [pick2, setShowPic2] = useState(false)
	const [userInfo, setUserIn] = useState(props.userInfo)
	const [updating, setUpdating] = useState(false)
	const [code, setCode] = useState(props.userInfo.code)
  const [nom, setNom] = useState(props.userInfo.nom)
  const [prenom, setPrenom] = useState(props.userInfo.prenom)
  const [lieunaiss, setLieunaiss] = useState(props.userInfo.lieunaiss)
  const [sexe, setSexe] = useState(props.userInfo.sexe)
  const [cni, setCni] = useState(props.userInfo.cni)
  const [telephone, setTelephone] = useState(props.userInfo.telephone)
  const [telephone2, setTelephone2] = useState(props.userInfo.telephone2)
  const [email, setEmail] = useState(props.userInfo.email)

	 const [dateInscription, setDateInscription] = useState(userInfo.dateInscription)
	 const [datenaiss, setDatenaiss] = useState(userInfo.datenaiss)
	const onUpdate = async () => {
			let u = props.userInfo
			u.code = code;
      u.nom = nom;
      u.prenom = prenom;
      u.datenaiss = datenaiss;
      u.lieunaiss = lieunaiss;
      u.sexe = sexe;
      u.telephone = telephone;
      u.telephone2 = telephone2;
      u.email = email;
      u.sexe = sexe;
			console.log('_____________Update_________________', u)
			setUpdating(true)
			await props.onUpdate(u);
			setUserIn(u)
			setSate(false)
			setUpdating(false)
	}
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
								<OnInput d={'Nom'} l={'nom'} v={nom} f={setNom}/>
								<OnInput d={'Prenom'} l={'prenom'} v={prenom} f={setPrenom}/>
								<OnInput d={'Lieu de Naissance'} l={'lieunaiss'} v={lieunaiss} f={setLieunaiss}/>

								<View>
										<TextInput
											label={"Date de Naissance"}
											mode={"outlined"}
											value={datenaiss ? new Date(datenaiss).toISOString().split("T")[0] :  new Date().toISOString().split("T")[0]}
											style={{height: 35}}
											onFocus = {()=>setShowPic2(true)}
											//onBlur = {()=>setShowPic2(true)}
											//onChangeText={text => f(text, 'dateInscription')}
										/>
										<DateTimePickerModal
											testID="dateTimePicker"
											display={"calendar"}
											isVisible={pick2}
											date={datenaiss ? new Date(datenaiss) :  new Date()}
											onConfirm={(date)=>{setShowPic2(false); setDatenaiss(date)}}
											onCancel={()=>setShowPic2(false)}
										/>
								</View>

								<OnInput d={'Tel 1'} l={'telephone'} v={telephone} f={setTelephone}/>
								<OnInput d={'Tel 2'} l={'telephone2'} v={telephone2} f={setTelephone2}/>
								<OnInput d={'Email'} l={'email'} v={email} f={setEmail}/>
								<View>
										<TextInput
											label={"Date d'Adhésion"}
											mode={"outlined"}
											value={dateInscription ? new Date(dateInscription).toISOString().split("T")[0] :  new Date().toISOString().split("T")[0]}
											style={{height: 35}}
											onFocus = {()=>setShowPic1(true)}
											//onBlur = {()=>setShowPic1(true)}
											//onChangeText={text => f(text, 'dateInscription')}
										/>
										<DateTimePickerModal
											testID="dateTimePicker"
											display={"calendar"}
											isVisible={pick1}
											date={dateInscription ? new Date(dateInscription) :  new Date()}
											onConfirm={(date)=>{setShowPic1(false); setDateInscription(date)}}
											onCancel={()=>setShowPic1(false)}
										/>
								</View>
								<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
									<Text>Genre:</Text>
									<View style={{flexDirection: 'row', alignItems: 'center'}}>
										<Text>Masculin</Text>
							      <RadioButton
							        value="first"
							        status={sexe.toLowerCase().startsWith('m') ? 'checked' : 'unchecked'}
							        onPress={() => setSexe('Masculin')}
							      />
									</View>
									<View style={{flexDirection: 'row', alignItems: 'center'}}>
										<Text>Feminin</Text>
							      <RadioButton
							        value="second"
							        status={sexe.toLowerCase().startsWith('f') ? 'checked' : 'unchecked'}
							        onPress={() => setSexe('Feminin')}
							      />
									</View>
						    </View>
								{/*<OnInput d={"Zone d'habitation"} l={'zone'} v={zone} f={setZ}/>*/}
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
									loading={updating}
									onPress={() => onUpdate()}
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

const SecondRoute = (props) => {
	const [updating, setUpdating] = useState(false)
	const [edit, setSate] = useState(false)
	const [userInfo, setUserIn] = useState(props.userInfo)


	const [nomPere, setNomPere] = useState(props.userInfo.nomPere)
	const [nomMere, setNomMere] = useState(props.userInfo.nomMere)

  const [situationMatrimoniale, setSituationMatrimoniale] = useState(userInfo.situationMatrimoniale)
  const [nbreEnfant, setNbreEnfant] = useState(userInfo.nbreEnfant)

	const onUpdate = async () => {
		let u = userInfo;
		u.situationMatrimoniale = situationMatrimoniale
		u.nbreEnfant = parseInt(nbreEnfant)
		u.nomPere = nomPere
		u.nomMere = nomMere
		setUpdating(true)
		await props.onUpdate(u);
		setUserIn(u)
		setSate(false)
		setUpdating(false)
	}
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
								{/*
								<Text style={styles.Text}>Region d'origine:</Text>
								<Text style={styles.Text}>Département:</Text>
								<Text style={styles.Text}>Arrondissement:</Text>
								*/}
								<Text style={styles.Text}>Ville de Résidence:</Text>
								<Text style={styles.Text}>Nombre d'enfants:</Text>
							</View>

							<View>
								<Text style={styles.Text2}>{userInfo.situationMatrimoniale}</Text>
								<Text style={styles.Text2}>{userInfo.nomPere}</Text>
								<Text style={styles.Text2}>{userInfo.nomMere}</Text>
								{/*
								<Text style={styles.Text2}>{userInfo.arrondissementOrigine?.idDe?.idRe?.nom}</Text>
								<Text style={styles.Text2}>{userInfo.arrondissementOrigine?.idDe?.nom}</Text>
								<Text style={styles.Text2}>{userInfo.arrondissementOrigine?.nom}</Text>
								*/}
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
								<OnInput d={'Statut Matrimonial'} l={'situationMatrimoniale'} v={situationMatrimoniale} f={setSituationMatrimoniale}/>
								<OnInput d={'Nom du Pere'} l={'nomPere'} v={nomPere} f={setNomPere}/>
								<OnInput d={'Nom de la Mere'} l={'situationMatrimoniale'} v={nomMere} f={setNomMere}/>
								{/*<OnInput d={'Ville de Résidence'} l={'villeOrigine'} v={villeOrigine} f={setV}/>*/}
								<OnInput d={"Nombre d'enfants"} l={'nbreEnfant'} v={String(nbreEnfant)} f={setNbreEnfant}/>
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
									loading={updating}
									onPress={() =>onUpdate()}
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

const ThirdRoute = (props) => {
	const [updating, setUpdating] = useState(false)
	const [edit, setSate] = useState(false)
	const [userInfo, setUserIn] = useState(props.userInfo)


	const [etablissement, setEtablissement] = useState(userInfo.etablissement)
  const [classeNiveau, setClasseNiveau] = useState(userInfo.classeNiveau)
  const [serieFiliere, setSerieFiliere] = useState(userInfo.serieFiliere)
	const [profession, setProfession] = useState(props.userInfo.profession)

	const onUpdate = async () => {
		let u = userInfo;
		u.profession = profession
		u.etablissement = etablissement
	  u.classeNiveau = classeNiveau
	  u.serieFiliere = serieFiliere
		setUpdating(true)
		await props.onUpdate(u);
		setUserIn(u)
		setSate(false)
		setUpdating(false)
	}

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
								<OnInput d={'Profession'} l={'profession'} v={profession} f={setProfession}/>
								<OnInput d={'Etablissement'} l={'etablissement'} v={etablissement} f={setEtablissement}/>
								<OnInput d={'Serie / Filière'} l={'serieFiliere'} v={serieFiliere} f={setSerieFiliere}/>
								<OnInput d={'Classe / Niveau'} l={'classeNiveau'} v={classeNiveau} f={setClasseNiveau}/>
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
									loading={updating}
									onPress={() => onUpdate()}
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

const FourthRoute = (props) => {

	const [edit, setSate] = useState(false)
	const [updating, setUpdating] = useState(false)
	const [isMalade, setIsMamade] = useState(props.userInfo.isMalade);
	const [communiant, setCommunian] = useState(props.userInfo.setCommunian);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
	const [adresse, setAdresse] = useState(props.userInfo.adresse)
	const [status, setStatus] = useState(props.userInfo.status)

	const [domaine, setDomaine] = useState(props.userInfo.domaine)
	const [dernierDiplome, setDernierDiplome] = useState(props.userInfo.dernierDiplome)
	const [statusPro, setStatusPro] = useState(props.userInfo.statusPro)
	const [employeur, setEmployeur] = useState(props.userInfo.employeur)

	const [userInfo, setUserIn] = useState(props.userInfo)
	const onUpdate = async () => {
			let u = userInfo
			u.status = status
			u.communiant = communiant
			u.isMalade = isMalade
			setUpdating(true)
			await props.onUpdate(u);
			setUserIn(u)
			setSate(false)
			setUpdating(false)
	}
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
							<OnInput d={'Statut'} l={'status'} v={status} f={setStatus}/>
							<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: hp('1.5%')}}>
								<Text style={styles.Text}>Malade</Text>
								<Switch value={isMalade} onValueChange={()=>setIsMamade(!isMalade)} />
							</View>
							<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: hp('1.5%')}}>
								<Text style={styles.Text}>Chrétien Communiant?</Text>
								<Switch value={communiant} onValueChange={()=>setCommunian(!communiant)} />
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
								loading={updating}
								onPress={() => onUpdate()}
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


		const updateUserInfo = (u) => {
			setUserInfos(u);
		}
		const onUpdate = async(u) => {
			console.log('_____________>>><<<<________________',userInfo, userInfo.zone.id)
			setUserInfos(u);
			try{
				delete u.user
				u.arrondissementOrigine = userInfo?.arrondissementOrigine["@id"]
				u.zone = "/api/zones/"+userInfo?.zone?.id?.toString();
				let k = await profil.updatePersonne(u)
				if(k) {setUserInfos(k)}
			}catch(e){
				console.log('error updating userInfo', e)
			}
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
    	first: () => <FirstRoute userInfo={userInfo} onUpdate={onUpdate} u={onUpdate}/>,
    	second: () => <SecondRoute userInfo={userInfo} onUpdate={onUpdate} u={onUpdate}/>,
    	third: () => <ThirdRoute userInfo={userInfo} onUpdate={onUpdate} u={onUpdate}/>,
    	fourth: () => <FourthRoute userInfo={userInfo} onUpdate={onUpdate} u={onUpdate}/>,
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
