import { StyleSheet } from 'react-native';

const colors = {
	primary: "#0866C6",
	textSeconday: "#343D46",
	green: "#448941",
	red: "#F85C6A"
}

export const color = colors;

export const themes = StyleSheet.create({
	primary: {
		color: colors.primary
	},
	secondary: {
		color: colors.textSeconday
	},
	menuStyle: {
		fontSize: 17,
		marginLeft: -10
	}
})

/**
const DrawerItemsData = [
  { label: 'Accueil', icon: ()=><Ionicons name={"sale"} size={25} />, key: 0, name:"Accueil" },
  { label: 'Mes Finances', icon: 'sale', key: 1 , name: "Finaces"},
  { label: 'Mon Profil', icon: 'sale', key: 2, name: "Profil" },
  { label: 'Messages', icon: 'sale', key: 3, badge: ()=><Badge status="success" value="+55"/>, name: "ChatRoom" },
  { label: 'Annonces', icon: 'sale', key: 4, name: "Annonces" },
  { label: "Lecture Biblique", name: "LectureBiblique", icon: 'sale', key: 5 },
  { label: 'Mediathèque', icon: 'sale', key: 6, name: "Mediatheques" },
  { label: "Sainte Cène", name: "SainteScene", icon: 'sale', key: 7 },
  { label: "Rendez-Vous", name: "Rendezvous", icon: 'sale', key: 8 },
  { label: 'Activités Paroissiales', icon: 'sale', key: 9, name: "Activites" },
  { label: 'Mes Paramètres', icon: 'sale', key: 10, name: "Parametres" }
];
*/
