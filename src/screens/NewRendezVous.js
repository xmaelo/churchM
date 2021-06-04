import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo, bible} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button, ListItem } from 'react-native-elements';
import { themes, color } from '../color';
import Head from '../components/Head';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { profil } from '../statefull/profil';
import { rendezvous } from '../statefull/rendezvous';
import { RadioButton } from 'react-native-paper/lib/typescript/components/RadioButton/RadioButton';
import RadioButtonRN from 'radio-buttons-react-native';
import { user } from '../statefull/query';

export default function NewRendezVous({navigation}) {
	const [selectedPasteur, setSelectedPasteur] = useState("");
    const [date, setDate] = useState();
    const [pick1, setShowPic1] = useState(false)
    const [pasteurs, setPast] = useState([]);
    const [raison, setRaison] = useState("");
    const [horaire, setHoraire] = useState([]);
    const [hourVal, setHourVal] = useState("");

    const createRdv = (heure) => {
        try {
            var monRdv = {
                demandeur: "",
                responsable: "",
                etat: "EN ATTENTE",
                raison: "",
                date: "",
                heure: "",
                timechange: false,
                datechange: false
            };
            monRdv.responsable = selectedPasteur;
            monRdv.raison = raison;
            monRdv.date = date.toISOString();
            monRdv.heure = heure
          monRdv.demandeur = '/api/personnes/'+user.getUserId();
          console.log('RENDEZ-VOUS:', monRdv);
            rendezvous.create(monRdv).then(resp =>{ 
              console.log('>>>> Reponse', resp);
            },error => {console.warn(error);});
            // this.segmentModel = 'all';
        } catch (error) {
          console.warn(error);
        }
      }

    const onChangeDat = async (data) => {
        var days = ['DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI'];
        var d = new Date(data);
        var dayName = days[d.getDay()];
        console.log('Name Of Day:', dayName);
        var hour = [];
        // var planning = [];
        rendezvous.getPlanning(selectedPasteur.split('/')[3], dayName).then(planning => {
            // setTimeout(() => {
                console.log('Planning:', planning);
          if (planning.length == 0) {
              hour = [];
              setHoraire(hour);
            console.log('Le Pasteur n\'est pas disponible ce jour');
            console.log('Planning:', planning);
          } else {
              planning.forEach(plan => {
                hour.push({label: plan.debut+" - "+plan.fin, value: plan.debut});                  
              });
              setHoraire(hour);
              console.log("Horaire", horaire)
              hour = [];
          }
            // }, 5000);
        });
      }

    useEffect(() => {
        (async()  => {
          let pasto = await profil.getAllUser('PASTEUR');
                setPast(pasto)
                // console.log("Pasteurs: ", pasto)
        })();
        return;
      }, [])
    
    return (
        <View style={{ flex: 1}}>
			<Head screen={"Nouveau Rendez-Vous"} n={navigation} second/>
            <View>
                <Text style={{textAlign: 'center', fontSize: 23, marginBottom: wp("5%")}}>Prendre un Rendez-Vous</Text>
                <View>
                    <View style={styles.horizontal}>
                        <Text style={styles.label}>
                                    Pasteur:
                        </Text>
                        <Picker style={{width: wp("65%")}}
                            mode="dropdown"
                            selectedValue={selectedPasteur}
                            onValueChange={(itemValue, itemIndex) => {
                                console.log('Pasteur: ', itemValue);
                                setSelectedPasteur(itemValue)
                            }          
                            }>
                                {
                                    pasteurs.map((pasteur, i) => {
                                        return (<Picker.Item key={i} label={pasteur.nom+"   "+pasteur.prenom} value={pasteur['@id']} />)
                                    }) 
                                }
                            {/* <Picker.Item label="Jean Bolveng" value="Jean Bolveng" />
                            <Picker.Item label="Tonga Georges" value="Tonga Georges" />
                            <Picker.Item label="Bikat Stephane" value="Bikat Stephane" />
                            <Picker.Item label="Faro Faro" value="Faro Faro" /> */}
                        </Picker>
                    </View>
                    <View>
                        <Input
                            placeholder="Choisissez une date"
                            label="Date:"
                            labelStyle={styles.thelabel}
                            leftIcon={
                            <Ionicons
                                name={"calendar"}
                                size={18}
                            />
                            }
                            value={date ? new Date(date).toISOString().split("T")[0] :  new Date().toISOString().split("T")[0]}
                            // onChangeText={value => setDate(value)}
                            onFocus = {()=>setShowPic1(true)}
                        />
                        <DateTimePickerModal
                            testID="dateTimePicker"
                            display={"calendar"}
                            isVisible={pick1}
                            date={date ? new Date(date) :  new Date()}
                            onConfirm={(ChooseDate)=>{setShowPic1(false); setDate(ChooseDate); console.log("choosen date:", ChooseDate); onChangeDat(ChooseDate);}}
                            onCancel={()=>setShowPic1(false)}
                        />
                    </View>

                    {
                        (horaire.length != 0)?
                        <View>
                            <Text style={{marginLeft: 10}}>Selectionner la tranche horaire</Text>
                            <RadioButtonRN
                            data={horaire}
                            selectedBtn={(e) => {console.log(e); setHourVal(e.value);}}
                            />
                        </View>: 
                        <View>
                            <Text style={{marginLeft: 10}}>Aucune tranche horaire disponible</Text>
                        </View>
                    }

                    <Input
                        placeholder="Quel problème avez-vous?"
                        label="Raison:"
                        labelStyle={styles.thelabel}
                        leftIcon={
                        <Ionicons
                            name={"document-text"}
                            size={18}
                        />
                        }
                        value={raison}
                        onChangeText={value => setRaison(value)}
                        multiline={true}
                        numberOfLines={3}
                    />

                    <View>
						<Button
						title="Demander"
                        onPress={()=> {
                            createRdv(hourVal);
                            // goBack();
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Rendezvous' }],
                              });
                    }}
						/>
					</View>
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
    label: {
		fontSize: 15,
		color: "#0866C6",
		marginLeft: 8,
        fontWeight: 'bold',
        marginTop: 'auto', 
        marginBottom: 'auto'
    },
    horizontal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    thelabel: {
		fontSize: 15,
		color: "#0866C6"
	},
})