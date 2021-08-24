import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text,ListItem } from 'react-native-elements';
import { color } from '../color';
import Head from '../components/Head';
import { useTranslation } from 'react-i18next';

export default function DetailRdv({route, navigation}) {
	const {t} = useTranslation();
    const data = route.params?.param;
    return (
        <View style={{ flex: 1}}>
			<Head screen={t('common.app.appointment_detail')} n={navigation} second/>
            <View style={{paddingHorizontal: wp('3%')}}>
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
                            <View style={{marginLeft: 30}}><Text>{new Date(data.date).toISOString().split('T')[0]}</Text></View>
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
                            <View style={{marginLeft: 30}}><Text>{new Date(data.heure).toLocaleTimeString('fr-FR')}</Text></View>
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