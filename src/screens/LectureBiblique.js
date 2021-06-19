import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calendar, bible} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button, ListItem } from 'react-native-elements';
import { themes } from '../color';
import Head from '../components/Head';
import { useTranslation } from 'react-i18next';

export default function LectureBiblique({navigation}){
	const {t} = useTranslation();
	const [tabVerset, setTabVerset] = useState([]);
	const dateDay = (data) => {
		var days = [t("common.app.sunday"), t("common.app.monday"), t("common.app.tuesday"), t("common.app.wednesday"), t("common.app.thursday"), t("common.app.friday"), t("common.app.saturday")];
        var d = new Date(data);
        var dayName = days[d.getDay()];
		// console.log('Name Of Day:', dayName);
		return dayName;
	}

	const normDate = (date) => {
		var a, b, c;
		var d = [] = date.split('-');
		a = d[0];
		b = d[1];
		c = d[2];
		return c + '/' + b + '/' + a;
	}

	useEffect(() => {
		(async () => {
			var tab = [];
			for (let i = 0; i < calendar.jours.length; i++) {
				var dat = dateDay(calendar.jours[i].jour);
				var dat2 = calendar.jours[i].jour.split('T')[0];
				var datNow = new Date(Date.now()).toISOString().split("T")[0];
				console.log(datNow);
				if (dat == t("common.app.monday") && dat2 == datNow) {
					tab.push(calendar.jours[i])
					tab.push(calendar.jours[i+1])
					tab.push(calendar.jours[i+2])
					tab.push(calendar.jours[i+3])
					tab.push(calendar.jours[i+4])
					tab.push(calendar.jours[i+5])
					tab.push(calendar.jours[i+6])
				} else if (dat == t("common.app.tuesday") && dat2 == datNow) {
					tab.push(calendar.jours[i-1])
					tab.push(calendar.jours[i])
					tab.push(calendar.jours[i+1])
					tab.push(calendar.jours[i+2])
					tab.push(calendar.jours[i+3])
					tab.push(calendar.jours[i+4])
					tab.push(calendar.jours[i+5])
				} else if (dat == t("common.app.wednesday") && dat2 == datNow) {
					tab.push(calendar.jours[i-2])
					tab.push(calendar.jours[i-1])
					tab.push(calendar.jours[i])
					tab.push(calendar.jours[i+1])
					tab.push(calendar.jours[i+2])
					tab.push(calendar.jours[i+3])
					tab.push(calendar.jours[i+4])

				} else if (dat == t("common.app.thursday") && dat2 == datNow) {
					tab.push(calendar.jours[i-3])
					tab.push(calendar.jours[i-2])
					tab.push(calendar.jours[i-1])
					tab.push(calendar.jours[i])
					tab.push(calendar.jours[i+1])
					tab.push(calendar.jours[i+2])
					tab.push(calendar.jours[i+3])
				} else if (dat == t("common.app.friday") && dat2 == datNow) {
					tab.push(calendar.jours[i-4])
					tab.push(calendar.jours[i-3])
					tab.push(calendar.jours[i-2])
					tab.push(calendar.jours[i-1])
					tab.push(calendar.jours[i])
					tab.push(calendar.jours[i+1])
					tab.push(calendar.jours[i+2])
				} else if (dat == t("common.app.saturday") && dat2 == datNow) {
					tab.push(calendar.jours[i-5])
					tab.push(calendar.jours[i-4])
					tab.push(calendar.jours[i-3])
					tab.push(calendar.jours[i-2])
					tab.push(calendar.jours[i-1])
					tab.push(calendar.jours[i])
					tab.push(calendar.jours[i+1])
				} else if (dat == t("common.app.sunday") && dat2 == datNow) {
					tab.push(calendar.jours[i-6])
					tab.push(calendar.jours[i-5])
					tab.push(calendar.jours[i-4])
					tab.push(calendar.jours[i-3])
					tab.push(calendar.jours[i-2])
					tab.push(calendar.jours[i-1])
					tab.push(calendar.jours[i])
				}
			}
			console.log('New versets: ', tab);
			setTabVerset(tab);
            // setAllBooks(tab);
		})();
        return;
      }, [])

	return(
		<View style={{ flex: 1}}>
			<Head screen={t('common.app.lecture_biblic')} n={navigation}/>
			<ImageBackground source={bible}
			style={{
				height: '100%',
				width: '100%',
				position: 'relative',
				top: 0,
				left: 0
			}}>
				<ScrollView style={{ flex: 1}}>
					<View style={{backgroundColor: 'transparent'}}>
					{
						tabVerset.map((l, i) => (
						<ListItem key={i} bottomDivider onPress={()=>navigation.navigate('DetailLecture', {param: l, day: normDate(l.jour.split("T")[0])})}>
							<ListItem.Content>
							<View style={styles.textStyle}>
								<View style={styles.date}>
									<Text>{dateDay(l.jour)}</Text>
									<Text>{normDate(l.jour.split("T")[0])}</Text>
								</View>
								<View style={{marginLeft: 150}}>
									{
										l.passages && l.passages.map(el => <Text>{t('common.bible.'+el.livre)} {el.chapitre}. {(el.verset_debut != 0)?el.verset_debut +" - "+el.verset_fin:"" }</Text>)
									}
								</View>
							</View>
<<<<<<< HEAD
							{/* <ListItem.Title>{l.title}</ListItem.Title> */}
							{/* <ListItem.Subtitle>{l.description}</ListItem.Subtitle> */}
							</ListItem.Content>
						</ListItem>
						))
					}
					</View>
=======
							<View style={{marginLeft: 150}}>
								{
									l.passages && l.passages.map((el, k) => <Text key={k}>{t('common.bible.'+el.livre)} {el.chapitre}. {(el.verset_debut != 0)?el.verset_debut +" - "+el.verset_fin:"" }</Text>)
								}
							</View>
						</View>
						{/* <ListItem.Title>{l.title}</ListItem.Title> */}
						{/* <ListItem.Subtitle>{l.description}</ListItem.Subtitle> */}
						</ListItem.Content>
					</ListItem>
					))
				}
>>>>>>> baaaf740e657dac458dd0f4c8b46fe75d5919ac0
				</ScrollView>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('8%'),
    flex: 1
  },
  textStyle: {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	},
	date: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	}
})
