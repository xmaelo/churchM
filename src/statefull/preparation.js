import {request_get, request_post, user} from './query';

class preparation{

  getActualPrepa = async () => {
    try {
      let res = await request_get("/personnes/actifpreparation", 'preparation-index')
      console.log('>>> result getUserPreparation', res)
      return res;//hydra:member
    } catch (error) {
      console.error(error);
    }
  }

  getpaymentlink = async (items) => {
   try {
     const response = await request_post('/personnes/actifpreparation', items, 'payment-link');
     console.log('>>>>>> response payement ', response)
     return response
   } catch (error) {
     console.warn(error);
   }
 }
}


export const prepas = new preparation();
export const auth = user;
