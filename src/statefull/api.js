import jwt_decode from "jwt-decode";
import React, {Component} from 'react';

const apibaselink = 'https://api2.eec-messamokolo.net/api';
///https://api2.eec-messamokolo.net/api/users?username=admin
let token;
function request_post(body, route){
  const r = fetch(route, {
       method: 'POST',
       headers: {
        'pass': '9afac0b31fb7c699ef123aaeefe18cafa7b40921',
        'cle': 'ame-index',
        'database': 'churchv3M_2021',
        'authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(
    (response) => response.json()
  ).then(
    (responseJson) => {
      console.log('>>>>>>>>>> result api ', responseJson)
      return responseJson;
    }
  )
  return r;
}
function request_get(route){
  console.log('route route route', route)
  const r = fetch(route, {
       method: 'GET',
       headers: {
         'pass': '9afac0b31fb7c699ef123aaeefe18cafa7b40921',
         'cle': 'ame-index',
         'database': 'churchv3M_2021',
         'authorization': 'Bearer '+token,
         'Content-Type': 'application/json'
    }
  }).then(
    (response) => response.json()
  ).then(
    (responseJson) => {
      console.log('>>>>>>>>>> result api ', responseJson)
      return responseJson;
    }
  )
  return r;
}



class remote_api {
    login_check  = (username, password) => {
      const r = fetch(apibaselink+'/login_check', {
           method: 'POST',
           headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"username":username,"password":password})
      }).then(
        (response) => response.json()
      ).then(
        (responseJson) => {
          console.log('>> resut login', responseJson.token)
          token = responseJson.token;
          const dt =  jwt_decode(responseJson.token);
          console.log('>>>>>>>>>> decode token, decode token ', dt)
          return dt?.username;
        }
      )
      return r;
    }

    getUserInfo = async(username) =>{
        try {
          console.log('starting get user', username)
          let res = await request_get(apibaselink+"/users?username="+username)
          console.log('>>> result getUser', res['hydra:member'][0].id)
          return res['hydra:member'][0];
        } catch (error) {
          console.error(error);
        }
    }

     getPersonne = async (id) => {
        try {
          let res = await request_get(apibaselink+"/personnes/"+id.toString())
          console.log('>>> result getPersonne', res)
          return res;
        } catch (error) {
          console.error(error);
        }
    }
    getUserPreparation = async() => {
      try {
        let res = await request_get(apibaselink+"/preparations?personne="+id)
        console.log('>>> result getUserPreparation', res)
        return res;
      } catch (error) {
        console.error(error);
      }
      }

     getTypeContribution = async() => {
      try {
        let res = await request_get(apibaselink+"/type_contributions?page="+id)
        console.log('>>> result getTypeContribution', res)
        return res;
      } catch (error) {
        console.error(error);
      }
    }

    login = async (username, password)  => {
      const res = await this.login_check(username, password);
      const user = await this.getUserInfo(res);
      const personne = await this.getPersonne(user.id);
      return personne;
    }
}


export const api = new remote_api();
