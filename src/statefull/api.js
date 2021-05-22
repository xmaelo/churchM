import jwt_decode from "jwt-decode";
import React, {Component} from 'react';

function login_check (username, password) {
  const r = fetch('https://api2.eec-messamokolo.net/api/login_check', {
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
      const dt =  jwt_decode(responseJson.token);
      console.log('>>>>>>>>>> decode token, decode token ', dt)
      return dt;
    }
  )
  return r;
}

class remote_api extends Component{

    constructor(){
      super();
      this.state = {
      }
    }

      login = async (username, password)  =>{
        const res = await login_check(username, password);
        return res;
      }

      return_state = () => this.state;

}

export const api = new remote_api();
