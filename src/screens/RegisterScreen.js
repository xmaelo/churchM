import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, ToastAndroid,StatusBar, Image, TouchableOpacity,BackHandler } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button } from 'react-native-elements';
import { themes, color } from '../color';
import { CheckBox } from 'react-native-elements'
import AppIntroSlider from '@lomelidev/react-native-walkthrough';
import { params } from '../statefull/params';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { profil } from '../statefull/profil';
import { login } from '../statefull/login';
//import Walkthrough from '@lomelidev/react-native-walkthrough';

function Header({text}){
	return(
		<View style={styles.logo}>
			<Image source={logo} style={styles.img}/>
			<Text h4 >{text}</Text>
		</View>
	)
}

function TextInput({placeholder, icon, label}){
	return(
		<Input
				 placeholder={placeholder}
				 label={label}
				 labelStyle={styles.thelabel}
				 leftIcon={
					<Ionicons
							name={icon}
							size={18}
					/>
				 }
			//onChangeText={value => defineUsername(value)}
			/>
	)
}

const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="arrow-forward-outline"
          color={'white'}
          size={24}
          //style={{ backgroundColor: color.primary }}
        />
      </View>
    );
  };
const _renderPrevButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="arrow-back-outline"
          color={'white'}
          size={24}
          //style={{ backgroundColor: color.primary }}
        />
      </View>
    );
  };
const _keyExtractor = (item, index) => index.toString()

const  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color={'white'}
          size={24}
          //style={{ backgroundColor: color.primary }}
        />
      </View>
    );
  };

