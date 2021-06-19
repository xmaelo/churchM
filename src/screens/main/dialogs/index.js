import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, Text, StatusBar, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import store from '../../../store'
import Dialog from './elements/dialog'
import ChatService from '../../../services/chat-service'
import Indicator from '../../components/indicator'
import CreateBtn from '../../components/createBtn'
import { BTN_TYPE } from '../../../helpers/constants'
import Avatar from '../../components/avatar'
import PushNotificationService from '../../../services/push-notification'
import Head from '../../../components/Head'
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

function Dialogs(props) {
  const [currentUserInfo, setCurrentUserInfo] = useState('')
  const dialogs = useSelector(state => state.dialogs);
  const isLoade = dialogs.length === 0 && true
  const [isLoader, setIsLoaded] = useState(isLoade)

  const feth  = async() =>{
    await ChatService.fetchDialogsFromServer()
    PushNotificationService.init(props.navigation)
    setIsLoaded(false)

  }
  useEffect(() => {
    (async()=>{
      await feth()
      //setHistory(props.history)
    })()
  }, [])



  const getDerivedStateFromProps = (props, state) => {
    if (props.currentUser.user.full_name !== Dialogs.currentUserInfo.full_name) {
      Dialogs.currentUserInfo = { ...props.currentUser.user }
      return true
    } return null
  }
/*
  static goToSettingsScreen = (props) => {
    props.navigate('Settings', { user: Dialogs.currentUserInfo })
  }

  componentDidUpdate(prevProps) {
    const { dialogs } = props
    if (props.dialogs !== prevProps.dialogs) {
      dialogs = dialogs
      setState({ isLoader: false })
    }
  }
*/


  const keyExtractor = (item, index) => index.toString()

  const _renderDialog = ({ item }) => {
    return (
      <Dialog dialog={item} navigation={props.navigation} />
    )
  }

  const goToContactsScreen = () => {
    const { navigation } = props
    navigation.navigate('Contacts')
  }

  return (
      <>
        <Head screen={"Groupes & Messages"} n={props.navigation}/>
        <View style={styles.container}>
          {isLoader ?
            (
              <Indicator color={'red'} size={40} />
            ) : dialogs.length === 0 ?
              (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 19 }}>Aucune conversation !</Text>
              </View>
              ) :
              (
                <FlatList
                  data={dialogs}
                  keyExtractor={keyExtractor}
                  renderItem={(item) => _renderDialog(item)}
                />
              )
          }
          <CreateBtn goToScreen={goToContactsScreen} type={BTN_TYPE.DIALOG} />
        </View>
      </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})


const mapStateToProps = ({ dialogs, currentUser }) => ({
  dialogs,
  currentUser
})

export default connect(mapStateToProps)(Dialogs)
