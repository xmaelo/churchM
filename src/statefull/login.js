import {request_get, request_post, user} from './query';
import jwt_decode from "jwt-decode";

class login_check{

  getUserInfo = async(username) =>{
      try {
        console.log('starting get user', username)
        let res = await request_get("/users?username="+username)
        console.log('>>> result getUser', res['hydra:member'][0].id)
        return res['hydra:member'][0];
      } catch (error) {
        console.error(error);
      }
  }
  getPersonne = async (id) => {
     try {
       let res = await request_get("/personnes/"+id.toString())
       console.log('>>> result getPersonne', res)
       return res;
     } catch (error) {
       console.error(error);
     }
  }
  auth = async (username, password) => {
    const response = await request_post({username: username, password: password}, '/login_check');
    const decode =  jwt_decode(response.token);
    user.setToken(response.token);
    const userInfo = await this.getUserInfo(decode?.username);
    const personne = await this.getPersonne(userInfo.id);
    user.setUserId(userInfo.id);
    return personne;
  }

}
export const login = new login_check();
