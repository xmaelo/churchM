
const initS = {
  dialogs: [],
  messages: [],
  currentUser: {},
  activIndicator: true
}
export default function rootReducer(state = initS, action){
  console.log('redccer here ########################################################')
  let curentState = state;
   switch (action.type) {
    case 'SET_USER':
      currentUser = {...curentState, currentUser: action.user}
      return currentUser
    case 'PUSH_DIALOG':
      console.log('set Dialog here=================>>>>>', action.dialog)
      let dialogs = curentState.dialogs
      dialogs.push(action.dialog)
      currentUser = {...curentState, dialogs: dialogs}
      return currentUser
    case 'PUSH_ALL_MESSAGES':
      currentUser = {...curentState, messages: action.messages, activIndicator: action.activIndicator}
      return currentUser
    case 'PUSH_ON_MESSAGE':
      console.log('________________________________________________________________________________________', action.message)
      let messages = curentState.messages
      messages.push(action.message)
      currentUser = {...curentState, messages: messages}
      return currentUser
    default:
      return curentState
  }
}
