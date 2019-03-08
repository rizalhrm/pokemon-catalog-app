import React from 'react';
import { Image, StyleSheet, FlatList, View, TouchableOpacity, Alert } from 'react-native';
import { Container, Card, Text, Button, Body, Left, Right, Thumbnail, CardItem} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { allPokemon, deletePokemon } from '../public/redux/actions/pokemon';

class ListPokemon extends React.Component {

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

    handleDelete = (item) => {
        Alert.alert(
          'Alert !!',
          'Are you sure you deleted the pokemon?',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: async () => {
              await this.props.dispatch(deletePokemon(item))
              this.getData();
            }},
          ],
          { cancelable: true }
        )
      }

    _keyExtractor = (item, index) => item.id.toString();

    renderItem = ({ item, index }) => (
        <TouchableOpacity onLongPress={()=> this.handleDelete(item)}
        >
        <Card style={{marginRight: 8, marginLeft:8 , marginBottom: 8 ,borderRadius: 8}}>
            <CardItem>
                <Left style={{width: 25}}>
                    <Thumbnail source={{ uri: item.image_url }} />
                </Left>
                <Body>
                    <Text>{item.name}</Text>
                    <Text style={{fontSize: 13}}>Type: {item.types ? item.types.name : null}</Text>
                    <Text style={{fontSize: 13}}>Category: {item.categories ? item.categories.name : null}</Text>
                </Body>
                <Right>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('UpdatePokemon', {item})}>
                        <FontAwesome5 name="pencil-alt" size={18} color={"royalblue"}/>
                    </TouchableOpacity>
                </Right>
            </CardItem>
        </Card>
        </TouchableOpacity>
    )
    
    render(){
      
        return (
        <View>
            <Spinner
                    visible={this.props.pokemons.isLoading}
                    textContent={''}
                    textStyle={styles.spinnerTextStyle}
            />
            <FlatList
                data={this.props.pokemons.pokemons}
                renderItem={this.renderItem}
                keyExtractor={this._keyExtractor}
                refreshing={this.props.pokemons.isLoading}
                horizontal={false}
                numColumns={1}
            />
        </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      pokemons: state.pokemons
    }
  }

export default connect(mapStateToProps)(ListPokemon)

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