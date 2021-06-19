import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler, FlatList } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Head from '../components/Head';
import {color } from '../color';
import { useTranslation } from 'react-i18next';
import { Card , Text} from 'react-native-elements';

export default function VersetBible({route, navigation}) {

    const {t} = useTranslation();
    const data = route.params.param
    const name = route.params.name
    return (
        <View style={{ flex: 1}}>
            <Head screen={t('common.bible.'+name)+' '+data.chapter} n={navigation} second/>
            <ScrollView>
                {
                    data.verses.map((l, i) => (
                        // <Card key={i} containerStyle={styles.cardStyle}>
                        //     <Card.Title h4> {t('common.app.verse')} {l.verse}</Card.Title>
                        //     <Card.Divider/>
                        //     <Text style={styles.text}>{l.text}</Text>
                        // </Card>
                        <Text key={i} style={{paddingLeft: 15, paddingRight: 15}}><Text style={{textDecorationLine: 'underline', fontStyle: 'italic', fontWeight: 'bold', color: color.primary}}>{t('common.app.verse')} {l.verse}:</Text> {l.text}</Text>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: wp('8%'),
      flex: 1
    },
    cardStyle: {
        // width: wp('17%'),
        borderRadius: wp('5px'),
        borderColor: color.primary
    }, 
    text: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 15
    }
})