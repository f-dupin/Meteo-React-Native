import React , {Component} from 'react';
import {StyleSheet, TextInput ,View , Button , Text , Image} from 'react-native';

export default class Meteo extends Component {

    constructor(props) {
      super(props)
      this.meteo = null;
      this.name = this.props.name;
      this.state = {};
      this.tab = [];
      this.refInput = React.createRef();
      this.error = 0;
    }
  
    componentDidMount() {
      if (this.error != 0 || this.props.name) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q="+this.name+"&APPID=fa956c3c094574e034c48dc970215933")
        .then(res => res.json())
        .then(
          (result) => {
                        if (result.cod == "200") {
                          this.setState({"meteo" : result});
                        }
                        else if (result.cod == "400" || result.cod == "401" || result.cod == "402" || result.cod == "403" || result.cod == "404") {
                          this.error = 1;
                        }
                        console.log(result.cod)
                      },
          (error) => {console.log("trolled")}
            )
      }
    }
  
  
  
    ajoutCarte(ville,event){
        
        var nombre = ville;
        this.props.ajoutDemande(nombre);
        this.refInput.current.value = "";
    }
  
  
    render() {
      if (this.state.meteo) {
        if (this.props.name)
        return <View style={styles.cardMeteo}>
                  <Text style={styles.TitreVille}>{this.props.name}</Text>
                  <View>
                    <View style={styles.Align}>
                      <Image style={styles.imageMeteo} source={{uri : "http://openweathermap.org/img/w/"+this.state.meteo.list[0].weather[0].icon+".png"}}></Image>
                    </View>
                    <View style={styles.contentView}>
                      <Text style={styles.span}>températures :</Text>
                      <Text> {(this.state.meteo.list[0].main.temp-273.15).toFixed(1)}°C</Text>
                    </View>
                    <View style={styles.contentView}>
                      <Text style={styles.span}>Humidité :</Text>
                      <Text> {this.state.meteo.list[0].main.humidity+"%"}</Text>
                    </View>
                    <View style={styles.contentView}>
                      <Text style={styles.span}>Vent :</Text>
                      <Text> {(this.state.meteo.list[0].wind.speed*1.60934).toFixed(1)+"Km/h"}</Text>
                    </View>
                  </View>
                </View>
      }
      else if (this.error != 1 && !this.props.name) {
                  return <View style="Carte plus">
                    <TextInput style={styles.input} ref={this.refInput} placeholder="Entrez une ville" placeholderTextColor="#7a7a7a"></TextInput>
                    <Button style={styles.button} title="Valider" onPress={(event)=>this.ajoutCarte(this.refInput.current._lastNativeText , event)}>Valider</Button>
                  </View>;
                  }
      else return <View style="Carte plus">
                      <Text>La ville {this.name} n'existe pas</Text>
                  </View>;
    }
  }
  
  const styles = StyleSheet.create({
    input: {
      borderWidth: 2,
      paddingTop: 10, 
      paddingBottom: 10, 
      paddingLeft: 25, 
      paddingRight: 25, 
      borderRadius: 10,
      borderColor: '#127FF6', 
    },
    button: {
      color: "#fff",
    },
    cardMeteo: {
      borderWidth: 2,
      borderColor: '#127FF6', 
      borderRadius: 10,
      padding: 10,
      margin: 10,
    },
    TitreVille: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 10,
      color: "#127FF6",
    },
    contentView: {
      flexDirection:'row',
      flexWrap:'wrap'
    },
    span: {
      fontWeight: 'bold',
    },
    imageMeteo: {
      width: 75,
      height: 75,
    },
    Align: {
      alignItems: 'center',
    },
  });