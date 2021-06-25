import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler, FlatList } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Head from '../components/Head';
import {color } from '../color';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-native-elements';

const keyExtractor = (item, index) => index.toString()

export default function ChapBible({route, navigation}){
    const {t} = useTranslation();
    const data = route.params.param
    return (
        <View style={{ flex: 1}}>
            <Head screen={t('common.bible.'+data.name)} n={navigation} second/>
            <ScrollView>
                <FlatList
                data={data.chapters}
                numColumns={4}
                keyExtractor={keyExtractor}
                renderItem={({ item }) =>
                // <Text> {item.chapter}
                // </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('VersetBible', {param: item, name: data.name})}>
                    <Card containerStyle={styles.cardStyle}>
                        <Card.Title h4>{item.chapter}</Card.Title>
                    </Card>
                </TouchableOpacity>
                }
                />
                {/* {
                    data.chapters.map((l, i) => (
                        <TouchableOpacity onPress={()=>navigation.navigate('', {param: l})}>
                            <Card key={i}>
                                <Card.Title h4>{l.chapter}</Card.Title>
                            </Card>
                        </TouchableOpacity>
                    ))
                } */}
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
        width: wp('17%'),
        borderRadius: wp('5px'),
        borderColor: color.primary
    }
})
