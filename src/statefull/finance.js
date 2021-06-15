import {request_get, request_post, user} from './query';

class finance_api {
  getUserPreparation = async() => {
      try {
        let res = await request_get("/preparations?personne="+user.getUserId(), 'preparation-index')
        console.log('>>> result getUserPreparation', res['hydra:member'])
        return res['hydra:member'];//hydra:member
      } catch (error) {
        console.error(error);
      }
    }

  getHistorique = async(idPrepa) => {
    try {
      let res = await request_get("/personnes/preparationbyfidele/"+user.getUserId()+"/"+idPrepa, 'preparation-index')
      console.log('>>> result getHistorique', res["hydra:member"])
      return res["hydra:member"];//hydra:member
    } catch (error) {
      console.error(error);
    }
  }

  getIdPreparations = async() => {
    try {
      let res = await request_get("/personnes/allpreparationid", 'preparation-index')
      console.log('>>> result getIdPreparations', res)
      return res;//hydra:member
    } catch (error) {
      console.error(error);
    }
  }

   getTypeContribution = async() => {
    try {
      let res = await request_get("/type_contributions?page="+user.getUserId(), 'preparation-index')
      console.log('>>> result getTypeContribution', res)
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  getEntreeFinanciere = async() => {
    try {
      let res = await request_get("/entree_financieres", 'user-show')
      console.log('>>> result getTypeContribution', res)
      return res;
    } catch (error) {
      console.warn(error);
    }
  }

  getAutreEntreeUser = async () => {
    try {
      let res = await request_get("/autre_entrees?contributeur.personne.id="+user.getUserId())
      console.log('>>> result getTypgddhdheContribution', res)
      return res["hydra:member"];
    } catch (error) {
      console.log(error);
    }
  }
}

export const finance = new finance_api();
