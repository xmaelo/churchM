import ConnectyCube from 'react-native-connectycube';
//import AuthService from './auth-service'
import store from '../store'

class chat {
  setUpListenners =  async () => {
    ConnectyCube.chat.onMessageListener = this.onMessage;
    //this.listDialog();
  }
  onMessage = (userId, message) => {
    console.log('onMessage comming====////////////////////////////////////===============>>>>')
    store.dispatch({type: "PUSH_ON_MESSAGE", message:  message, userId: userId})
    console.log('after displatched')
  }
  fetchMessages = (dialogId) => {
    const params = {
      chat_dialog_id: dialogId,
      sort_desc: "date_sent",
      limit: 100,
      skip: 0,
    };
    ConnectyCube.chat.message.list(params).then((messages) => {
      console.log('messages messages messages==========>>>', messages)
      store.dispatch({type: "PUSH_ALL_MESSAGES", messages:  messages.items, activIndicator: false})
    }).catch((error) => {});
  }

}

const ChatService = new chat()

export default ChatService
