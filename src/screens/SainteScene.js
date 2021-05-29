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
  let prepas = [];
const FirstRoute = () => {
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
              <Text style={{color: color.primary}} h4>Aucune Contribution Faite !</Text>
    	  		</View>

            :
            <View>
              {prepas.map((allprepa, i) =>
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
        					      		{allprepa.intitule}
        					      	</Text>
        					    </View>
        				    </DataTable.Row>
        				    <DataTable.Header>
        				      	<DataTable.Title>
        				      		<Text style={styles.datTitle}>Jour</Text>
        				      	</DataTable.Title>
        				      	<DataTable.Title numeric>
        				      		<Text style={styles.datTitle}>Type</Text>
        				      	</DataTable.Title>
        				      	<DataTable.Title numeric>
        				      		<Text style={styles.datTitle}>Montant</Text>
        				      	</DataTable.Title>
        				    </DataTable.Header>

                    {allprepa.entreePreparation.map((entreePrepa, k)=>
          				    <DataTable.Row key={k}>
          				      	<DataTable.Cell>{entreePrepa.createdAt? new Date(entreePrepa.createdAt).getDate() : ''}</DataTable.Cell>
          				      	<DataTable.Cell numeric>{entreePrepa?.intitule}</DataTable.Cell>
          				      	<DataTable.Cell numeric>{entreePrepa?.montant} fcfa</DataTable.Cell>
          				    </DataTable.Row>
                    )}
        				    <DataTable.Pagination
        				      page={1}
        				      numberOfPages={allprepa.entreePreparation ? (allprepa.entreePreparation.length / 5) : 1}
        				      onPageChange={page => {
        				        console.log(page);
        				      }}
        				      label={"1-1 of "+1}
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

const SecondRoute = () => {
	const [percent, setPercent] = useState(0)
	//setPercent(0)
	useEffect(()=>{
		setPercent((parseInt(new Date(Date.now()).getMonth())/12))
    console.log('personne widthPercentageToDP====>>>', percent)
	}, [])
	return(
	  <View style={{ flex: 1}}>
	  		<View style={styles.progressCircle} >
	  			<Text style={styles.titleP}>Mois Préparés</Text>
		  		<Progress.Circle
					size={123}
					progress={percent}
					showsText
					formatText={(val) =>  parseInt(val*100) +"%"}
					color={color.primary}
				/>
		    </View>

		    <View style={styles.progressCircle} >
		    	<Text style={styles.titleP}>Evolution de mes préparations</Text>
		    	<Progress.Bar progress={percent} width={220} />
		    	<View style={{paddingHorizontal: wp('6%')}}>
					<PureChart data={sampleData} type='bar' height={hp('30%')} />
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


export default function SainteScene({navigation}){

	n = navigation;
	const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [chart1, setChart1] = React.useState([]);
    const [prepass, setPrepa] = React.useState([]);
    const [routes] = React.useState([
    	{ key: 'first', title: 'Historique' },
    	{ key: 'second', title: 'Evolution' },
    ]);

    const renderScene = SceneMap({
    	first: FirstRoute,
    	second: SecondRoute,
    });

    useEffect(() => {
      (async()  => {
        const preparations = await finance.getIdPreparations();
        if(preparations){
          let rangePrepa = [];
          for (let i = 0; i < preparations.length; i++) {
               let historique = await finance.getHistorique(preparations[i].id);
               historique = historique || [{intitule: '', montant: 0, createAt: new Date(Date.now())}];
               rangePrepa.push({
                    'id': preparations[i].id,
                    'intitule': preparations[i].intitule,
                    'entreePreparation': historique
                });
            }
            prepas = rangePrepa;
            setPrepa(prepas);
            sampleData = showChart(rangePrepa);
            setChart1(sampleData);
        }
      })();
      return;
    }, [])

	return(
		<>
			<Head screen={"Sainte Cène"} n={navigation}/>
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
