import React , {Component} from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Meteo from './meteo/meteo.js'
/*
export default function App() {
  return (
    <View style={styles.container}>
      <Meteo></Meteo>
    </View>
  );
}
*/

class App extends Component {

  constructor(){
    super();
    this.tab = [];
  }

  ajouterCarte(numero){

    this.tab.push(numero);
    this.setState({});
    console.log("HEHP")
  }

  render() {
    return <ScrollView style={styles.container}>
              {
                this.tab.map((item)=> <Meteo name={item}></Meteo>)
              }
              <Meteo ajoutDemande={this.ajouterCarte.bind(this)}></Meteo> 
            </ScrollView> 
  }  
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#44E7DE',
    padding: 50,
  },
  input: {
    backgroundColor: '#f0f'
  },
});
