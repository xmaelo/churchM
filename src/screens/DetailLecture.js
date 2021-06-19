import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {thebible} from "../assets"
import {kjbible} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button } from 'react-native-elements';
import { themes } from '../color';
import Head from '../components/Head'
import { useTranslation } from 'react-i18next';
import { NavigationActions } from 'react-navigation';
import { changedLang } from '../components/Lang';
export default function DetailLecture({route, navigation}){
    const {t} = useTranslation();
    const data = route.params?.param;
    const [lecture, setLecture] = useState([]);
    useEffect(() => {
      (async () => {
              var tab = [];
              var global = [];
              var selectedBible;
            if(changedLang)
              selectedBible = kjbible;
            else
              selectedBible = thebible;
              selectedBible.books.forEach(book => {book.name = book.name.replace(/ /g, '_')});
              selectedBible.books.forEach(book => {
                book.chapters.forEach(chapter => {
                  for (let i = 0; i < data.passages.length; i++) {
                      // console.log('Versets: ', book.name);
                    if(data.passages[i].livre == book.name ) {
                      if(data.passages[i].chapitre == chapter.chapter) {
                        var lect = {
                          livre: "",
                          chapitre: 0,
                          versets: []
                        }
                        lect.livre = data.passages[i].livre;
                        console.log('Versets: ', data.passages[i].livre);
                        lect.chapitre = data.passages[i].chapitre;
                        if(data.passages[i].verset_debut != 0) {
                          for (let j = data.passages[i].verset_debut -1; j < data.passages[i].verset_fin; j++) {
                            tab.push(chapter.verses[j]);
                          }
                          // lect.livre = data.passages[i].livre;
                          // lect.chapitre = data.passages[i].chapitre;
                        } else {
                          tab = chapter.verses;
                          // tab = chapter.verses;
                          // lect.livre = passages[i].livre;
                          // lect.chapitre = passages[i].chapitre;
                          // lect.versets = tab;
                      }
                      lect.versets = tab;
                       // global.push(lect);
                       console.log('Lectures:', lect);
                       global.push(lect);
                      tab = [];
                      }

                    }
                  }
                })
              });
              console.log('Versets: ', global);
              setLecture(global);
              // setAllBooks(tab);
      })();
          return;
        }, [data, changedLang])
	return(
    <View style={{ flex: 1}}>
      <Head screen={t('common.app.text_of')+' '+route.params?.day} n={navigation} second/>
  		<ScrollView>
  			<View>
  				{/* <Head screen={data.title} n={navigation}/> */}
                  {
                      lecture && lecture.map((el, k) =>
                          <View style={styles.texte} key={k}>
                              <Text style={styles.passage}>{t('common.bible.'+el.livre)} {el.chapitre}</Text>
                              <View style={styles.contenu}>
<<<<<<< HEAD
                                {el.versets.map(e => 
                                  <Text><Text style={{textDecorationLine: 'underline', fontStyle: 'italic', fontWeight: 'bold'}}>{t('common.app.verse')} {e.verse}:</Text> {e.text}</Text>)}
=======
                                {el.versets.map((e, i) =>
                                  <Text key={i}><Text style={{textDecorationLine: 'underline', fontStyle: 'italic', fontWeight: 'bold'}}>verset {e.verse}:</Text> {e.text}</Text>)}
>>>>>>> baaaf740e657dac458dd0f4c8b46fe75d5919ac0
                              </View>
                          </View>
                      )
                  }
  			</View>
  		</ScrollView>
    </View>
	)
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('8%'),
    flex: 1
  },
  texte: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      marginBottom: 20
  },
  passage: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 7
  },
  contenu: {
    paddingLeft: 15,
    paddingRight: 15,
  }
})
