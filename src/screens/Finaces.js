import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {logo} from "../assets"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Input, Button } from 'react-native-elements';
import { themes, color } from '../color';
import Head from '../components/Head'
import { ProgressBar } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import PureChart from 'react-native-pure-chart';
import { ListItem, Icon } from 'react-native-elements'
import FAB from 'react-native-fab'
import {finance} from '../statefull/finance'
import { showChart2 } from '../constante';

const list = [
  {
    title: 'Aide au pasteur',
    icon: 'help'
  },
  {
    title: 'Construction',
    icon: 'help'
  }
]

let sampleData = [
    {
    	seriesName: 'test2',
		  data:[],
	    color: color.primary
    }
  ]

export default function Finaces({navigation}){

	const [percent1, setPercent1] = useState(0)
  const [chart, setChart] =  useState(sampleData);
  const [p1, setP1] =  useState(0);
  const [p2, setP2] =  useState(0);
  const [p0, setA] =  useState(0);

  useEffect(() => {
    (async()  => {
      const autreFinaces = await finance.getAutreEntreeUser();
      const d = showChart2(autreFinaces);
      console.log('chart chart', d)
      setChart(d.chart);
      setP1(d.p1);
      setP2(d.p2);
      setA(d.p0);
    })();
    return;
  }, [])

	return(
		<View>
			<ScrollView>
				<View style={styles.container} >
					<Head screen={"Mes Finances"} n={navigation}/>
					<View style={styles.container2}>
						<View style={styles.text} >
							<Text style={{fontSize: 15}} >Mes Contributions et Dons</Text>
						</View>
						<View style={styles.ProgressBar}>
							<ProgressBar
								progress={0.63}
								color={"#C1C1C1"}
								style={{backgroundColor: "#394247"}}
							/>
						</View>
						<View style={styles.circle}>
							<View style={styles.progressCircle} >
				  				<Text style={styles.titleP}>Mois actuel</Text>
						  		<Progress.Circle
									size={wp('25%')}
									progress={p0}
									showsText
									formatText={(val) =>  parseInt(val*100) +"%"}
									color={color.green}
								/>
						    </View>
						    <View style={styles.progressCircle} >
				  				<Text style={styles.titleP}>Trimestre</Text>
						  		<Progress.Circle
									size={wp('29%')}
									progress={p1}
									showsText
									formatText={(val) =>  parseInt(val*100) +"%"}
									color={color.red}
								/>
						    </View>
						    <View style={styles.progressCircle} >
				  				<Text style={styles.titleP}>Année entière</Text>
						  		<Progress.Circle
									size={wp('25%')}
									progress={p2}
									showsText
									formatText={(val) =>  parseInt(val*100) +"%"}
									color={color.primary}
								/>
						    </View>
						</View>

						<View style={{...styles.text, paddingTop: hp('3%')}} >
							<Text style={{fontSize: 15}} >Evoluation de mes contributions</Text>
						</View>
						<View style={styles.ProgressBar}>
							<ProgressBar
								progress={0.53}
								color={"#C1C1C1"}
								style={{backgroundColor: "#394247"}}
							/>
						</View>
						<View style={{paddingTop: hp('5%'), paddingHorizontal: wp('2%')}} >
							<PureChart data={chart ? chart : sampleData} type='bar' height={hp('30%')} />
						</View>

						<View style={{...styles.text, paddingTop: hp('3%')}} >
							<Text style={{fontSize: 15}} >Faire un Don</Text>
						</View>
						<View style={styles.ProgressBar}>
							<ProgressBar
								progress={0.83}
								color={"#C1C1C1"}
								style={{backgroundColor: "#394247"}}
							/>
						</View>
						<View style={{paddingTop: hp('5%'), paddingHorizontal: wp('2%')}} >
							<View>
							  {
							    list.map((item, i) => (
							      <ListItem key={i} bottomDivider>
							        <Icon name={item.icon} />
							        <ListItem.Content>
							          <ListItem.Title>{item.title}</ListItem.Title>
							        </ListItem.Content>

							        <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center"}} >
							        	<Text>{"FCFA 3000 "}</Text>
							        	<Button title="Don !" type="outline" buttonStyle={{padding: 2, paddingHorizontal: 5}} />
							        </View>
							      </ListItem>
							    ))
							  }
							</View>
						</View>
					</View>
				</View>
				<View style={{height: 60}} />
			</ScrollView>
			<FAB
		  		buttonColor={color.primary}
		  		iconTextColor="#FFFFFF"
		  		onClickAction={() => {navigation.navigate('Constributions')}}
		  		visible={true}
		  		iconTextComponent={<Ionicons name="add"/>}
		  	/>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container2: {
    paddingHorizontal: wp('2%'),
    paddingTop: hp('2%')
  },
  ProgressBar: {
    paddingRight: wp('3%'),
    paddingTop: hp('1%')
   },
   text: {justifyContent: "flex-end", flexDirection: 'row'},
   titleP: { fontSize: 16, color: "#7F7F9A", paddingBottom: hp('2%') },
   progressCircle: {
  		alignItems: 'center',
  		justifyContent: 'center'
   },
   circle: {
   	flexDirection: 'row',
   	alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: hp('2%')
   }
})
