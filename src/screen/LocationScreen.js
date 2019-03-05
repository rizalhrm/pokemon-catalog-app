import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

class LocationScreen extends React.Component {

    state = {
      places: [
        {
          id: 1,
          title: 'Psyduck',
          description: 'Type: Duck',
          latitude: -6.288735,
          longitude: 106.729130,
        },
        {
          id: 2,
          title: 'Snorlax',
          description: 'Type: Seed',
          latitude: -6.290259,
          longitude: 106.732382,
        },
        {
          id: 3,
          title: 'Jynx',
          description: 'Type: Ice',
          latitude: -6.292403,
          longitude: 106.729056,
        }
      ]
    };
  

    _mapReady = () => {
        this.state.places[0].mark.showCallout();
    };
    

    render(){
        console.disableYellowBox = true;
        const { latitude, longitude } = this.state.places[0];
        return (
            <View style={styles.container}>
            <MapView
              ref={map => this.mapView = map}
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.0142,
                longitudeDelta: 0.0231,
              }}
              style={styles.mapView}
              rotateEnabled={true}
              scrollEnabled={true}
              zoomEnabled={true}
              showsPointsOfInterest={true}
              showBuildings={true}
              onMapReady={this._mapReady}
            >
              { this.state.places.map(place => (
                <MapView.Marker
                  ref={mark => place.mark = mark}
                  title={place.title}
                  description={place.description}
                  key={place.id}
                  coordinate={{
                    latitude: place.latitude,
                    longitude: place.longitude,
                  }}
                />
              ))}
            </MapView>
          </View>    
        )
    }
}

export default LocationScreen;


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
  
    placesContainer: {
      width: '100%',
      maxHeight: 200,
    },
  
    place: {
      width: width - 40,
      maxHeight: 200,
      backgroundColor: '#FFF',
      marginHorizontal: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      padding: 20,
    },
  
    title: {
      fontWeight: 'bold',
      fontSize: 18,
      backgroundColor: 'transparent',
    },
  
    description: {
      color: '#999',
      fontSize: 12,
      marginTop: 5,
    },
  });
  