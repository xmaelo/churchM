//import { Picker } from "@react-native-picker/picker";
import React, { ChangeEvent, useState } from "react"
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Picker } from "react-native";
import { Language } from '../Language';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

var changedLang = false;
const Lang = () => {
    const { i18n } = useTranslation();
    const {t} = useTranslation()
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
                <Picker.Item label={t('common.app.French')} value={Language.FR} />
                <Picker.Item label={t('common.app.English')} value={Language.EN} />
            </Picker>
        </View>
        // <div>
        //     <div>
        //         <select value={lang} name="language" onChange={changeLanguage}>
        //             <option value={Language.FR}>FR</option>
        //             <option value={Language.EN}>EN</option>
        //         </select>
        //     </div>
        // </div>
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