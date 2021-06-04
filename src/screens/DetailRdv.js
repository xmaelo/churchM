import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text,ListItem } from 'react-native-elements';
import { color } from '../color';
import Head from '../components/Head';
import Moment from 'moment';

export default function DetailRdv({route, navigation}) {
    const data = route.params?.param;
    Moment.locale('fr');
    return (
        <View style={{ flex: 1}}>
			<Head screen={"Détails du Rendez-Vous"} n={navigation} second/>
            <ListItem>
                <ListItem.Content>
                    <View style={styles.textStyle}>
                        <View>
                            <Ionicons
                                name={"calendar-outline"}
                                size={30}
                                color={color.primary}
                            />
                        </View>
                        <View style={{marginLeft: 30}}><Text>{Moment(data.date).format('DD MMM YYYY')}</Text></View>
                    </View>
                </ListItem.Content>
            </ListItem>
            <ListItem>
                <ListItem.Content>
                    <View style={styles.textStyle}>
                        <View>
                            <Ionicons
                                name={"time-outline"}
                                size={30}
                                color={color.primary}
                            />
                        </View>
                        <View style={{marginLeft: 30}}><Text>{Moment(data.heure).format('hh:mm')}</Text></View>
                    </View>
                </ListItem.Content>
            </ListItem>
            <ListItem>
                <ListItem.Content>
                    <View style={styles.textStyle}>
                        <View>
                            <Ionicons
                                name={"bulb-outline"}
                                size={30}
                                color={color.primary}
                            />
                        </View>
                        <View style={{marginLeft: 30}}><Text>{data.etat}</Text></View>
                    </View>
                </ListItem.Content>
            </ListItem>
            <ListItem>
                <ListItem.Content>
                    <View style={styles.textStyle}>
                        <View>
                            <Ionicons
                                name={"information-outline"}
                                size={30}
                                color={color.primary}
                            />
                        </View>
                        <View style={{marginLeft: 30}}><Text>{data.raison}</Text></View>
                    </View>
                </ListItem.Content>
            </ListItem>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('8%'),
        flex: 1
    },
    textStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        },
})