import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';

import { connect } from 'react-redux';
import { allPokemon } from '../public/redux/actions/pokemon';

import MapView , { PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

class LocationScreen extends React.Component {

    constructor(props) {
        super(props);
       
        this.state = {
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        await this.props.dispatch(allPokemon());
    }

    _mapReady = () => {
        this.props.pokemons.pokemons[0].mark.showCallout();
    };
    

    render(){
        const { latitude, longitude } = this.props.pokemons.pokemons[0];
        return (
            <View style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE}
              ref={map => this.mapView = map}
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.0142,
                longitudeDelta: 0.0231,
              }}
              style={styles.mapView}
              rotateEnabled={false}
              scrollEnabled={false}
              zoomEnabled={false}
              showsPointsOfInterest={false}
              showBuildings={false}
              onMapReady={this._mapReady}
            >
              { this.props.pokemons.pokemons.map(place => (
                <MapView.Marker
                  ref={mark => place.mark = mark}
                  title={place.name}
                  description={place.categories.name}
                  key={place.id}
                  coordinate={{
                    latitude: place.latitude,
                    longitude: place.longitude,
                  }}
                />
              ))}
            </MapView>
            <ScrollView
              style={styles.placesContainer}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const place = (e.nativeEvent.contentOffset.x > 0)
                  ? e.nativeEvent.contentOffset.x / Dimensions.get('window').width
                  : 0;
    
                const { latitude, longitude, mark } = this.props.pokemons.pokemons[place];
    
                this.mapView.animateToCoordinate({
                  latitude,
                  longitude
                }, 500);
    
                setTimeout(() => {
                  mark.showCallout();
                }, 500)
              }}
            >
              { this.props.pokemons.pokemons.map(place => (
                <View key={place.id} style={styles.place}>
                  <Text style={styles.title}>{ place.name }</Text>
                  <Text style={styles.description.name}>{ place.categories.name }</Text>
                </View>
              )) }
            </ScrollView>
          </View>    
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons
    }
  }

export default connect(mapStateToProps)(LocationScreen)

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
  