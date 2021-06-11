import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, Modal,StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets";
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, ListItem, Avatar,Button } from 'react-native-elements';
import { themes } from '../color';
import Head from '../components/Head';
import YoutubePlayer from "react-native-youtube-iframe";
import { youtube } from '../statefull/youtube';
import { Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function Mediatheques({navigation}){
const {t} = useTranslation();
const [mainVideo, setMainVideo] = useState("");
	const [videoList, setVideoList] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalLink, setModalLink] = useState("");

	useEffect(()=>{
		(async()  => {
			let videos = await youtube.getAllvideoOfChanel();
			//setlist(list)
			console.log('------------------->>>list', videos);
			var restVideo = [];
			setMainVideo(videos.items[0].id.videoId.toString());
			for (let i = 1; i < videos.items.length; i++) {
				restVideo.push(videos.items[i]);
				console.log(videos.items[i]);
			  }
			setVideoList(restVideo);
			console.log('------------------->>>list', restVideo[1].snippet.thumbnails.high.url);
		})();
		return;
	}, [])

	return(
		<ScrollView style={{ flex: 1}}>
			<View>
				<Head screen={t('common.app.mediatheque')} n={navigation}/>
				<YoutubePlayer
					height={300}
					videoId={mainVideo}
				/>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<YoutubePlayer
							height={200}
							width={300}
							videoId={modalLink}
						/>
						<Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={() => setModalVisible(!modalVisible)}
						>
						<Text style={styles.textStyle}>{t('common.app.close')}</Text>
						</Pressable>
					</View>
					</View>
				</Modal>
				{
					videoList.map((l, i) => (
					<ListItem key={i} bottomDivider onPress={() => { setModalLink(l.id.videoId.toString());setModalVisible(true)}}>
						<Avatar source={l.snippet.thumbnails.high.url} />
						<ListItem.Content>
						<ListItem.Title>{l.snippet.title}</ListItem.Title>
						<ListItem.Subtitle>{l.snippet.description}</ListItem.Subtitle>
						</ListItem.Content>
					</ListItem>
					))
				}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('8%'),
    flex: 1
  },
  header: {
	  fontSize: 30
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})

