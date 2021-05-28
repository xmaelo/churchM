import {request_get, request_post, user} from './query';

class onInfos{
   userData = () => user.getUserInfo();

   getRegion = async () => {
      try {
         let rg =  await request_get('/get_regions', 'region-all');
         rg = rg['hydra:member'].find((r)=>r.id === user.get().regionOrigine)
         console.log('v======= v', user.get())
         //dprt = rg[0].departements
         //dprNom = dprt.find(()=> dp.id === user.get().departementOrigine)
         //return {region: rg[0].nom, departmt: dprNom[0].nom}
      } catch (error) {
        console.log('Erreur de Récupération des Regions',error);
      }
  }
}


export const profil = new onInfos();
