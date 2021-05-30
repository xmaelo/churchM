import {request_get, request_post, user} from './query';

class act{

  getdetailcategorues = async () => {
    try {
      let acts =  await request_get("/activite_categories", '');
      acts = acts["hydra:member"];

      console.log('acts acts acts', acts)
    } catch (error) {
      console.warn(error);
    }
  }
}

export const activite  = new act();
