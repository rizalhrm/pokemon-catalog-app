import React from 'react';
import { Image, StyleSheet, FlatList, View, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Card, Text, Button, Body, Picker, Fab, Footer, Icon} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { allPokemon } from '../public/redux/actions/pokemon';

class HomeScreen extends React.Component {

    constructor() {
        super();
        this.state = {
          search: ""
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        await this.props.dispatch(allPokemon());
    }

    _keyExtractor = (item, index) => item.id.toString();

    renderItem = ({ item, index }) => (
        <TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate('DetailScreen', {item})}>

        <Card style={{marginRight: 8, marginLeft:8 , marginBottom: 8 ,borderRadius: 8, width: 190, height: 280}}>
            <Image source={{uri: item.image_url}} style={styles.image}/>
            <Body style={{paddingLeft: 10, paddingTop: 10}}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15, paddingBottom: 3}}>{item.name}</Text>
              <Text style={{color: '#212121', fontSize: 13, paddingBottom: 3}}>Type: {item.types.name}</Text>
              
              <Text style={{ fontSize: 13, color: '#212121'}}>Category: {item.categories.name}</Text>
    
              <View style={{flexDirection:'row', flexWrap:'wrap', paddingTop: 10}}>
                <Button style={{height: 30, backgroundColor: '#0086cb'}} primary onPress={()=> this.props.navigation.navigate('DetailScreen', {item})}>
                    <Text>View</Text>
                </Button>

              </View>
            </Body>
        </Card>

        </TouchableWithoutFeedback>
    )
    
    render(){
      
        return (
        <Container>
            <Spinner
                    visible={this.props.pokemons.isLoading}
                    textContent={''}
                    textStyle={styles.spinnerTextStyle}
            />
            <View style={{flex: 1 , flexDirection: 'column'}}>
                <ScrollView>

                <View style={{ flex: 1, flexDirection: "row", marginBottom: 10, marginLeft:10, marginTop: 10 }}>
                    <View style={{ width: 10, height: 25, backgroundColor: "#0086cb" }}/>
                        <Text style={{ fontWeight: "bold", fontSize: 13, marginLeft: 5 }}>
                                Pokemon List
                        </Text>
                </View>
                    <FlatList
                        data={this.props.pokemons.pokemons}
                        renderItem={this.renderItem}
                        keyExtractor={this._keyExtractor}
                        refreshing={this.props.pokemons.isLoading}
                        horizontal={false}
                        numColumns={2}
                    />
                </ScrollView>
            </View>
        </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      pokemons: state.pokemons
    }
  }

export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
    wrapper: {
        height:380,
        marginTop : -40
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bestSeller: {
        fontSize: 13,
        marginRight: 10
    },
    spinnerTextStyle: {
        color: '#fff'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    topMargin: {
        flex: 1,
        marginTop : 8
    },
    topMarginTwo: {
        flex: 1,
        marginTop : 16
    },
    topMarginTri: {
        flex: 1,
        marginTop : 25
    },
    image: {
        margin: 2,
        height: 151
    },
    spinnerTextStyle: {
        color: '#fff'
    }
})