export default function RegisterScreen({navigation}){

	const [date, setDate] = useState(new Date());
	const [selectedZone, setSelectedZone] = useState();
	const [nom, setNom] = useState("");
	const [prenom, setPrenom] = useState("");
	const [dateNaiss, setDateNaiss] = useState();
	const [lieu, setLieu] = useState("");
	const [email, setEmail] = useState("");
	const [telephone1, setTelephone1] = useState();
	const [telephone2, setTelephone2] = useState();
	const [dateAdhesion, setDateAdhesion] = useState();
	const [genre, setGenre] = useState();
	const [zone, setZone] = useState();
	const [nomPere, setNomPere] = useState();
	const [nomMere, setNomMere] = useState();
	const [mati, setMatri] = useState();
	const [region, setRegion] = useState();
	const [departement, setDepartement] = useState();
	const [arrondis, setArrondis] = useState();
	const [ville, setVille] = useState();
	const [nbreEnfant, setNbreEnfant] = useState();
	const [statutPro, setStatutPro] = useState();
	const [professsion, setProfesssion] = useState();
	const [domaine, setDomaine] = useState();
	const [employeur, setEmployeur] = useState();
	const [dernierDiplome, setDernierDiplome] = useState();
	const [etabliss, setEtabliss] = useState();
	const [classeNiveau, setClasseNiveau] = useState();
	const [serieFiliere, setSerieFilière] = useState();
	const [statutParoi, setstatutParoi] = useState();
	const [malade, setMalade] = useState();
	const [groupes, setGroupes] = useState([]);
	const [chretienCom, setChretienCom] = useState();
	const [membreGroupe, setMembreGroupe] = useState();
	const [showRealApp, modOfShowRealApp] = useState(false);

	const [lesZones, setLesZones] = useState([]);
	const [zonesGroupes, setZonesGroupes] = useState([]);
	const [lesRegions, setLesRegions] = useState([]);
	const [lesDepartements, setLesDepartements] = useState([]);
	const [lesArrondis, setLesArrondis] = useState([]);
	const [pick1, setShowPic1] = useState(false);
	const [pick2, setShowPic2] = useState(false);

	const [loading, setLoan] = useState(false);
	var [deptm, setDeptm] = useState();
	var [changeView1, setChangeView1] = useState(1);

	const checked = false;
	const sexe = [
		{
			label: "Masculin"
		},
		{
			label: "Féminin"
		}
	];
	const ismalade = [
		{
			label: "Oui",
			value: true
		},
		{
			label: "Non",
			value: false
		}
	]

	const communuant = [
		{
			label: "Oui",
			value: true
		},
		{
			label: "Non",
			value: false
		}
	]

	const membre = [
		{
			label: "Oui",
			value: true
		},
		{
			label: "Non",
			value: false
		}
	]

	const showToast = (message) => {
		ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.TOP);
	  };


	const checkForm = (slideNumber) => {
		var regexp = new RegExp(/\S+@\S+\.\S+/);
		var err = '';
		if (slideNumber == 1) {
      if (!nom) {
        err = 'Le nom est requis';
      } else if (!prenom) {
        err = 'Le prenom est requis';
      } 
      // else if (!this.credentials.datenaiss) {
      //   err = 'La date de naissance est requise';
      // } 
      else if (!lieu) {
        err = 'Le lieu de naissance est requis';
      } else if (!telephone1) {
        err = 'Le numéro de telephone est requis';
      } else if (!email) {
        err = 'L\'email est requis';
      } else if (!regexp.test(email)) {
        err = 'L\'email n\'est pas conforme';
      } 
    } else if (slideNumber == 2){
      if (!nomPere) {
        err = 'Le nom du père est requis';
      } else if (!nomMere) {
        err = 'Le nom de la mère est requis';
      } else if (!mati) {
        err = 'La situation matrimoniale est requise';
      } else if (!region) {
        err = 'La region d\'origine est requise';
      } else if (!departement) {
        err = 'Le departement est requis';
      } else if (!arrondis) {
        err = 'L\'arrondissement est requis';
      } else if (!ville) {
        err = 'La ville est requise';
      } 
      // else if (this.credentials.nbreEnfant == null) {
      //   err = 'Le nombre d\'enfants est requis';
      // } 
    } else if(slideNumber == 3) {
      if (!statutPro) {
        err = 'L\'activité est requise';
      } else {
        if(statutPro == "Etudiant/Elève") {
          if (!etabliss) {
            err = 'L\'etablissement est requis';
          } else if (!serieFiliere) {
            err = 'La Serie ou Filière est requise';
          } else if (!classeNiveau) {
            err = 'La classe ou niveau est requis';
          } else if (!statutParoi) {
            err = 'Le statut paroisial est requis';
          } 
          // else if (!this.credentials.malade) {
          //   err = 'Veuillez selectionner oui ou non';
          // } else if (!this.credentials.communiant) {
          //   err = 'Veuillez selectionner oui ou non';
          // } else if (!this.credentials.membre) {
          //   err = 'Veuillez selectionner oui ou non';
          // }
        } else if (statutPro == "Travailleur" || statutPro == "Activité Libérale") {
          if (!professsion) {
            err = 'La profession est requise';
          } else if (!employeur) {
            err = 'L\'employeur est requis';
          } else if (!dernierDiplome) {
            err = 'Le dernier diplôme est requis';
          } else if (!domaine) {
            err = 'Le domaine est requis';
          } else if (!statutParoi) {
            err = 'Le statut paroisial est requis';
          } 
          // else if (!this.credentials.malade) {
          //   err = 'Veuillez selectionner oui ou non';
          // } else if (!this.credentials.communiant) {
          //   err = 'Veuillez selectionner oui ou non';
          // } else if (!this.credentials.membre) {
          //   err = 'Veuillez selectionner oui ou non';
          // }
        } else if (statutPro == "Sans emploi") {
          if (!dernierDiplome) {
            err = 'Le dernier diplôme est requis';
          } else if (!statutParoi) {
            err = 'Le statut paroisial est requis';
          } 
          // else if (!this.credentials.malade) {
          //   err = 'Veuillez selectionner oui ou non';
          // } else if (!this.credentials.communiant) {
          //   err = 'Veuillez selectionner oui ou non';
          // } else if (!this.credentials.membre) {
          //   err = 'Veuillez selectionner oui ou non';
          // }
        }
      } 
	}
	if (err.length) {
		showToast(err);
		return false;
	} else {
		return true;
	}
	}

	const createFidele =  async() => {
		console.log('ENregistrement!!!!!');
		// try {
			if(!loading){
				var fidele = {
					"nom": nom,
					"prenom": prenom,
					"datenaiss": dateNaiss,
					"lieunaiss": lieu,
					"sexe": genre,
					"cni": "",
					"code": "",
					"telephone": telephone1,
					"telephone2": telephone2,
					"email": email,
					"adresse": "",
					"status": statutParoi,
					"dateInscription": dateAdhesion,
					"profession": professsion,
					"nomPere": nomPere,
					"nomMere": nomMere,
					"domaine": domaine,
					"dernierDiplome": dernierDiplome,
					"statusPro": statutPro,
					"employeur": employeur,
					"regionOrigine": region,
					"departementOrigine": departement,
					"villeOrigine": ville,
					"arrondissementOrigine": arrondis,
					"etablissement": etabliss,
					"classeNiveau": classeNiveau,
					"serieFiliere": serieFiliere,
					"situationMatrimoniale": mati,
					"nbreEnfant": nbreEnfant,
					"grade": "",
					zone: "",
					"deleted": false,
					"isactif": false,
					"isMalade": malade,
					"isDefault": true,
					"groupes": []
						}
				setLoan(true)
				 profil.createPersonne(fidele).then(() => {
					setLoan(false)
					showToast('Enregistrement terminé avec succès');
					navigation.navigate('Login');
				 }).catch(() => showToast("Erreur d'enregistrement"));
			}
		// } catch (e) {
		// 	console.log('error==>>',e)
		// } finally {

		// }
   }


	  useEffect(() => {
        (async()  => {
			var zn = await params.getAll();
			var reg = await params.getAll2();
			setLesRegions(reg);
			setZonesGroupes(zn[2]);
			setLesZones(zn[0]);
			console.log('ZOnes:', zn[0]);
			console.log('Groupes:', zn[2]);
			console.log('Regions:', reg);
        })();
        return;
      }, [])

	const slide1 =
		<ScrollView contentContainerStyle={{flexGrow:1}}>
			<View style={styles.container}>
				<View style={styles.top}>
					<Header text="Créer un compte"/>
					<View style={styles.form}>
						<View style={styles.input}>
							<Input placeholder="Votre nom"labelStyle={styles.thelabel} label="Nom(s) de Famille" value={nom}
                        	onChangeText={value => setNom(value)} leftIcon={
							<Ionicons
								name={"person"}
								size={18}
							/>
						   }/>

							<Input placeholder="Prénom(s)"labelStyle={styles.thelabel} label="Prénom(s)" value={prenom}
							onChangeText={value => setPrenom(value)} leftIcon={
							<Ionicons
								name={"person"}
								size={18}
							/>
						   }/>

							<Input placeholder="Date de naissance" labelStyle={styles.thelabel} label="Date de naissance" value={dateNaiss}
							onChangeText={value => setDateNaiss(value)} leftIcon={
							<Ionicons
								name={"calendar"}
								size={18}
							/>
						   }
						   value={dateNaiss ? new Date(dateNaiss).toISOString().split("T")[0] :  new Date().toISOString().split("T")[0]}
                            // onChangeText={value => setDate(value)}
                            onFocus = {()=>setShowPic1(true)}/>

							<DateTimePickerModal
								testID="dateTimePicker"
								display={"calendar"}
								isVisible={pick1}
								date={dateNaiss ? new Date(dateNaiss) :  new Date()}
								onConfirm={(ChooseDate)=>{setShowPic1(false); setDateNaiss(ChooseDate); console.log("choosen date:", ChooseDate);}}
								onCancel={()=>setShowPic1(false)}
							/>

						   <Input placeholder="Lieu" labelStyle={styles.thelabel} label="Lieu de Naissance" value={lieu}
							onChangeText={value => setLieu(value)} leftIcon={
							<Ionicons
								name={"locate"}
								size={18}
							/>
						   }/>

							<Input placeholder="Email" labelStyle={styles.thelabel} label="Votre adresse email" value={email}
							onChangeText={value => setEmail(value)} leftIcon={
							<Ionicons
								name={"mail"}
								size={18}
							/>
						   }/>
							
							<Input
	                           placeholder="Numéro 1"
	                           label="Votre numéro de Téléphone"
							   labelStyle={styles.thelabel}
							   onChangeText={value => setTelephone1(value)}
							   value={telephone1}
	                           leftIcon={
	                            <Ionicons
	                                name={"call"}
	                                size={18}
	                            />
	                           }
	                        //    onChangeText={value => defineUsername(value)}
	                        />

							<Input
	                           placeholder="Numéro 2"
	                           label="Autre numéro de Téléphone"
							   labelStyle={styles.thelabel}
							   onChangeText={value => setTelephone2(value)}
							   value={telephone2}
	                           leftIcon={
	                            <Ionicons
	                                name={"call"}
	                                size={18}
	                            />
	                           }
	                        //    onChangeText={value => defineUsername(value)}
	                        />

							<Input
	                           placeholder="Date d'Adhésion"
	                           label="Date d'Adhésion"
							   labelStyle={styles.thelabel}
							   value={dateAdhesion}
							   onChangeText={value => setDateAdhesion(value)}
	                           leftIcon={
	                            <Ionicons
	                                name={"calendar"}
	                                size={18}
	                            />
	                           }
							   value={dateAdhesion ? new Date(dateAdhesion).toISOString().split("T")[0] :  new Date().toISOString().split("T")[0]}
							   // onChangeText={value => setDate(value)}
							   onFocus = {()=>setShowPic2(true)}/>
   
							   <DateTimePickerModal
								   testID="dateTimePicker"
								   display={"calendar"}
								   isVisible={pick2}
								   date={dateAdhesion ? new Date(dateAdhesion) :  new Date()}
								   onConfirm={(ChooseDate)=>{setShowPic2(false); setDateAdhesion(ChooseDate); console.log("choosen date:", ChooseDate);}}
								   onCancel={()=>setShowPic2(false)}
							   />
							<Text style={styles.label}>
	                    			Votre genre
	                    	</Text>
							<RadioButtonRN
                            data={sexe}
                            selectedBtn={(e) => {console.log(e); setGenre(e.label);}}
                            />

						<Text style={styles.label}>
	                    			Zone d'habitation
	                    	</Text>
						<Picker
						selectedValue={zone}
						onValueChange={(itemValue, itemIndex) =>
							setZone(itemValue)
						}>
						{
							lesZones.map((l,i) => (
								<Picker.Item key={i} label={l.nom} value={l.nom} />
								))
						}
						</Picker>
						</View>
	                       <View style={styles.button}>
	                     	<Button
							  title="Suivant"
							  onPress={()=>{if (checkForm(1)) {
								//   setTheSlide(slide2);
								//   AppIntroSlider.goToSlide(2);
								setChangeView1(2);
							  };}}
							/>
	                    </View>
	                    <View style={styles.end}>
	                    	<TouchableOpacity style={styles.links}>
	                    		<Text style={themes.secondary}>
	                    			Avez-vous déjà un compte?
	                    		</Text>
	                    	</TouchableOpacity>
	                    	<TouchableOpacity style={styles.links}
	                    		onPress={()=>navigation.navigate('Login')}
	                    	>
	                    		<Text style={themes.primary}>Connexion</Text>
	                    	</TouchableOpacity>
	                    </View>
					</View>
				</View>
			</View>
		</ScrollView>
  ;

  const slide2 = [
	<ScrollView contentContainerStyle={{flexGrow:1}} key={1}>
	<View style={styles.container}>
		<View style={styles.top}>

			<Header text="État Civil"/>
			<View style={styles.form}>
				<View style={styles.input}>
					<Input
					placeholder="Père"
					label="Nom(s) du Père"
					labelStyle={styles.thelabel}
					onChangeText={value => {setNomPere(value); console.log('Pere:', value)}}
					value={nomPere}
					leftIcon={
						<Ionicons
							name={"man"}
							size={18}
						/>
					}
					//    onChangeText={value => defineUsername(value)}
					/>

					<Input
					placeholder="Mère"
					label="Nom(s) de la Mère"
					labelStyle={styles.thelabel}
					onChangeText={value => setNomMere(value)}
					value={nomMere}
					leftIcon={
						<Ionicons
							name={"woman"}
							size={18}
						/>
					}
					//    onChangeText={value => defineUsername(value)}
					/>

					<Text style={styles.label}>
								Situation Matrimoniale
					</Text>
					<Picker
					selectedValue={mati}
					onValueChange={(itemValue, itemIndex) =>
						setMatri(itemValue)
					}>
					<Picker.Item label="Célibataire" value="celibataire" />
					<Picker.Item label="Marié(e)" value="marie" />
					<Picker.Item label="Fiancé(e)" value="fiance" />
					<Picker.Item label="Divorcé(e)" value="divorce" />
					</Picker>

					<Text style={styles.label}>
								Region d'Origine
					</Text>
					<Picker
					selectedValue={region}
					onValueChange={(itemValue, itemIndex) =>
						{setRegion(itemValue['@id']); setLesDepartements(itemValue.departements); console.log('Regions: ', lesDepartements)}
					}>
						{
							lesRegions.map((l,i) => (

							<Picker.Item key={i} label={l.nom} value={l} />
							))
						}
					</Picker>

					<Text style={styles.label}>
								Département d'origine
					</Text>
					<Picker
					selectedValue={departement}
					onValueChange={(itemValue, itemIndex) =>
						{setDepartement(itemValue['@id']); setLesArrondis(itemValue.arrondissements);}
					}>
						{
							lesDepartements.map((l,i) => (

							<Picker.Item key={i} label={l.nom} value={l} />
							))
						}
					</Picker>

					<Text style={styles.label}>
								Arrondissement d'origine
					</Text>
					<Picker
					selectedValue={arrondis}
					onValueChange={(itemValue, itemIndex) =>
						setArrondis(itemValue)
					}>
						{
							lesArrondis.map((l,i) => (

							<Picker.Item key={i} label={l.nom} value={l['@id']} />
							))
						}
					</Picker>

					<Input
					placeholder="Ville"
					label="Ville de Résidence"
					labelStyle={styles.thelabel}
					value={ville}
					onChangeText={value => setVille(value)}
					leftIcon={
						<Ionicons
							name={"location"}
							size={18}
						/>
					}
					//    onChangeText={value => defineUsername(value)}
					/>

					<Input
					placeholder="Combien d'enfants avez vous?"
					label="Nombre d'enfants"
					labelStyle={styles.thelabel}
					onChangeText={value => setNbreEnfant(value)}
					value={nbreEnfant}
					leftIcon={
						<Ionicons
							name={"people"}
							size={18}
						/>
					}
					//    onChangeText={value => defineUsername(value)}
					/>

				</View>
				<View style={styles.button}>
					<Button
					title="Suivant"
					onPress={()=>{if (checkForm(2)) {
						setChangeView1(3);
					  //   AppIntroSlider.goToSlide(2);
					};}}
					/>
				</View>
				<View style={styles.end2}>
				</View>
			</View>
		</View>
	</View>
	</ScrollView>
  ];

  const slide3 = [
	<ScrollView contentContainerStyle={{flexGrow:1}} key={1}>
	<View style={styles.container}>
		<View style={styles.top}>
			<Header text="Statut professionnel et paroissial"/>
			<View style={styles.form}>
				<View style={styles.input}>

					<Text style={styles.label}>
					Statut Professionnel:
					</Text>
					<Picker
					selectedValue={statutPro}
					onValueChange={(itemValue, itemIndex) =>
						setStatutPro(itemValue)
					}>
					<Picker.Item label="Sans emploi" value="Sans emploi" />
					<Picker.Item label="Etudiant/Elève" value="Etudiant/Elève" />
					<Picker.Item label="Travailleur" value="Travailleur" />
					<Picker.Item label="Activité Libérale" value="Activité Libérale" />
					</Picker>
					{
						(statutPro == "Etudiant/Elève")?
						<View>
							<Input
							placeholder="Quel Etablissement fréquentez-vous?"
							label="Etablissement:"
							labelStyle={styles.thelabel}
							onChangeText={value => setEtabliss(value)}
							value={etabliss}
							leftIcon={
								<Ionicons
									name={"business"}
									size={18}
								/>
							}
							//    onChangeText={value => defineUsername(value)}
							/>

							<Input
							placeholder="Quelle est votre Serie/Filière?"
							label="Serie/Filiere:"
							labelStyle={styles.thelabel}
							onChangeText={value => setSerieFilière(value)}
							value={serieFiliere}
							leftIcon={
								<Ionicons
									name={"bulb"}
									size={18}
								/>
							}
							//    onChangeText={value => defineUsername(value)}
							/>

							<Input
							placeholder="Quelle Classe/Niveau faitez-vous?"
							label="Classe/Niveau:"
							labelStyle={styles.thelabel}
							onChangeText={value => setClasseNiveau(value)}
							value={classeNiveau}
							leftIcon={
								<Ionicons
									name={"school"}
									size={18}
								/>
							}
							//    onChangeText={value => defineUsername(value)}
							/>

						</View> :
						(statutPro == "Travailleur" || statutPro == "Activité Libérale")?
						<View>
							<Input
							placeholder="Que faites-vous dans la vie?"
							label="Profession:"
							labelStyle={styles.thelabel}
							onChangeText={value => setProfesssion(value)}
							value={professsion}
							leftIcon={
								<Ionicons
									name={"build"}
									size={18}
								/>
							}
							//    onChangeText={value => defineUsername(value)}
							/>

							<Input
							placeholder="Dans quel secteur d'activité?"
							label="Domaine:"
							labelStyle={styles.thelabel}
							onChangeText={value => setDomaine(value)}
							value={domaine}
							leftIcon={
								<Ionicons
									name={"bulb"}
									size={18}
								/>
							}
							//    onChangeText={value => defineUsername(value)}
							/>

							<Input
							placeholder="Qui vous emploi?"
							label="Employeur:"
							labelStyle={styles.thelabel}
							onChangeText={value => setEmployeur(value)}
							value={employeur}
							leftIcon={
								<Ionicons
									name={"business"}
									size={18}
								/>
							}
							//    onChangeText={value => defineUsername(value)}
							/>

							<Input
							placeholder="Dernier diplôme obtenu"
							label="Dernier Diplôme:"
							labelStyle={styles.thelabel}
							onChangeText={value => setDernierDiplome(value)}
							value={dernierDiplome}
							leftIcon={
								<Ionicons
									name={"library"}
									size={18}
								/>
							}
							//    onChangeText={value => defineUsername(value)}
							/>
						</View>:
						<View>
							<Input
							placeholder="Dernier diplôme obtenu"
							label="Dernier Diplôme:"
							labelStyle={styles.thelabel}
							onChangeText={value => setDernierDiplome(value)}
							value={dernierDiplome}
							leftIcon={
								<Ionicons
									name={"library"}
									size={18}
								/>
							}
							//    onChangeText={value => defineUsername(value)}
							/>
						</View>
					}


					<Text style={styles.label}>
						Statut Paroissiale:
						</Text>
						<Picker
						selectedValue={statutParoi}
						onValueChange={(itemValue, itemIndex) =>
							setstatutParoi(itemValue)
						}>
						<Picker.Item label="FIDELE" value="FIDELE" />
						<Picker.Item label="ANCIEN" value="ANCIEN" />
						<Picker.Item label="ANCIEN HONORAIRE" value="ANCIEN HONORAIRE" />
						<Picker.Item label="CONSEILLER" value="CONSEILLER" />
						<Picker.Item label="DIACRE" value="DIACRE" />
						<Picker.Item label="MONITEUR" value="MONITEUR" />
						<Picker.Item label="DIASPORA" value="DIASPORA" />
						<Picker.Item label="CATECHUMENE" value="CATECHUMENE" />
						<Picker.Item label="CULTE D'ENFANT" value="CULTE D'ENFANT" />
						<Picker.Item label="PERSONNEL EMPLOYE" value="PERSONNEL EMPLOYE" />
					</Picker>

					<Text style={styles.label}>
							Malade ?
					</Text>
					<RadioButtonRN
					data={ismalade}
					selectedBtn={(e) => {console.log(e); setMalade(e.value);}}
					/>


					<Text style={styles.label}>
					Chrétien Communiant ?
					</Text>
					<RadioButtonRN
					data={communuant}
					selectedBtn={(e) => {console.log(e); setChretienCom(e.value);}}
					/>

					<Text style={styles.label}>
					Membre de Groupe ?
					</Text>
					<RadioButtonRN
					data={membre}
					selectedBtn={(e) => {console.log(e); setMembreGroupe(e.label); }}
					/>
					{
						(membreGroupe)?
						<Picker
					selectedValue={groupes}
					onValueChange={(itemValue, itemIndex) =>
						setGroupes([itemValue])
					}>
						{
							zonesGroupes.map((l,i) => (

							<Picker.Item key={i} label={l.nom} value={l['@id']} />
							))
						}
					</Picker>:
						<View></View>
					}
				   </View>
				   <View style={styles.button}>
	
					<Button
						title="Terminer"
						mode="contained"
						color={color.primary}
						loading={loading}
						onPress={()=>{
							if (checkForm(3)) {
								createFidele().then( value => {
									console.log(value);
								}, error => console.log(error));
							//   AppIntroSlider.goToSlide(2);
						  }
							}}
					/>
				</View>
				<View style={styles.end2}>
				</View>
			</View>
		</View>
	</View>
</ScrollView>
  ];

	const [theSlide, setTheSlide] = useState(slide1);

	  const _renderItem = ({ item }) => {
			return ( item	);
	  }
	  const _onDone = () => {
			modOfShowRealApp(true);
	  }


	  
	return (
		(changeView1 == 1)? slide1: (changeView1==2)? slide2: slide3
	);
}

const styles = StyleSheet.create({
	container: {
	  paddingHorizontal: wp('8%'),
	  flex: 1
	},
	end: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: hp('2.5%')
	},
	end2: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: hp('7%')
	},
	links : {
		marginBottom: hp('2%')
	},
	penser: {
		fontStyle: 'italic',
		marginTop: hp('2%'),
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
	},
	mt: {
		marginTop: hp('1%')
	},
	bottom: { marginTop: hp('2%')},
	logo: {
		justifyContent: 'center',
	  alignItems: 'center',
	},
	img: {
		width: wp("23%"),
		height: hp("11%")
	},
	top: { marginTop: hp('3%') },
	subtitle: { fontSize: 17 },
	form: { marginTop: hp('2%') },
	input: {
		marginLeft: -10,
		marginTop: hp('3%')
	},
	thelabel: {
		fontSize: 15,
		color: "#0866C6"
	},
	label: {
		fontSize: 15,
		color: "#0866C6",
		marginLeft: 8,
		fontWeight: 'bold'
	},
	buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: color.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
  },
  });
