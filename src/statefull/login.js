import {request_get, request_post, user} from './query';
import jwt_decode from "jwt-decode";

class login_check{

  getUserInfo = async(username) =>{
      try {
        console.log('starting get user', username)
        let res = await request_get("/users?username="+username, "user-show")
        console.log('>>> result getUser', res['hydra:member'][0].id)
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
  auth = async (username, password) => {
    try{
      const response = await request_post('/login_check', {username: username, password: password}, 'user-show');
      const decode =  jwt_decode(response.token);
      user.setToken(response.token);
      const userInfo = await this.getUserInfo(decode?.username);
      console.log('userInfo.id userInfo.id userInfo.id', userInfo.id)
      const personne = await this.getPersonne(userInfo.personne.id);
      user.setUserId(userInfo.personne.id);
      user.setUserOjt(decode);
      user.setUserInfos(personne);
      return personne;
    }catch(e){
      console.log('errrrrr log', e)
    }
  }

}
export const login = new login_check();
