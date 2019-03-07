import React from 'react';
import { Image, StyleSheet, FlatList, View, TouchableWithoutFeedback, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { Container, Card, Text, Button, Body, Picker, Fab, Footer, Icon} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { newToken, getProfile } from '../public/redux/actions/auth';
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
        this.refreshToken()
            .then(res => {
                const auth = this.props.auth;
                AsyncStorage.setItem("token", auth.access_token.token);
                AsyncStorage.setItem("refreshToken", auth.access_token.refreshToken);
                this.getProfile()
                .then(res => {
                })
                .catch(err => {
                    console.log("error" + err);
                });
            })
            .catch(err => {
                console.log("error" + err);
            });

    }

    refreshToken = async () => {
        const refresh_token = await AsyncStorage.getItem("refreshToken");
        const email = await AsyncStorage.getItem("email");
        await this.props.dispatch(newToken(email, refresh_token));
    };

    getProfile = async () => {
        const token = await AsyncStorage.getItem("token");
        await this.props.dispatch(getProfile(token));
    };
    
    getData = async () => {
        await this.props.dispatch(allPokemon());
    }

    _keyExtractor = (item, index) => item.id.toString();

    renderItem = ({ item, index }) => (
        <TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate('DetailScreen', {item})}>

        <Card style={{marginRight: 8, marginLeft:8 , marginBottom: 8 ,borderRadius: 8, width: 190, height: 250}}>
            <Image source={{uri: item.image_url}} style={styles.image}/>
            <Body style={{paddingLeft: 10, paddingTop: 10}}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15, paddingBottom: 3}}>{item.name}</Text>
              <Text style={{color: '#212121', fontSize: 13, paddingBottom: 3}}>Type: {item.types.name}</Text>
              <Text style={{ fontSize: 13, color: '#212121'}}>Category: {item.categories.name}</Text>
            </Body>
        </Card>

        </TouchableWithoutFeedback>
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
                numColumns={2}
            />
            <View style={{position : 'relative', top : 20}}>
                <Fab
                    style={{ backgroundColor: '#344453' }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate("AddPokemon")}>
                    <Ionicons name='ios-add'/>
                </Fab>
            </View>
        </View>
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