import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Text, Input, Button } from 'react-native-elements';
import { themes, color } from '../color';
import Head from '../components/Head'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import {activite} from '../statefull/activites'
import { useTranslation } from 'react-i18next';
import {  Badge, Icon, withBadge } from 'react-native-elements'

export default function ActivitesDetails({route, navigation}){

const {t} = useTranslation();

const data = route.params?.act;






  return(
    <View>
      <Head screen={t('common.app.activity')} n={navigation} second/>
      <ScrollView>
        <View>
          <View>
              {/*<Image source={data.avatar_url} style={styles.img}/>*/}
              <View style={styles.content}>
                  <Text>{t('common.app.begin')}: </Text>
                  <Text>
                    {data.datedebut && new Date(data.datedebut).toUTCString()}
                  </Text>
              </View>
              <View style={styles.content}>
                  <Text>{t('common.app.end')}: </Text>
                  <Text>{data.datefin && new Date(data.datefin).toUTCString()}</Text>
              </View>
              <View style={{...styles.content, flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
                  <Text>{t('common.bible.part')}: </Text>
                  {data?.participant && data.participant.map((d, p)=>
                    <View key={p} style={{backgroundColor: color.primary, borderRadius: 20, padding: 3}}>
                      
                      <View key={p} style={{backgroundColor: color.primary, borderRadius: 20, padding: 3}}>
                      {d.groupe &&
                      <Text style={{color: 'white'}}>{d.groupe?.nom}</Text>
                      }{d.personne &&
                      <Text style={{color: 'white'}}>{d.personne?.nom}</Text>
                      }
                      {d.autre &&
                      <Text style={{color: 'white'}}>{d.autre}</Text>
                      }
                    </View>
                    </View>
                  )}
              </View>
              <View style={{...styles.content, flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
                  <Text>{t('common.app.resp')}: </Text>
                  {data?.responsables && data.responsables.map((d, p)=>
                    <View key={p} style={{backgroundColor: color.primary, borderRadius: 20, padding: 3}}>
                      {d.groupe &&
                      <Text style={{color: 'white'}}>{d.groupe?.nom}</Text>
                      }{d.personne &&
                      <Text style={{color: 'white'}}>{d.personne?.nom}</Text>
                      }
                      {d.autre &&
                      <Text style={{color: 'white'}}>{d.autre}</Text>
                      }
                    </View>
                  )}
              </View>
              <Text style={{textAlign: 'center', marginTop: hp("3px"),}}>{data.intitule}</Text>
              <Text style={{textAlign: 'center', marginTop: hp("3px"),}}>{data.description}</Text>
          </View>
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
    content: {
        marginLeft: hp("4px"),
        marginTop: hp("2px"),
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between'
    },
  h1: {fontSize: 18, fontWeight: 'bold', color: color.textSeconday},
  img: {
    width: wp("80%"),
    height: hp("40%"),
        borderRadius: wp('3px'),
        marginTop: hp("2px"),
        marginLeft: "auto",
        marginRight: "auto",
  },
  })


