import {request_get, request_post, request_get_notkn, request_get_notkn2,user} from './query';

class params_api {

    getParameters = async () => {
        try {
          return await request_get_notkn2("/personnes/apikeymobile");
        } catch (error) {
          console.warn("ERREUR DE RECUPERATION HEADERS: ",error);
        }
    }

    getAll = async () => {
        try {
          var res = await request_get_notkn('/inscription', 'inscription-info');
          return res["hydra:member"];
        } catch (error) {
          console.log('Erreur de Récupération des Zones',error);
        }
      }
    
      getAll2 = async () => {
        try {
          var res = await request_get_notkn('/get_regions', 'region-all');
          return res["hydra:member"];
        } catch (error) {
          console.log('Erreur de Récupération des Regions',error);
        }
      }
  
}

export const params = new params_api();
