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
//import {api} from '../statefull/api'
import {user} from '../statefull/query';
import { Snackbar  } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

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
const {t} = useTranslation();

	const [carousel, setCarousel] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [personne, setPersone] = useState(null);

	const [visible, setVisible] = useState(false);

	const onToggleSnackBar = () => setVisible(!visible);
	const onDismissSnackBar = () => setVisible(false);

	useEffect(() => {
		setVisible(true)
		const pers = route.params?.personne || user.getUserInfo();
		setPersone(pers);
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
				<View style={{paddingBottom: hp('5%')}}>
					<Head screen={t('common.app.accueil')} n={navigation}/>
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
							 <Text style={{fontSize: 18, fontWeight: 'bold', padding: 15}}>{t('common.app.welcome')} {personne?.nom}</Text>
		      </View>
					<View style={styles.fatherSurface}>
						<View style={styles.row}>
							<TouchableOpacity onPress={()=>navigation.navigate('Finances')}>
									<Surface style={styles.surface}>
										<IconPart name='logo-usd'/>
										<Text>{t('common.app.finances')}</Text>
									</Surface>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>navigation.navigate('Mediatheques')}>
								<Surface style={styles.surface}>
									<IconPart name='musical-notes-outline'/>
									<Text>{t('common.app.mediatheque')}</Text>
								</Surface>
							</TouchableOpacity>
						</View>
						<View style={styles.row}>
							<TouchableOpacity onPress={()=>navigation.navigate('Activites')}>
								<Surface style={styles.surface}>
									<IconPart name='logo-react'/>
									<Text>{t('common.app.activites')}</Text>
								</Surface>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>navigation.navigate('SainteScene')}>
								<Surface style={styles.surface}>
									<IconPart name='restaurant-outline'/>
									<Text>{t('common.app.sainte_cene')}</Text>
								</Surface>
							</TouchableOpacity>
						</View>
						<View style={styles.row}>
							<TouchableOpacity onPress={()=>navigation.navigate('Rendezvous')}>
								<Surface style={styles.surface}>
									<IconPart name='stopwatch-outline'/>
									<Text>{t('common.app.rendez_vous')}</Text>
								</Surface>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>navigation.navigate('Annonces')}>
								<Surface style={styles.surface}>
									<IconPart name='newspaper-outline'/>
									<Text>{t('common.app.annonce')}</Text>
								</Surface>
							</TouchableOpacity>
						</View>
						<View style={styles.row}>
							<TouchableOpacity onPress={()=>navigation.navigate('ChatRoom')}>
								<Surface style={styles.surface}>
									<IconPart name='chatbubble-outline'/>
									<Text>{t('common.app.message')}</Text>
								</Surface>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>navigation.navigate('TheBible')}>
								<Surface style={styles.surface}>
									<IconPart name='book-outline'/>
									<Text>{t('common.app.my_bible')}</Text>
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
          label: t('common.app.close'),
          onPress: () => {
            // Do something
          },
        }}>
        {t('common.app.happy')}
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
