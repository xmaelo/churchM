import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Head from '../components/Head';
import {thebible} from "../assets"
import {kjbible} from "../assets"
import { Text, Input, Button, ListItem, Card } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { color } from '../color';
import { changedLang, changedLanguage } from '../components/Lang';

export default function TheBible({navigation}){

    const {t} = useTranslation();
    const [allBooks, setAllBooks] = useState([]);

    useEffect(() => {
            var tab = [];
            var selectBible;
            console.log('Changed Language', changedLang);
            if(changedLang)
                selectBible = kjbible;
            else
                selectBible = thebible;
            selectBible.books.forEach(book => {book.name = book.name.replace(/ /g, '_')});
            tab = selectBible.books;
            console.log('New Bible: ', tab);
            setAllBooks(tab);
      }, [changedLang])

    return (
        <View style={{ flex: 1}}>
            <Head screen={t('common.app.my')+" "+t('common.app.my_bible')} n={navigation}/>
            <ScrollView>                
                
                {
                    allBooks.map((l,i) => (
                        // <ListItem key={i} bottomDivider>
                        //     <ListItem.Content>
                        //         <Text>{l.name}</Text>
                        //     </ListItem.Content>
                        // </ListItem>
                        <TouchableOpacity onPress={()=>navigation.navigate('ChapBible', {param: l})}>
                            <Card containerStyle={{borderColor: color.primary}}>
                                <Card.Title h4>{t('common.bible.'+l.name)}</Card.Title>
                            </Card>
                        </TouchableOpacity>
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
  })