import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button } from 'react-native-elements';
import { themes } from '../color';
import Head from '../components/Head'
import { Surface } from 'react-native-paper';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const _renderItem = ({item, index}) => {
	return (
			<View style={{
					backgroundColor:'floralwhite',
					borderRadius: 5,
					height: hp('26%'),
					padding: 50
				 }}>
				<Text style={{fontSize: 30}}>{item.title}</Text>
				<Text>{item.text}</Text>
			</View>

		)
  }
	const carouselItems = [
          {
              title:"Item 1",
              text: "Text 1",
          },
          {
              title:"Item 2",
              text: "Text 2",
          },
          {
              title:"Item 3",
              text: "Text 3",
          },
          {
              title:"Item 4",
              text: "Text 4",
          },
          {
              title:"Item 5",
              text: "Text 5",
          },
        ]
export default function Accueil({navigation}){
	const [carousel, setCarousel] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
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
					 />
					 <Text style={{fontSize: 18, fontWeight: 'bold', padding: 15}}>Bienvenue Pauline</Text>
      </View>


		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('8%'),
    flex: 1
  },
	surface: {
	 padding: 8,
	 height: 80,
	 width: 80,
	 borderRadius: 10,
	 alignItems: 'center',
	 justifyContent: 'center',
	 elevation: 6,
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
