
const apibaselink = 'https://api2.eec-messamokolo.net/api';

let userId = null;
let token = null;

class user_class {
  getUserId = () => userId;
  setUserId = (id) =>{ userId = id};

  getToken = () => token;
  setToken = (t) => {token = t};
}

export const user = new user_class();

export function request_post(body, route){
  const r = fetch(apibaselink+route, {
       method: 'POST',
       headers: {
        'pass': '9afac0b31fb7c699ef123aaeefe18cafa7b40921',
        'cle': 'ame-index',
        'database': 'churchv3M_2021',
        'authorization': 'Bearer '+user.getToken(),
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
export function request_get(route){
  console.log('route route route', route)
  const r = fetch(apibaselink+route, {
       method: 'GET',
       headers: {
         'pass': '9afac0b31fb7c699ef123aaeefe18cafa7b40921',
         'cle': 'ame-index',
         'database': 'churchv3M_2021',
         'authorization': 'Bearer '+user.getToken(),
         'Content-Type': 'application/json'
    }
  }).then(
    (response) => response.json()
  ).then(
    (responseJson) => {
      return responseJson;
    }
  )
  return r;
}
