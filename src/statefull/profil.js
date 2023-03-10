import {request_get, request_post, request_put_notkn, request_post_notkn, user, request_file, request_put, request_file2} from './query';

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

  getAllUser = async (status) => {
    try {
      var res = await request_get("/personnes?status="+status, 'fidele-index');
      return res["hydra:member"];
    } catch (error) {
      console.log(error);
    }
  }

  postFotos = async (base) => {
    try {
       let tofd =  await request_put(base, "/personnes/"+user.getUserId(), 'fidele-add');
    } catch (error) {
      console.log('Erreur de Récupération des Regions',error);
    }
  }


  convertBase64ToBlob = (img) => {
    const sliceSize = 512;
    const byteCharacters = window.atob(img.data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      byteArrays.push(new Uint8Array(byteNumbers));
    }
    return new Blob(byteArrays, { type: img.mime });
  }

  postPhoto = async(ob) => {
    // try{
      // let bl = await this.convertBase64ToBlob(ob)
      // let ext = ob.path.split('.')
      // ext = ext[ext.length-1];
      console.log('exxxxxxxxxxxxxxxxxxxx', ob);
      // let formdata = new FormData();
      // formdata.append('image', bl, user.getUserInfo().code+'.'+ext);
      let res =  await request_file2(ob, "/personnes/photo", 'photo-edit');
      return res;
    // }catch(e){
    //   console.log('error pot photo', e)
    // }

  }

  updatePersonne = async (data) => {
    try {
      console.log('acts start activite acts')
      let acts =  await request_put(data, "/personnes/"+user.getUserId(), "fidele-add");
      console.log('acts acts acts', acts)
      if(acts){user.setUserInfos(acts);}
      return acts;
    } catch (error) {
      console.warn(error);
    }
  }

  createPersonne = async (data) => {
    console.log('data data', data)
      var res = await request_post_notkn("/fidele/inscription", data, 'inscription-save');
      console.log('data data', res)
      return res;
  }

  passChange = async (data) => {
    return await request_post_notkn("/users/passchange", data,'pass-change');
  }

  smsConfirm =  async (data) => {
    return request_put_notkn("/users/smsconfirm", data,'sms-confirm');
  }
}


export const profil = new onInfos();
