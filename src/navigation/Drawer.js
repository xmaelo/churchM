import React, { useState, useEffect } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Alert  } from 'react-native';

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import Preparation from '../screens/Preparation'
import ContactEglise from '../screens/ContactEglise'
//import Chat from '../screens/Chat'
import Recovery from '../screens/Recovery';
import AnnonceDetails from '../screens/AnnonceDetails';
import DetailLecture from '../screens/DetailLecture';
import ActivitesDetails from '../screens/ActivitesDetails';
import Constributions from '../screens/Constributions';

import Accueil from '../screens/Accueil'
import Activites from '../screens/Activites'
import Annonces from '../screens/Annonces'
import Mediatheques from '../screens/Mediatheques'
import Finaces from '../screens/Finaces'
import DetailsContribution from '../screens/DetailsContribution'
import SainteScene from '../screens/SainteScene'
import Profil from '../screens/Profil'
import Parametres from '../screens/Parametres'
import { Text, Input, Button, Badge } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { themes, color } from '../color';
import {logo} from "../assets"
import LectureBiblique from '../screens/LectureBiblique';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { NavigationContainer } from '@react-navigation/native';
import {StackNav} from '../navigation';
import Rendezvous from '../screens/Rendezvous';
import { getData } from '../statefull/asyncStorage'
import {login} from '../statefull/login'
import { ActivityIndicator} from 'react-native-paper';
import {
  Drawer,
} from 'react-native-paper';
import NewRendezVous from '../screens/NewRendezVous';
import DetailRdv from '../screens/DetailRdv';
import TheBible from '../screens/TheBible';
import ChapBible from '../screens/ChapBible';
import VersetBible from '../screens/VersetBible';
import { LogBox } from 'react-native';

import AuthService from '../services/auth-service';

import Auth from '../screens/auth'
import Dialogs from '../screens/main/dialogs'
import Settings from '../screens/main/settings/index'
import Chat from '../screens/main/chat/index'
import Contacts from '../screens/main/contacts/index'
import CreateDialog from '../screens/main/contacts/createDialog'
import GroupDetails from '../screens/main/chat/groupDetails'
import ContactDetails from '../screens/main/chat/contactDetails'

import Oldrgister from '../screens/old/Oldrgister'
import { useTranslation } from 'react-i18next';
import { profil } from '../statefull/profil';
import { user } from '../statefull/query'
const ARG__ = createDrawerNavigator();

const Title = ({display}) => <Text style={themes.menuStyle}>{display}</Text>
const DrawIcon = ({name, f}) => <Ionicons name={name} size={25} color={f ? color.primary : '#ccc'}/>

const stacks = [
  { composant: Auth, name: "Auth", swipe: true },
  { composant: Dialogs, name: "Dialogs"},
  { composant: Contacts, name: "Contacts", swipe: true },
  { composant: CreateDialog, name: "CreateDialog", swipe: true },
  { composant: GroupDetails, name: "GroupDetails", swipe: true },
  { composant: ContactDetails, name: "ContactDetails", swipe: true },
  { composant: Accueil, name:"Accueil" },
  { composant: Finaces, name: "Finances"},
  { composant: Profil, name: "Profil" },
  { composant: Annonces,  name: "Annonces" },
  { composant: LectureBiblique, name: "LectureBiblique" },
  { composant: Mediatheques, name: "Mediatheques" },
  { composant: SainteScene, name: "SainteScene" },
  { composant: Rendezvous, name: "Rendezvous"},
  { composant: Activites, name: "Activites" },
  { composant: Parametres, name: "Parametres" },
  { composant: LoginScreen, name: "Login", swipe: true },
  { composant: RegisterScreen, name: "Register", swipe: true },
  { composant: Recovery, name: "Recovery", swipe: true },
  { composant: AnnonceDetails, name: "AnnonceDetails", swipe: true },
  { composant: ActivitesDetails, name: "ActivitesDetails", swipe: true },
  { composant: Preparation, name: "Preparation", swipe: true },
  { composant: DetailLecture, name: "DetailLecture", swipe: true },
  { composant: Chat, name: "Chat", swipe: true },
  { composant: ContactEglise, name: "ContactEglise", swipe: true },
  { composant: NewRendezVous, name: "NewRendezVous", swipe: true },
  { composant: DetailRdv, name: "DetailRdv", swipe: true },
  { composant: Constributions, name: "Constributions", swipe: true },
  { composant: TheBible, name: "TheBible", swipe: true },
  { composant: ChapBible, name: "ChapBible", swipe: true },
  { composant: VersetBible, name: "VersetBible", swipe: true },
  { composant: DetailsContribution, name: "DetailsContribution", swipe: true },
  { composant: Oldrgister, name: "Oldrgister", swipe: true },
];

