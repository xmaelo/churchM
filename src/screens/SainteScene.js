import React, {useState, useEffect} from 'react';
import { View, ScrollView, useWindowDimensions, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button } from 'react-native-elements';
import { themes, color } from '../color';
import { showChart } from '../constante';
import Head from '../components/Head'
import FAB from 'react-native-fab'
import { LinearProgress } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { DataTable } from 'react-native-paper';
import PureChart from 'react-native-pure-chart';
import {finance} from '../statefull/finance'
import { useTranslation } from 'react-i18next';



export default function SainteScene({navigation}){
	const {t} = useTranslation();
	let n = null;

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

const FirstRoute = ({prepas}) => {
  return(
    	<View style={{ flex: 1}}>
    		<ScrollView>
          {prepas && prepas.length == 0 ?
    	  		<View style={{
    	  				...styles.DataTable,
    	  				...styles.container_card_main,
                height: hp('10%'),
                alignItems: 'center',
                justifyContent: 'center'
    	  			}}
    	  		>
              <Text style={{color: color.primary}} h4>{t('common.app.no_contrib')} !</Text>
    	  		</View>

            :
            <View>
              {prepas && prepas.map((allprepa, i) =>
        	  		<View style={{
        	  				...styles.DataTable,
        	  				...styles.container_card_main
        	  			}}
                  key={i}
        	  		>
        	  			<DataTable>
        	  				<DataTable.Row>
        	  					<View style={{justifyContent: "center", alignItems: "center"}} >
        					      	<Text style={{
        					      			...styles.datTitle,
        					      			color: color.primary
        					      		}}
        					      	>
        					      		{allprepa?.preparation?.intitule}
        					      	</Text>
        					    </View>
        				    </DataTable.Row>
        				    <DataTable.Header>
        				      	<DataTable.Title>
        				      		<Text style={styles.datTitle}>{t('common.app.day')}</Text>
        				      	</DataTable.Title>
        				      	<DataTable.Title numeric>
        				      		<Text style={styles.datTitle}>{t('common.app.type')}</Text>
        				      	</DataTable.Title>
        				      	<DataTable.Title numeric>
        				      		<Text style={styles.datTitle}>{t('common.app.amount')}</Text>
        				      	</DataTable.Title>
        				    </DataTable.Header>

                    {allprepa?.entreePreparationdetails?.map((entreePrepa, k)=>
          				    <DataTable.Row key={k}>
          				      	<DataTable.Cell>{entreePrepa.createdAt? new Date(entreePrepa.createdAt).getDate() : ''}</DataTable.Cell>
          				      	<DataTable.Cell numeric>{entreePrepa?.typecontribution?.intitule}</DataTable.Cell>
          				      	<DataTable.Cell numeric>{entreePrepa?.montant} fcfa</DataTable.Cell>
          				    </DataTable.Row>
                    )}
        				    <DataTable.Pagination
        				      page={1}
        				      numberOfPages={1}
        				      onPageChange={page => {
        				        console.log(page);
        				      }}
        				      label={"1-"+allprepa?.entreePreparationdetails?.length+" of "+1}
        				    />
        				  </DataTable>
        	  		</View>
              )}
            </View>
          }
  		</ScrollView>
  	  	<FAB
  	  		buttonColor={color.primary}
  	  		iconTextColor="#FFFFFF"
  	  		onClickAction={() => {console.log("FAB pressed"); n.navigate("Preparation")}}
  	  		visible={true}
  	  		iconTextComponent={<Ionicons name="add"/>}
  	  	/>
    	</View>
    );
};

const SecondRoute = ({chart1}) => {
	const [percent, setPercent] = useState(0)
  const [percentY, setPercentY] = useState(0)
  const [percentD, setPercentD] = useState(0)
  const [prepaM, setPrepaM] = useState(0)
  const [prepaY, setPrepaY] = useState(0)
  const [already, setAL] = useState(false)
	//setPercent(0)
	useEffect(()=>{
		
    (async()=>{
      setPercent((parseInt(new Date(Date.now()).getMonth())/12))
      const getEntreePrepa = await finance.getEntreePrepa();
      const h = getEntreePrepa['hydra:member']
      let last_mont = h[h.length-1]
      let s = 0
      let m = 0
      let data = [];

      last_mont.entreePreparationdetails && last_mont.entreePreparationdetails.map(p => {s = s+parseInt(p.montant)})
      //const percent = new Date().getDate() / 30
      setPercentD(new Date().getDate() / 30)
      setPercentY((new Date().getMonth()+1)/ 12)
      setPrepaM(s)
      h&&h.map(p =>{
        let loc = 0
        p&&p.entreePreparationdetails&&p.entreePreparationdetails.map(i=>
          {
            m = m+parseInt(i.montant)
            loc = loc+parseInt(i.montant)
          }
        )
        data.push({x: p?.preparation?.intitule, y: loc})
      })
      sampleData[0].data = data
      setPrepaY(m)
      setAL(true)
      console.log('getEntreePrepagetEntreePrepagetEntreePrepa', data)
    })()
  }, [])
	return(
	  <View style={{ flex: 1}}>
	  		<View style={styles.circle}>
          <View style={styles.progressCircle} >
              <Text style={{...styles.titleP, fontSize: 15}}>{t('common.app.mois_actuel')}</Text>
              <Progress.Circle
              size={wp('25%')}
              progress={percentD}
              showsText
              formatText={(val) => <Text style={{...styles.titleP, fontSize: 12}}>{prepaM+" FCFA"}</Text>}
              color={color.green}
            />
            </View>
            <View style={styles.progressCircle} >
              <Text style={{...styles.titleP, fontSize: 15}}>{t('common.app.annee_cours')}</Text>
              <Progress.Circle
              size={wp('25%')}
              progress={percentY}
              showsText
              formatText={(val) =>  <Text style={{...styles.titleP, fontSize: 12}}>{prepaY+" FCFA"}</Text>}
              color={color.primary}
            />
            </View>
        </View>


		    <View style={styles.progressCircle} >
		    	<Text style={styles.titleP}>{t('common.app.progress_prepa')}</Text>
		    	<Progress.Bar progress={percent} width={220} />
		    	<View style={{paddingHorizontal: wp('6%')}}>
					{already&&<PureChart data={sampleData} type='bar' height={hp('30%')} />}
		    	</View>
		    </View>
	  </View>
	)
};

const lab = {
	'Historique': 'time-outline',
	'Evolution': 'analytics-outline'
}


const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: color.primary }}
    style={{ backgroundColor: 'white'}}
    renderLabel={({ route, focused }) => (
    	<View style={styles.end}>
    		{focused &&<Ionicons name={lab[route.title]} size={24} style={{paddingRight: 20}} color={color.primary}/>}
		    <Text style={{ color: !focused ?'black' : color.primary, margin: 5, fontSize: 17 }}>
		      {route.title}
		    </Text>
	    </View>
	)}
  />
);

	n = navigation;
	const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [chart1, setChart1] = React.useState([]);
    const [prepass, setPrepa] = React.useState([]);
    const [routes] = React.useState([
    	{ key: 'first', title: t('common.app.history') },
    	{ key: 'second', title: 'Evolution' },
    ]);

    const renderScene = SceneMap({
    	first: () => <FirstRoute prepas={prepass} chart1={chart1}/>,
    	second: () => <SecondRoute prepas={prepass} chart1={chart1}/>,
    });

    useEffect(() => {
      (async()  => {
        const getEntreePrepa = await finance.getEntreePrepa();
        const h = getEntreePrepa['hydra:member']
        setPrepa(h);
      })();
      return;
    }, [])

	return(
		<>
			<Head screen={t('common.app.sainte_cene')} n={navigation}/>
			<TabView
			  renderTabBar={renderTabBar}
		      navigationState={{ index, routes }}
		      renderScene={renderScene}
		      onIndexChange={setIndex}
		      initialLayout={{ width: layout.width }}
		    />
		</>
	)
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('8%'),
    flex: 1
  },
  circle: {
     flexDirection: 'row',
     alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: hp('2%')
   },
  titleP: { fontSize: 18, color: color.textSeconday, paddingBottom: hp('2%') },
  progressCircle: {
  	alignItems: 'center',
  	justifyContent: 'center',
  	marginTop: hp('3%')
  },
  DataTable: {
  	paddingHorizontal: wp('3%')
  },
  datTitle: {
  	fontSize: 16,
  },
  end: {
  	flexDirection: 'row',
  	justifyContent: 'space-around',
  	alignItems: 'center',
  },
  end2: {
  	flexDirection: 'row',
  	//alignItems: 'center',
  },
  container_card_main: {
    backgroundColor: 'white',
    marginLeft: hp('2%'),
    marginRight: hp('2%'),
    borderRadius: 10,
    minHeight: hp('5%'),
    marginTop: hp('2%'),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,

    elevation: 2,
  },
  container_all_dec: {
    // alignItems: 'left',
    marginLeft: hp('3%'),
    paddingTop: hp('2%')
  },
  h1: {fontSize: 18, fontWeight: 'bold', color: color.textSeconday}
})
