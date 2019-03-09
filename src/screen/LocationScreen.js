import React from 'react';
import {View, Text, StyleSheet, Dimensions, Modal} from 'react-native';

import MapView, { Polygon,Overlay } from 'react-native-maps';
import {connect} from 'react-redux'

const { width, height } = Dimensions.get('window');

class LocationScreen extends React.Component {

    add= (int,adds=0)=>{
      return parseFloat(int)+adds
    }
    sub=(int,subs=0)=>{
      return parseFloat(int)-subs
    }

    render(){
        return (
            <View style={styles.container}>
            <MapView
              style={styles.container}
              initialRegion={{
                latitude: -6.287573,
                longitude: 106.729023,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
              }}>
              {this.props.pokemons.pokemons.map((item,index) =>{
              return(
                <Overlay
                  key={item.id.toString()}
                  image={item.image_url}
                  bounds={
                    [[this.sub(item.latitude),this.add(item.longitude)], 
                    [this.sub(item.latitude,0.0033000), this.add(item.longitude,0.0033000)]]
                    }
                  />)
                })
              }
              {this.props.pokemons.pokemons.map((item,index) =>{
              return(
                <Polygon
                key={item.id.toString()}
                coordinates={
                  [
                    {latitude:this.sub(item.latitude),longitude:this.add(item.longitude)},
                    {latitude:this.sub(item.latitude),longitude:this.add(item.longitude,0.0033000)},
                    {latitude:this.sub(item.latitude,0.0033000),longitude:this.add(item.longitude,0.0033000)},
                    {latitude:this.sub(item.latitude,0.0033000),longitude:this.add(item.longitude)},
                  ]
                }
                fillColor='rgba(0,0,0,0)'
                strokeColor='rgba(0,0,0,0)'
                strokeWidth={0}
                tappable={true}
                onPress={()=>this.props.navigation.navigate('DetailScreen',{
                  item
                })}
                />)
                })
              }
            </MapView>
          </View>    
        )
    }
}

mapStateToProps=(state)=>{
  return{
    pokemons: state.pokemons
  }
}

export default connect(mapStateToProps)(LocationScreen);


const styles = StyleSheet.create({
    container: {
      flex: 1
    }
});  