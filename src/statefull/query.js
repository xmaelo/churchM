
const apibaselink = 'https://api.church-digital.net/api';

let userId = null;
let token = null;
let userInfo = {};
const cle = 'user-show'
let userObj = {};
class user_class {
  getUserId = () => userId;
  setUserId = (id) =>{ userId = id};

  getToken = () => token;
  setToken = (t) => {token = t};

  getUserInfo = () => userInfo;
  setUserInfos = (u) => {userInfo = u};

  setUserOjt = (u) => {userObj = u};
  get = () => userObj;
}

export const user = new user_class();

export function request_post(body, route){
  const r = fetch(apibaselink+route, {
       method: 'POST',
       headers: {
        'pass': '9afac0b31fb7c699ef123aaeefe18cafa7b40921',
        'cle': 'user-show',
        'database': 'churchv3M2_2021',
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
export function request_put(body, route, cle){
  const r = fetch(apibaselink+route, {
       method: 'POST',
       headers: {
        'pass': '9afac0b31fb7c699ef123aaeefe18cafa7b40921',
        'cle': cle ? cle : 'user-show',
        'database': 'churchv3M2_2021',
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
export function request_file(body, route, cl=cle){
  const r = fetch(apibaselink+route, {
       method: 'POST',
       headers: {
        'pass': '9afac0b31fb7c699ef123aaeefe18cafa7b40921',
        'cle': cl,
        'database': 'churchv3M2_2021',
        'authorization': 'Bearer '+user.getToken(),
        'Content-Type': 'multipart/form-data'
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

export function request_get(route, clx=cle){
  const authorization = clx ? 'Bearer '+user.getToken():  null;
  console.log('route route route', route, clx)
  console.log('route route route', authorization)
  const r = fetch(apibaselink+route, {
       method: 'GET',
       headers: {
         'pass': '9afac0b31fb7c699ef123aaeefe18cafa7b40921',
         'cle': clx,
         'database': 'churchv3M2_2021',
         'authorization': authorization,
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