import React, { PureComponent } from 'react'
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
//import { connect } from 'react-redux'
import ConnectyCube from "react-native-connectycube";
import Icon from 'react-native-vector-icons/MaterialIcons'
import AttachmentIcon from 'react-native-vector-icons/Entypo'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import Head from '../components/Head'
import ChatService from '../services/chat-service'
import { connect } from 'react-redux'
//import ChatService from '../../../services/chat-service'
//import UsersService from '../../../services/users-service'

import Message from '../components/message'
import { Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker'

export class Chat extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activIndicator: true,
      messageText: '',
      messages: []
    }
  }

  needToGetMoreMessage = null

  // static navigationOptions = ({ navigation }) => {
  //   let dialog = navigation.state.params.dialog
  //   let dialogPhoto = ''
  //   if (dialog.type === DIALOG_TYPE.PRIVATE) {
  //     dialogPhoto = UsersService.getUsersAvatar(dialog.occupants_ids)
  //   } else {
  //     dialogPhoto = dialog.photo
  //   }
  //   return {
  //     headerTitle: (
  //       <Text numberOfLines={3} style={{ fontSize: 22, color: 'black' }}>
  //         {navigation.state.params.dialog.name}
  //       </Text>
  //     ),
  //     headerRight: (
  //       <TouchableOpacity onPress={() => this.goToDetailsScreen(navigation)}>
  //         <Avatar
  //           photo={dialogPhoto}
  //           name={navigation.state.params.dialog.name}
  //           iconSize="small"
  //         />
  //       </TouchableOpacity>
  //     )
  //   }
  // }

  // static goToDetailsScreen = (props) => {
  //   const isNeedFetchUsers = props.getParam('isNeedFetchUsers', false)
  //   if (props.state.params.dialog.type === DIALOG_TYPE.PRIVATE) {
  //     props.push('ContactDetails', { dialog: props.state.params.dialog })
  //   } else {
  //     props.push('GroupDetails', { dialog: props.state.params.dialog, isNeedFetchUsers })
  //   }
  // }

  async componentDidMount() {
    const isConnected = ConnectyCube.chat.isConnected;
    await ChatService.fetchMessages(this.props?.route?.params?.dialog._id)
    ConnectyCube.chat.dialog
    .subscribe(this.props?.route?.params?.dialog._id)
    .then((dialog) => {
      console.log('after connect dialog')
    })
    .catch((error) => {});
    console.log('after fetchMessage', isConnected)
  }

  componentWillUnmount() {
    //ChatService.resetSelectedDialogs()
  }


  getMoreMessages = () => {
    // const { dialog } = this.props.navigation.state.params
    // if (this.needToGetMoreMessage) {
    //   this.setState({ activIndicator: true })
    //   ChatService.getMoreMessages(dialog)
    //     .then(amountMessages => {
    //       amountMessages === 100 ? this.needToGetMoreMessage = true : this.needToGetMoreMessage = false
    //       this.setState({ activIndicator: false })
    //     })
    // }
  }

  onTypeMessage = messageText => this.setState({ messageText })

  sendMessage = async () => {
    // const { dialog } = this.props.navigation.state.params
     const { messageText } = this.state
    // if (messageText.length <= 0) return
    // await ChatService.sendMessage(dialog, messageText)
    // this.setState({ messageText: '' })
    await ConnectyCube.chat.muc.join(this.props?.route?.params?.dialog._id);
    const date = Math.floor(Date.now() / 1000)
    const message = {
      type: "groupchat",
      body: messageText,
      extension: {
        save_to_history: 1,
        dialog_id: this.props?.route?.params?.dialog._id,
        sender_id: 4439681,
        date_sent: date,
      },
      markable: 1,
    };
    this.setState({ messageText: '' })
    console.log('this.props?.route?.params?.dialog._id', this.props?.route?.params?.dialog._id)
    try {
      message.id = await ConnectyCube.chat.send(this.props?.route?.params?.dialog._id, message);
    } catch (e) {
      console.log('errror send', e)
    }
  }

  sendAttachment = async () => {
   // const { dialog } = this.props.navigation.state.params
    const img = await this.onPickImage()
    //ChatService.sendMessage(dialog, '', img)
  }

  onPickImage = () => {
    return ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      return image
    })
  }

  _keyExtractor = (item, index) => index.toString()

  _renderMessageItem(message) {
    console.log('message message', message)
    const { user } = this.props.currentUser
    const isOtherSender = message?.sender_id !== user.id ? true : false
    return (
      <Message otherSender={isOtherSender} message={message} key={message.id} />
    )
  }

  render() {
    console.log('this.propsssss', this.props?.route?.params?.dialog)
    const { history } = [];
    const { messageText, activIndicator } = this.state
    return (

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: 'white' }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 100}
      >
        <Head screen={"Conversation"} n={this.props.navigation} second/>
        {this.props.activIndicator &&
          (
            <View style={styles.indicator}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )
        }
        <FlatList
          inverted
          data={this.props.messages}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => this._renderMessageItem(item)}
          onEndReachedThreshold={5}
          onEndReached={this.getMoreMessages}
        />
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <AutoGrowingTextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="grey"
              value={messageText}
              onChangeText={this.onTypeMessage}
              maxHeight={170}
              minHeight={50}
              enableScrollToCaret
            />
            <TouchableOpacity style={styles.attachment}>
              <AttachmentIcon name="attachment" size={22} color="#8c8c8c" onPress={this.sendAttachment} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button}>
            <Icon name="send" size={32} color="blue" onPress={this.sendMessage} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
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

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Chat)
