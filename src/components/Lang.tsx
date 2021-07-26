//import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react"
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text } from "react-native";
import { Language } from '../Language';
import { Picker } from '@react-native-picker/picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

var changedLang = false;
const Lang = () => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState<Language>(i18n.language as Language);
 
    let changeLanguage = (event) => {
        let language = event;
 
        switch (language) {
            case Language.EN:
                setLang(Language.EN);
                i18n.changeLanguage(Language.EN);
                changedLang = true;
                break;
            case Language.FR:
            default:
                setLang(Language.FR);
                i18n.changeLanguage(Language.FR);
                changedLang = false;
                break;
        }
    }
 
    return (
        <View style={styles.thewdth}>
            <Picker
            selectedValue={lang}
            onValueChange={(itemValue, itemIndex) =>
                changeLanguage(itemValue)
            }>
                <Picker.Item label="Français" value={Language.FR} />
                <Picker.Item label="English" value={Language.EN} />
            </Picker>
            <Text style={{width: '100%', height: 60, position: 'absolute', bottom: 0, left: 0}}>{' '}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: wp('8%'),
      flex: 1
    },
    thewdth: {
        width: wp('50%')
    }
  })
export {changedLang} 
export default Lang;