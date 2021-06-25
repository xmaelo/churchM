import ConnectyCube from 'react-native-connectycube';
import config from './config';
import store from '../store'
import ChatService from './chat-service'
class Auth{
  init = () => ConnectyCube.init(...config);

  login = user => {
    const pass = user.password+"__"+user.password
    user = {full_name: user.username, login: user.username+'@gmail.com', password: pass}
    return new Promise((resolve, reject) => {
      ConnectyCube.createSession(user).then((reult) =>{
          const filters = {}
          const exist = false;
          console.log('reult user=====>>> reult', reult)
          const customSession = Object.assign({}, reult, { password: pass })
          store.dispatch({type: "SET_USER", user: customSession})
          ConnectyCube.chat.connect({ userId: customSession.id, password: customSession.password}).then((e) => {
            console.log('connextionn===>>>', e)
            ChatService.setUpListenners();
          }).catch((error) => {});
        }).then(resolve)
      .catch(reject);
    });
  };


  logout = () => {
    ConnectyCube.chat.disconnect();
    ConnectyCube.destroySession();
  };

  check = (user) => {
    const groupe = "undefined" //user.groupe
    const connect = () => {
      ConnectyCube.createSession().then((session) => {
        user = {full_name: user.username, login: user.username+'@gmail.com', password: user.password+"__"+user.password}
        ConnectyCube.users.signup(user).then((result) => {
            ConnectyCube.login(user).then(()=>{
              const filters = {}
              const exist = false;
              ConnectyCube.chat.dialog.list(filters).then((result) => {
                result && result.items && result.items.map(dialog =>{
                  if(dialog.name == groupe){
                    exist = true;
                  }
                })
                if (!exist) {
                  const params = {
                    type: 4,
                    name: groupe,
                  };
                  ConnectyCube.chat.dialog.create(params)
                    .then((dialog) => {console.log('after create chat')})
                    .catch((error) => {});
                  }
                })
              .catch((error) => {});
            }).catch(()=>{});
          })
          .catch((error) => {console.log('error created', error)});
      }).catch((error) => {console.log('error ======================>>>', error)});

    }
    connect();
  };
}

const AuthService = new Auth()
export default AuthService

/**
result && result.items && result.items.map(dialog=>{
  if (dialog.name === name) {
    ConnectyCube.chat.dialog
    .subscribe(dialog._id)
    .then((dialog) => {})
    .catch((error) => {});
  }
})
*/
