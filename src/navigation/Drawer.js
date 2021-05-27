import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
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

const ARG__ = createDrawerNavigator();

const Title = ({display}) => <Text style={themes.menuStyle}>{display}</Text>
const DrawIcon = ({name, f}) => <Ionicons name={name} size={25} color={f ? color.primary : '#ccc'}/>

function CustomDrawerContent(props) {
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
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}


export default function Drawer() {
  return (
    <NavigationContainer>
      <ARG__.Navigator
      	initialRouteName="AllStack"
      	drawerContentOptions={{
          //activeTintColor: 'black',
          //inactiveTintColor: 'black',
          //itemStyle: { alignItems:'flex-end' },
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}
        //drawerContent={(props) => <Image source={logo} />}
      >
        <ARG__.Screen
        	name="Accueil"
        	component={Accueil}
        	options={{
             title: ()=><Title display={"Accueil"}/>,
             drawerIcon: ({focused}) => (
                 <DrawIcon name={"home-outline"} f={focused}/>
             ),
             swipeEnabled: true
          }}
        />
        <ARG__.Screen
        	name="Finances"
        	component={Finaces}
        	options={{
             title: ()=><Title display={"Mes Finaces"}/>,
             drawerIcon: ({focused}) => (
                 <DrawIcon name={"logo-usd"} f={focused}/>
             ),
          }}
        />
        <ARG__.Screen
        	name="Profil"
        	component={Profil}
        	options={{
             title: ()=><Title display={"Mon Profile"}/>,
             drawerIcon: ({focused}) => (
                 <DrawIcon name={"person-circle-outline"} f={focused}/>
             ),
          }}
        />
        <ARG__.Screen
            name="ChatRoom"
            component={ListChatRoom}
            options={{
               title: ()=><View style={{flexDirection: 'row', alignItems:'center'}}>
                            <Title display={"Messages"}/>
                            <Badge status="success" value="+55"/>
                         </View>,
               drawerIcon: ({focused}) => (
                   <DrawIcon name={"chatbubble-outline"} f={focused}/>
               ),
            }}
        />

        <ARG__.Screen
        	name="Annonces"
        	component={Annonces}
        	options={{
             title: ()=><Title display={"Annonces"}/>,
             drawerIcon: ({focused}) => (
                 <DrawIcon name={"newspaper-outline"} f={focused}/>
             ),
          }}
        />

        <ARG__.Screen 
        	name="LectureBiblique" 
        	component={LectureBiblique} 
        	options={{
	           title: ()=><Title display={"Lecture Biblique"}/>,
	           drawerIcon: ({focused}) => (
	               <DrawIcon name={"book-outline"} f={focused}/>
	           ),
	        }}
        />
        <ARG__.Screen
        	name="Mediatheques"
        	component={Mediatheques}
        	options={{
             title: ()=><Title display={"Médiathèque"}/>,
             drawerIcon: ({focused}) => (
                 <DrawIcon name={"musical-notes-outline"} f={focused}/>
             ),
          }}
        />

        <ARG__.Screen
        	name="Activites"
        	component={Activites}
        	options={{
             title: ()=><Title display={"Activités Paroissiales"}/>,
             drawerIcon: ({focused}) => (
                 <DrawIcon name={"logo-react"} f={focused}/>
             ),
          }}
        />

        <ARG__.Screen
        	name="SainteScene"
        	component={SainteScene}
        	options={{
             title: ()=><Title display={"Sainte Cène"}/>,
             drawerIcon: ({focused}) => (
                 <DrawIcon name={"restaurant-outline"} f={focused}/>
             ),
          }}
        />

        <ARG__.Screen
        	name="Rendezvous"
        	component={Rendezvous}
        	options={{
             title: ()=><Title display={"Rendez-Vous"}/>,
             drawerIcon: ({focused}) => (
                 <DrawIcon name={"stopwatch-outline"} f={focused}/>
             ),
          }}
        />
        <ARG__.Screen
        	name="Parametres"
        	component={Parametres}
        	options={{
             title: ()=><Title display={"Mes Paramètres"}/>,
             drawerIcon: ({focused}) => (
                 <DrawIcon name={"cog-outline"} f={focused}/>
             ),
          }}
        />
        <ARG__.Screen
        	name="AllStack"
        	component={StackNav}
        	options={{
             title: ()=>null,
             drawerIcon: ()=>null,
             swipeEnabled: false,
          }}
        />
      </ARG__.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  img: {width: 90, height: 90, borderWidth: 6, borderColor: color.green, borderRadius: 100},
  container: {alignItems: "center"},
  name: {color: color.green}
});
