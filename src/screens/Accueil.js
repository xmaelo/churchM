import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button } from 'react-native-elements';
import { themes, color } from '../color';
import Head from '../components/Head'
import { Surface } from 'react-native-paper';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {api} from '../statefull/api'
import { Snackbar  } from 'react-native-paper';

const _renderItem = ({item, index}) => {
	return (
			<View style={{
					backgroundColor:'floralwhite',
					borderRadius: 5,
					height: hp('26%'),
				 }}>
				 <Image source={item}  style={{width: wp('99%'), height: hp('26%')}}/>
			</View>

		)
  }

	const carouselItems = [
		require('../../assets/imgs/1.jpg'),
    require('../../assets/imgs/2.jpg')
	];

const IconPart = ({name}) => <Ionicons name={name} size={30} color={color.primary}/>

export default function Accueil({navigation, route}){
	const [carousel, setCarousel] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [personne, setPersone] = useState(null);

	const [visible, setVisible] = useState(false);

	const onToggleSnackBar = () => setVisible(!visible);
	const onDismissSnackBar = () => setVisible(false);

	useEffect(() => {
		setVisible(true)
		setPersone(route.params?.personne);
		return () => console.log('Um mount')
	}, [])
	const Page = () => {
        return (
            <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={activeIndex}
              containerStyle={{ backgroundColor: 'transparent', marginTop: -70 }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 6,
                  //backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }
	return(
		<View style={styles.container}>
			<ScrollView>
				<View>
					<Head screen={"Accueil"} n={navigation}/>
					<View style={{...styles.container_card_main, justifyContent: 'center', alignItems: "center"}}>
		          <Carousel
		            layout={'tinder'}
								layoutCardOffset={9}
								ref={ref => setCarousel(ref)}
		            onSnapToItem = { index => setActiveIndex(index) }
		            data={carouselItems}
		            sliderWidth={wp('100%')}
		            itemWidth={wp('100%')}
		            renderItem={_renderItem}
								//loop={false}
		            autoplay={true}
		            autoplayInterval={5000}
		            autoplayDelay={1000}
							 />
							 <Text style={{fontSize: 18, fontWeight: 'bold', padding: 15}}>Bienvenue {personne?.nom}</Text>
		      </View>
					<View style={styles.fatherSurface}>
						<View style={styles.row}>
							<TouchableOpacity onPress={()=>navigation.navigate('Finances')}>
									<Surface style={styles.surface}>
										<IconPart name='logo-usd'/>
										<Text>Finances</Text>
									</Surface>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>navigation.navigate('Mediatheques')}>
								<Surface style={styles.surface}>
									<IconPart name='musical-notes-outline'/>
									<Text>Médiathèques</Text>
								</Surface>
							</TouchableOpacity>
						</View>
						<View style={styles.row}>
							<TouchableOpacity onPress={()=>navigation.navigate('Activites')}>
								<Surface style={styles.surface}>
									<IconPart name='logo-react'/>
									<Text>Activités Paroissiales</Text>
								</Surface>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>navigation.navigate('SainteScene')}>
								<Surface style={styles.surface}>
									<IconPart name='restaurant-outline'/>
									<Text>Sainte Cène</Text>
								</Surface>
							</TouchableOpacity>
						</View>
						<View style={styles.row}>
							<TouchableOpacity onPress={()=>navigation.navigate('Rendezvous')}>
								<Surface style={styles.surface}>
									<IconPart name='stopwatch-outline'/>
									<Text>Rendez-Vous</Text>
								</Surface>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>navigation.navigate('Parametres')}>
								<Surface style={styles.surface}>
									<IconPart name='cog-outline'/>
									<Text>Mes Paramètres</Text>
								</Surface>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>

			<Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Fermer',
          onPress: () => {
            // Do something
          },
        }}>
        Ravie de vous revoir, vous etes connecté !
      </Snackbar>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
    justifyContent: 'space-between',
  },
	surface: {
	 padding: 8,
	 height: 80,
	 width: wp('45%'),
	 borderRadius: 10,
	 alignItems: 'center',
	 justifyContent: 'center',
	 elevation: 6,
 },
 fatherSurface: {
	 paddingHorizontal:  wp('3%'),
	 paddingTop: hp('2%')
 },
 row: {
	 flexDirection: 'row',
	 justifyContent: 'space-between',
	 alignItems: 'center',
	 paddingBottom: hp('2%')
 },
 container_card_main: {
	 backgroundColor: 'white',
	 marginLeft: wp('2%'),
	 marginRight: wp('2%'),
	 borderRadius: 10,
	 height: hp('34%'),
	 marginTop: hp('2%'),
	 shadowColor: "#000",
	 shadowOffset: {
		 width: 0,
		 height: 6,
	 },
	 shadowOpacity: 0.39,
	 shadowRadius: 8.30,

	 elevation: 2,
 },
})
