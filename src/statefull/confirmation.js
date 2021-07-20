import {request_get, request_post, request_post_notkn} from './query';

class confirmation{

  getActualPrepa = async () => {
    try {
      let res = await request_get("/personnes/actifpreparation", 'preparation-index')
      console.log('>>> result getUserPreparation', res)
      return res;//hydra:member
    } catch (error) {
      console.error(error);
    }
  }

  confirmFidele = async (code) => {
  	try{
  		let res = await request_post_notkn("/personnes/fidelebycode", code, 'check-code')
  		return res;
  	}catch(e){
  		console.log('verrifie token error', e)
  		return;
  	}
  }

  createUser = async (data) => {
    try {
    	let res = await request_post_notkn("/personnes/createuser", data, 'create-user')
  		return res;
    } catch (error) {
       console.log("error create user", error);
    }
  }

}


export const confirm = new confirmation();
