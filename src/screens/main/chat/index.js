import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AttachmentIcon from 'react-native-vector-icons/Entypo'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import ChatService from '../../../services/chat-service'
import UsersService from '../../../services/users-service'
import Message from './message'
import Avatar from '../../components/avatar'
import ImagePicker from 'react-native-image-crop-picker'
import { DIALOG_TYPE } from '../../../helpers/constants'
import Head from '../../../components/Head'
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

function Chat(props) {
  const [needToGetMoreMessage, setneedToGetMoreMessage] = useState(null)
  const [activIndicator, setIndicator] = useState(true)
  const [messageText, setMessageText] = useState('')
  //const [history, setHistory] = useState([])
  const isFocused = useIsFocused();
  const feth  = async() =>{
    console.log('props props props', props)
    const { dialog } = props.route?.params
    const m = await ChatService.getMessages(dialog)
    m.amountMessages == 100 ? setneedToGetMoreMessage(true) : setneedToGetMoreMessage(false)
    setIndicator(false)
    //setHistory(m.messages)
    console.log('mrrrmmrmrmrmrmrmmrmr==', m, props)

  }

  useEffect(() => {
    (async()=>{
      await feth()
      //setHistory(props.history)
    })()
  }, [isFocused, ChatService.resetSelectedDialogs()])

  const history = useSelector(state => state.messages[props?.route?.params?.dialog.id]);

  const getMoreMessages = () => {
    const { dialog } = props?.route.params
    if (needToGetMoreMessage) {
      setIndicator(true)
      ChatService.getMoreMessages(dialog)
        .then(amountMessages => {
          amountMessages === 100 ? setneedToGetMoreMessage(true) : setneedToGetMoreMessage(false)
          setIndicator(false)
        })
    }
  }

  const onTypeMessage = messageText => setMessageText(messageText)

  const sendMessage = async () => {
    const { dialog } = props?.route.params
    if (messageText.length <= 0) return
    await ChatService.sendMessage(dialog, messageText)
    setMessageText('')
  }

  const sendAttachment = async () => {
    const { dialog } = props?.route.params
    const img = await onPickImage()
    ChatService.sendMessage(dialog, '', img)
  }

  const onPickImage = () => {
    return ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      return image
    })
  }

  const _keyExtractor = (item, index) => index.toString()

  function _renderMessageItem(message) {
    const { user } = props.currentUser
    const isOtherSender = message.sender_id !== user.id ? true : false
    return (
      <Message otherSender={isOtherSender} message={message} key={message.id} />
    )
  }

  return (
      <>
        <Head screen={"Conversation"} n={props?.navigation} second isGroup={props?.route?.params?.dialog?.type==2} dialog={props?.route?.params?.dialog} isNeedFetchUsers={props.route?.params?.isNeedFetchUsers}/>
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: 'white' }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 100}
        >
          {activIndicator &&
            (
              <View style={styles.indicator}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )
          }
          <FlatList
            inverted 
            data={history}
            keyExtractor={_keyExtractor}
            renderItem={({ item }) => _renderMessageItem(item)}
            onEndReachedThreshold={5}
            onEndReached={getMoreMessages}
          />
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <AutoGrowingTextInput
                style={styles.textInput}
                placeholder="Type a message..."
                placeholderTextColor="grey"
                value={messageText}
                onChangeText={onTypeMessage}
                maxHeight={170}
                minHeight={50}
                enableScrollToCaret
              />
              <TouchableOpacity style={styles.attachment}>
                <AttachmentIcon name="attachment" size={22} color="#8c8c8c" onPress={sendAttachment} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button}>
              <Icon name="send" size={32} color="blue" onPress={sendMessage} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </>
    )

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    paddingVertical: 12,
    paddingHorizontal: 35
  },
  activityIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    paddingTop: 25,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '300',
    color: '#8c8c8c',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'ios' ? 14 : 10,
    paddingBottom: Platform.OS === 'ios' ? 14 : 10,
    paddingRight: 35,
    backgroundColor: 'whitesmoke',
  },
  button: {
    width: 40,
    height: 50,
    marginBottom: Platform.OS === 'ios' ? 15 : 0,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachment: {
    width: 40,
    height: 50,
    position: 'absolute',
    right: 5,
    bottom: 0,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    marginBottom: Platform.OS === 'ios' ? 15 : 0,
    flexDirection: 'row'
  }
});

const mapStateToProps = (state, props) => {
  console.log('mapStateToProps mapStateToPropsmapStateToProps', state.messages[props?.route?.params?.dialog.id])
   return {
    history: state.messages[props?.route?.params?.dialog.id],
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Chat)
