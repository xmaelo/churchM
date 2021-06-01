import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo, bible} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button, ListItem } from 'react-native-elements';
import { themes, color } from '../color';
import Head from '../components/Head';
import { Picker } from '@react-native-picker/picker';


export default function DetailRdv({route, navigation}) {
    const data = route.params?.param;
    return (
        <View style={{ flex: 1}}>
			<Head screen={"Détails du Rendez-Vous"} n={navigation} second/>
            <View>
                <Text>{data.date}</Text>
                <Text>{data.heure}</Text>
                <Text>{data.etat}</Text>
                <Text>{data.raison}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('8%'),
        flex: 1
    },
})