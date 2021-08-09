import {request_get, request_post, user} from './query';

class act{

  getdetailcategorues = async () => {
    try {
      console.log('acts start activite acts')
      let acts =  await request_get("/activite_categories", "activitecategorie-index");
      acts = acts["hydra:member"];

      console.log('acts acts acts', acts)
      return acts;
    } catch (error) {
      console.warn(error);
    }
  }

  getDetailleActivity = async(id) => {
    try {
      let acts  = await request_get("/activities/"+id, 'activite-details');
      console.log('activite dtails', acts)
      return acts;
    } catch (error) {
      console.warn(error);
    }
  }
  getAllActivitybycategorie = async (id) => {
    try {
      let res = await request_get("/activities?categorie.id="+id, 'activitecategorie-index');
      console.log('ressss==>>>>', res)
      return res["hydra:member"]
    } catch (error) {
      console.warn(">> error fetching supcathegorie", error);
    }
  }
  getParticipant = async (id) => {
    try {
      let res = await request_get("/participants/"+id, 'activitecategorie-index');
      console.log('ressss==>>>>', res)
      return res
    } catch (error) {
      console.warn(">> error fetching supcathegorie", error);
    }
  }
}

export const activite  = new act();
