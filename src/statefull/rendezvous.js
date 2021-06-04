import {request_get, request_post, request_put, user} from './query';

class rendezvous_api {

    getAll = async() => {
        try {
            let res = await request_get("/rendezvouses?demandeur.id="+user.getUserId(), 'rendezvous-index');
            return res['hydra:member'];
        } catch (error) {
            console.log(error);
        }
      };

    getRdvPasteur = async (idUser) => {
        try {
            return await request_get("/rendezvouses?responsable.id="+idUser.toString(), 'rendezvous-index');
        } catch (error) {
            console.log(error);
        }
    };

    getPlanning = async (idPasteur, jour) => {
        try {
            var res = await request_get("/disponibilites?pasteur.id="+idPasteur.toString()+"&jour="+jour, 'rendezvous-index'); 
            return await res["hydra:member"];   
        } catch (error) {
            console.log(error);
        }
    }

    editRdv = async (idRdv, data) => {
        return await request_put('/rendezvouses/'+idRdv.toString(), data, 'rendezvous-edit');
    }

    create = async (rdvData) => {
        try {   
            return await request_post("/rendezvouses", rdvData, 'rendezvous-add');
        } catch (error) {
            console.log(error);
        }
      }
}

export const rendezvous = new rendezvous_api();