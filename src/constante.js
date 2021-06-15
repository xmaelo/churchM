import { themes, color } from './color';

let sampleData = [
    {
    	seriesName: 'test2',
			data:[
        {x: 'JAN', y: 0},
        {x: 'FEV', y: 0},
        {x: 'MAR', y: 0},
        {x: 'AVR', y: 0},
        {x: 'MAI', y: 0},
        {x: 'JUN', y: 0},
        {x: 'JUL', y: 0},
        {x: 'AOU', y: 0},
        {x: 'SEP', y: 0},
        {x: 'OCT', y: 0},
        {x: 'NOV', y: 0},
        {x: 'DEC', y: 0}
      ],
	    color: color.primary
     }
   ]
export const showChart  = (lesPrepas2) => {
    let montants = sampleData[0].data
    let montant1= 0, montant2 =0, montant3 =0, montant4 =0, montant5 =0, montant6 =0, montant7 =0, montant8 =0,montant9 =0,montant10 =0, montant11 = 0, montant12 =0;
    for (let i = 0; i <= lesPrepas2.length; i++) {
      if (lesPrepas2[i] && lesPrepas2[i].entreePreparation && lesPrepas2[i].entreePreparation.length) {
        for (let entreePrepa of lesPrepas2[i].entreePreparation) {
            if(entreePrepa.createdAt){
              const theDate  = new Date(entreePrepa.createdAt)
              console.log('theDate.getMonth() theDate.getMonth()', theDate.getMonth());
              switch (theDate.getMonth()) {
              case 0:
                montant1 += entreePrepa.montant;
                montants.splice(0,1,montant1);
                console.log('montant & 1', montant1)
                break;
              case 1:
                montant2 += entreePrepa.montant;
                montants.splice(1,1, {x: 'JAN', y: montant2});
                break;
              case 2:
                montant3 += entreePrepa.montant;
                montants.splice(2,1,{x: 'FEV', y: montant3});
                break;
              case 3:
                montant4 += entreePrepa.montant;
                montants.splice(3,1,{x: 'MAR', y: montant4});
                break;
              case 4:
                montant5 += entreePrepa.montant;
                montants.splice(4,1, {x: 'AVR', y: montant5});
                break;
              case 5:
                montant6 += entreePrepa.montant;
                montants.splice(5,1,{x: 'MAI', y: montant6});
                break;
              case 6:
                montant7 += entreePrepa.montant;
                montants.splice(6,1, {x: 'JUI', y: montant7});
                break;
              case 7:
                montant8 += entreePrepa.montant;
                montants.splice(7,1,{x: 'OUT', y: montant8});
                break;
              case 8:
                montant9 += entreePrepa.montant;
                montants.splice(8,1, {x: 'SEP', y: montant9});
                break;
              case 9:
                montant10 += entreePrepa.montant;
                montants.splice(9,1,{x: 'OCT', y: montant10});
                break;
              case 10:
                montant11 += entreePrepa.montant;
                montants.splice(10,1,{x: 'NOV', y: montant11});
                break;
              case 11:
                montant12 += entreePrepa.montant;
                montants.splice(11,1,{x: 'DEC', y: montant12});
                break;
              default:

            }
            }


        }
        console.log('Tout les Montants:', montants);
      }
    }
    samp = sampleData.slice();
    samp[0].data = montants;
    console.log('sampleData[0].data sampleData[0].data', sampleData[0])
    return sampleData;
  }

export const showChart2  = (finaces) => {
    console.log('################################################""', finaces)
      let montants = sampleData[0].data
      let montant1= 0, montant2 =0, montant3 =0, montant4 =0, montant5 =0, montant6 =0, montant7 =0, montant8 =0,montant9 =0,montant10 =0, montant11 = 0, montant12 =0;
      try {
        //if (finaces.length >0) {
            for (let i = 0; i < finaces.length; i++) {
                  let finace = finaces[i]
                  console.log(' #######################""', finace)
                  if(finace.createdAt){
                    const theDate  = new Date(finace.createdAt)
                    console.log('theDate.getMonth() theDate.getMonth()', theDate.getMonth());
                    switch (theDate.getMonth()) {
                    case 0:
                      montant1 += finace.montant;
                      montants.splice(0,1,montant1);
                      console.log('montant & 1', montant1)
                      break;
                    case 1:
                      montant2 += finace.montant;
                      montants.splice(1,1, {x: 'JAN', y: montant2});
                      break;
                    case 2:
                      montant3 += finace.montant;
                      montants.splice(2,1,{x: 'FEV', y: montant3});
                      break;
                    case 3:
                      montant4 += finace.montant;
                      montants.splice(3,1,{x: 'MAR', y: montant4});
                      break;
                    case 4:
                      montant5 += finace.montant;
                      montants.splice(4,1, {x: 'AVR', y: montant5});
                      break;
                    case 5:
                      montant6 += finace.montant;
                      montants.splice(5,1,{x: 'MAI', y: montant6});
                      break;
                    case 6:
                      montant7 += finace.montant;
                      montants.splice(6,1, {x: 'JUI', y: montant7});
                      break;
                    case 7:
                      montant8 += finace.montant;
                      montants.splice(7,1,{x: 'OUT', y: montant8});
                      break;
                    case 8:
                      montant9 += finace.montant;
                      montants.splice(8,1, {x: 'SEP', y: montant9});
                      break;
                    case 9:
                      montant10 += finace.montant;
                      montants.splice(9,1,{x: 'OCT', y: montant10});
                      break;
                    case 10:
                      montant11 += finace.montant;
                      montants.splice(10,1,{x: 'NOV', y: montant11});
                      break;
                    case 11:
                      montant12 += finace.montant;
                      montants.splice(11,1,{x: 'DEC', y: montant12});
                      break;
                    default:

                  }
                  }
              }
          console.log('Tout les Montants:', montants);

          let a = 0;
          montants.forEach(montant => {
            if (montant.y != 0) {
              a += 1;
            }
          });

          let actualMonth = finaces.length> 0 ? new Date(finaces[finaces.length-1].createdAt) : new Date();
          let p0;
          if (actualMonth.getMonth() != 1) {
            p0 = (new Date(Date.now()).getDay()*1)/30;
          } else {
            p0 = (new Date(Date.now()).getDay()*1)/28;
          }
          console.log('_______________HGB______________', a)
          let pourcentage1;
          if (a == 3 || a == 6 || a == 9 || a == 12) {
            pourcentage1 = 100;
          } else if (a ==1 || a==4 || a== 7 || a == 10) {
            pourcentage1 = 33;
          } else if (a == 2 || a ==5 || a==8 || a ==11) {
            pourcentage1 = 66;
          }

          let pourcentage2 = (a)/12

          let samp = sampleData.slice();
          samp[0].data = montants;

          return {chart: samp, p1: pourcentage1, p2: pourcentage2, p0: p0};
        //}
        //return {chart: sampleData, p1: 0, p2: 0, actualMonth: 0, p0: 0}
      } catch (e) {
        console.log("errorr=================>>>", e);
        return {chart: sampleData, p1: 0, p2: 0, actualMonth: 0, p0: 0}
      }
    }
