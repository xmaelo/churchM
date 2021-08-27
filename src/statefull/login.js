import {request_get, request_post, user} from './query';
import jwt_decode from "jwt-decode";
//import AuthService from '../services/auth-service'
//import ChatService from '../services/chat-service'

class login_check{

  getUserInfo = async(username) =>{
      try {
        //console.log('starting get user', username)
        let res = await request_get("/users?username="+username, "user-show")
        console.log('>>> result getUser', res)
        return res['hydra:member'][0];
      } catch (error) {
        console.error(error);
      }
  }
  getPersonne = async (id) => {
     try {
       let res = await request_get("/personnes/"+id.toString(), 'fidele-details')
       console.log('>>> result getPersonne', res)
       return res;
     } catch (error) {
       console.error(error);
     }
  }
  
  send = async(ob, text) => {
    try{
      const i =  await request_post("/mail/sendmail", {email: 'email@emaim.com', objet: ob, content: text});
      console.log('i i i i', i)
      return i;
    }catch(e){ 
      console.log('error')
    }
  }
  getInfo = async() => {
    try{
      const i =  await request_get("/egliseparams", 'parametre-index');
      console.log('i i i i', i)
      if(i && i['hydra:member']){
        user.setEinfos(i['hydra:member'][0])
        return i['hydra:member'][0]
      } 
      return
    }catch(e){
      console.log('error')
    }
  }
  auth = async (username, password) => {
    try{
      console.log('statrd auth')
      const response = await request_post('/login_check', {username: username, password: password}, 'user-show');
      console.log('_____________TOKEN____________',response)
      if(response.message) return response
      const decode =  jwt_decode(response.token);
      user.setToken(response.token);
      const userInfo = await this.getUserInfo(decode?.username);
      console.log('userInfo userInfo userInfo', userInfo)
      user.setRole(userInfo?.apiRole?.intitule)
      const personne = await this.getPersonne(userInfo.personne.id);
      console.log('personne personne personne', personne)
      user.setUserId(userInfo.personne.id);
      user.setUserOjt(decode);
      user.setUserInfos(personne);
      //await AuthService.init({login: username+'@gmail.com', password: password+"__"+password, full_name: personne?.nom})
      //ChatService.setUpListeners()
      return personne;
    }catch(e){
      console.log('errrrrr log', e)
    }
  }

  personne = () => user.getUserInfo()

}
export const login = new login_check();
