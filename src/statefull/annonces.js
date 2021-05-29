import {request_get, request_post, user} from './query';


class ann{

  getAnnonce = async ()  => {
    try{
      //let anns = await request_get("https://eec-messamokolo.net/wp-json/wp/v2/posts")

      const anns = await fetch("https://eec-messamokolo.net/wp-json/wp/v2/posts", {
           method: 'GET',
           headers: {'Content-Type': 'application/json'}
      }).then(
        (response) => response.json()
      ).then(
        (responseJson) => {
          return responseJson;
        }
      )

      return anns;
    }catch(error){
      console.log(error);
      return [];
    }
  }
}

export const annonce = new ann();
