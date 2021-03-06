import React from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Text, Image} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const screen = Dimensions.get('window');

class DetailLocation extends React.Component {

    constructor(props) {
        super(props);
        let id = props.navigation.state.params.data.id;
        let name = props.navigation.state.params.data.name;
        let image = props.navigation.state.params.data.image;
        let type = props.navigation.state.params.data.type;
        let category = props.navigation.state.params.data.category;
        let latitude = props.navigation.state.params.data.latitude;
        let longitude = props.navigation.state.params.data.longitude;
        this.state = {
            data: {},
            place : [
                {
                name: name,
                id : id,
                image : image,
                type : type,
                category : category,
                latitude : parseFloat(latitude),
                longitude : parseFloat(longitude)
                }
            ]
        }
    }

    componentDidMount() {
      return fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyABHR_ELf1vLbg-RD-eDkZH90ruudwPRLE&address=${this.state.latitude},${this.state.longitude}`)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          data: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
    }

    _mapReady = () => {
      this.state.place[0].mark.showCallout();
    };

    render(){
        console.disableYellowBox = true;
        console.log(screen.width)
        console.log(screen.height)
        return (
        <View style={styles.container}>
            <MapView
              ref={map => this.mapView = map}
              initialRegion={{
                latitude:  this.state.place[0].latitude,
                longitude: this.state.place[0].longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
              }}
              style={styles.mapView}
              rotateEnabled={true}
              scrollEnabled={true}
              zoomEnabled={true}
              showsPointsOfInterest={true}
              showBuildings={true}
              onMapReady={this._mapReady}
            >
              { this.state.place.map(place => (
                <MapView.Marker
                  ref={mark => place.mark = mark}
                  title={"Name : " + place.name}
                  description={"Category : " + place.category}
                  key={place.id}
                  coordinate={{
                    latitude: place.latitude,
                    longitude: place.longitude,
                  }}
                >
                  <View>
                    <Image
                      style={styles.marker}
                      source={{ uri: this.state.place[0].image }}
                    />
                  </View>
                </MapView.Marker>
              ))}
            </MapView>
            <View style={styles.place}>
              <Text style={styles.title}>ADDRESS</Text>
              <Text style={styles.description}>{this.state.data.status == 'OK' ? this.state.data.results[1].formatted_addesss : this.state.data.error_message}</Text>
            </View>
        </View>
        )
    }
}

export default DetailLocation;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    mapView: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    place: {
      width: screen.width - 40,
      maxHeight: 300,
      backgroundColor: '#FFF',
      marginHorizontal: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      padding: 20,
    },
    marker: {
      width: screen.width - 382,
      height: screen.height - 642,
      overflow: 'hidden'
    },
    title: {
      fontWeight: 'bold',
      fontSize: 18,
      backgroundColor: 'transparent',
    },
    description: {
      backgroundColor: 'transparent',
      fontSize: 15,
      marginTop: 5,
    }
  });
  