function CustomDrawerContent(props) {
  const {t} = useTranslation();
  const DrawerItemsData = [
    { label: t('common.app.accueil'), icon: 'home-outline', key: 0, name:"Accueil" },
    { label: t('common.app.mys')+' '+t('common.app.finances'), icon: 'logo-usd', key: 1 , name: "Finances"},
    { label: t('common.app.my2')+' '+t('common.app.profil'), icon: 'person-circle-outline', key: 2, name: "Profil" },
    { label: t('common.app.message'), icon: 'chatbubble-outline', key: 3, badge: ()=><Badge status="success" value="+55"/>, name: "Dialogs" },
    { label: t('common.app.annonce'), icon: 'newspaper-outline', key: 4, name: "Annonces" },
    { label: t('common.app.my')+' '+t('common.app.my_bible'), icon: 'book-outline', key: 5, name: "TheBible" },
    { label: t('common.app.lecture_biblic'), name: "LectureBiblique", icon: 'reader-outline', key: 6 },
    { label: t('common.app.mediatheque'), icon: 'musical-notes-outline', key: 7, name: "Mediatheques" },
    { label: t('common.app.sainte_cene'), name: "SainteScene", icon: 'restaurant-outline', key: 8 },
    { label: t('common.app.rendez_vous'), name: "Rendezvous", icon: 'stopwatch-outline', key: 9 },
    { label: t('common.app.activites'), icon: 'logo-react', key: 10, name: "Activites" },
    { label: t('common.app.settings'), icon: 'cog-outline', key: 11, name: "Parametres" }
  ];
  const [drawerItemIndex, setDrawerItemIndex] = React.useState(0);
  const _setDrawerItem = (index) => setDrawerItemIndex(index);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label={()=>
          <View style={styles.container} >
            <Image source={{uri: "https://i.ytimg.com/vi/uC3vwBGkSDQ/hqdefault.jpg"}} style={styles.img} />
            <Text h4 style={styles.name}>
            {user.getEinfos()? " "+user.getEinfos()[0]?.nom : null}
            </Text>
          </View>
        }/>

          {DrawerItemsData.map((item, index) => (
            <DrawerItem
              key={item.key}
              icon={({ focused, color, size }) => <DrawIcon f={focused} name={item.icon}/>}
              label={({ focused, color }) => <Title display={item.label}/>}
              focused={drawerItemIndex === index}
              onPress={() => {_setDrawerItem(index); props.navigation.navigate(item.name)}}
            />
          ))}
    </DrawerContentScrollView>
  );
}

export default function Drawers() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState({});
  const [initialRouteName, setInitialRoute] = useState(null);
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  const connect = async (u) => {
    const user = u || user
    let res = await login.auth(user.username, user.password);
    //AuthService.login(user);
    if (res) {
      setIsLoaded(false)
    }else{
      Alert.alert(
        "Problème survenu",
        "Rassurez vous d'avoir accès a internet",
        [
          { text: "Réessayer", onPress: async() =>  {await connect(user)}}
        ]
      )
    }
    return res;
  }
  useEffect(() => {
    (async()=>{
      let user = await getData();
      console.log('user user userv user', user)
      setUser(user);
      if(user){
        setInitialRoute('Accueil')
        const res = await connect(user);
      }else {
        setInitialRoute('Login')
        setIsLoaded(false)
      }
    })()
    }, []);

  return (
    <>
      {!isLoaded &&
        <NavigationContainer>
          <ARG__.Navigator
          	initialRouteName={initialRouteName}
          	drawerContentOptions={{
              //activeTintColor: 'black',
              //inactiveTintColor: 'black',
              //itemStyle: { alignItems:'flex-end' },
            }}
            drawerContent={props => <CustomDrawerContent {...props} />}
          >
            {stacks.map((screen, key)=>
              <ARG__.Screen
                key={key}
                name={screen.name}
                component={screen.composant}
                options={{
                  swipeEnabled: !screen.swipe,
                }}
              />
            )}

          </ARG__.Navigator>
        </NavigationContainer>
      }
      {isLoaded &&
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating={true} color={color.primary} size={"large"}/>
        </View>
      }
    </>
  );
}

const styles = StyleSheet.create({
  img: {width: 90, height: 90, borderWidth: 6, borderColor: color.green, borderRadius: 100},
  container: {alignItems: "center"},
  name: {color: color.green}
});
