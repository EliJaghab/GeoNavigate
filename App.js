import React, { Component } from 'react';
import { Button, Text, View, StyleSheet,TextInput } from 'react-native';
import Swiper from 'react-native-swiper'; // 1.5.13

export default class App extends Component {

  // Create States to Store Variables
  constructor(props) {

    super(props);

    this.state = {
      name: '',
      nameTemp: '',
      latitude: '',
      longitude: '',
      latitudeTemp: '',
      longitudeTemp: '',
      temperature: '',
      weather:'',
    };
    global.name = "";
    global.lat = "";
    global.lon = "";
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          });
        },

        (error) => this.setState({ error: error.message, latitude:40.0379, longitude:75.3433 }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
      );
  }

  getLocation(){
    this.setState({
      latitudeTemp:this.state.latitude,
      longitudeTemp:this.state.longitude,
    })
  }

 submitName() {
    global.name = this.state.nameTemp;
}

getWeather(){
  const apiKey = "95e80cccc453ba41680034bb84190d39"
  global.lat = parseInt(this.state.latitude);
  global.lon = parseInt(this.state.longitude);
  let url= 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey

  return fetch(url)
    .then(response => response.json())
    .then(responseJSON => {
    console.log(responseJSON);
    this.setState({
        temperature: responseJSON.main.temp,
        weather:  responseJSON.weather[0].main,
        isLoading: false,
        });
   })

   .catch(error => {console.error(error);
   });
}

  render() {
        return (<Swiper style={styles.wrapper} showsButtons={true}>

        <View style = {styles.container}>
        <Text style={styles.title}> Welcome to GeoNavigate! </Text>
        <Text style={styles.otherText}> Name: </Text>
        <TextInput style={styles.input}
          placeholder="Enter Your Name Here"
          onChangeText={(value) => this.state.nameTemp = value}
        />
        <Button
            title = 'Submit'
            onPress={() => this.submitName() }
        />

        <Text style={styles.otherText}>
          User: {global.name}
        </Text>
        <Text style={styles.author}>
          Eli Jaghab
        </Text>
        </View>

        <View style = {styles.container}>
        <Text style={styles.title}>Coordinates</Text>
        <Button
            title = 'Get Location'
            onPress={() => this.getLocation() }
        />
        <Text style= {styles.otherText}>Latitude: {this.state.latitudeTemp}</Text>
        <Text style= {styles.otherText}>Longitude: {this.state.longitudeTemp}</Text>
        <Text style={styles.otherText}> User: {global.name}</Text>
              {this.state.error ? <Text style={styles.error}>Error: {this.state.error} Default Coordinates: Villanova University</Text> : null}
        <Text style={styles.author}> Eli Jaghab </Text>
        </View>


        <View style = {styles.container}>
        <Text style={styles.title}>Weather</Text>
        <Button
            title = 'Get Weather'
            onPress={() => this.getWeather() }
        />
        <Text style={styles.otherText}> Temperature: {this.state.temperature} </Text>
        <Text style={styles.otherText}> Weather: {this.state.weather} </Text>
        <Text style= {styles.otherText}>Latitude: {this.state.latitudeTemp}</Text>
        <Text style= {styles.otherText}>Longitude: {this.state.longitudeTemp}</Text>
        <Text style={styles.otherText}> User: {global.name} </Text>
        <Text style={styles.author}> Eli Jaghab </Text>
        </View>

        </Swiper>
        );
      }
    }
    const styles = StyleSheet.create({
      wrapper: {
      },
      title: {
        color: 'white',
        fontSize: 50,
        textAlign: "center",
        position:"absolute",
        top:150,
      },
      otherText: {
        color: 'white',
        fontSize: 25,
      },
      container: {
        flex: 1,
        backgroundColor: '#001F5B',
        alignItems: 'center',
        justifyContent: 'center',
      },
      author: {
        position:"absolute",
        bottom: 5,
        right: 30,
        color: "white",
        fontSize: 15,
      },
      input: {
        borderColor: "black",
        backgroundColor: "white",
        fontSize: 20,
      },
      error:{
        fontSize: 15,
        color: "red"
      }
    });
