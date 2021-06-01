import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import Preparation from '../screens/Preparation'
import ContactEglise from '../screens/ContactEglise'
import Chat from '../screens/Chat'
import Recovery from '../screens/Recovery';
import AnnonceDetails from '../screens/AnnonceDetails';
import DetailLecture from '../screens/DetailLecture';
import ActivitesDetails from '../screens/ActivitesDetails';

import Accueil from '../screens/Accueil'
import Activites from '../screens/Activites'
import Annonces from '../screens/Annonces'
import Mediatheques from '../screens/Mediatheques'
import Finaces from '../screens/Finaces'
import SainteScene from '../screens/SainteScene'
import Profil from '../screens/Profil'
import Parametres from '../screens/Parametres'
import ListChatRoom from '../screens/ListChatRoom'
import { Text, Input, Button, Badge } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { themes, color } from '../color';
import {logo} from "../assets"
import LectureBiblique from '../screens/LectureBiblique';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { NavigationContainer } from '@react-navigation/native';
import {StackNav} from '../navigation';
import Rendezvous from '../screens/Rendezvous';
import {
  Drawer,
} from 'react-native-paper';
import NewRendezVous from '../screens/NewRendezVous';
import DetailRdv from '../screens/DetailRdv';
const ARG__ = createDrawerNavigator();

const Title = ({display}) => <Text style={themes.menuStyle}>{display}</Text>
const DrawIcon = ({name, f}) => <Ionicons name={name} size={25} color={f ? color.primary : '#ccc'}/>

const DrawerItemsData = [
  { label: 'Accueil', icon: 'home-outline', key: 0, name:"Accueil" },
  { label: 'Mes Finances', icon: 'logo-usd', key: 1 , name: "Finances"},
  { label: 'Mon Profil', icon: 'person-circle-outline', key: 2, name: "Profil" },
  { label: 'Messages', icon: 'chatbubble-outline', key: 3, badge: ()=><Badge status="success" value="+55"/>, name: "ChatRoom" },
  { label: 'Annonces', icon: 'newspaper-outline', key: 4, name: "Annonces" },
  { label: "Lecture Biblique", name: "LectureBiblique", icon: 'book-outline', key: 5 },
  { label: 'Mediathèque', icon: 'musical-notes-outline', key: 6, name: "Mediatheques" },
  { label: "Sainte Cène", name: "SainteScene", icon: 'restaurant-outline', key: 7 },
  { label: "Rendez-Vous", name: "Rendezvous", icon: 'stopwatch-outline', key: 8 },
  { label: 'Activités Paroissiales', icon: 'logo-react', key: 9, name: "Activites" },
  { label: 'Mes Paramètres', icon: 'cog-outline', key: 10, name: "Parametres" }
];

const stacks = [
  { composant: Accueil, name:"Accueil" },
  { composant: Finaces, name: "Finances"},
  { composant: Profil, name: "Profil" },
  { composant: ListChatRoom,  name: "ChatRoom" },
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
];

function CustomDrawerContent(props) {
  const [drawerItemIndex, setDrawerItemIndex] = React.useState(0);
  const _setDrawerItem = (index) => setDrawerItemIndex(index);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label={()=>
          <View style={styles.container} >
            <Image source={logo} style={styles.img} />
            <Text h4 style={styles.name}>
              EEC Cameroon
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
  return (
    <NavigationContainer>
      <ARG__.Navigator
      	initialRouteName="Login"
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
  );
}

const styles = StyleSheet.create({
  img: {width: 90, height: 90, borderWidth: 6, borderColor: color.green, borderRadius: 100},
  container: {alignItems: "center"},
  name: {color: color.green}
});
