import React from 'react';
import { Image, StyleSheet, FlatList, View, TouchableWithoutFeedback, TouchableOpacity, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import { Container, Card, Text, Button, Body, Picker, Fab, Footer, Icon} from 'native-base';
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
    
    getData = (first) => {
        const { lastPage, page }= this.props.pokemons.pokemons
        nextPage = page + 1;
        if(nextPage < lastPage) {
            this.props.dispatch(allPokemon(nextPage));
        }
        
        else if (nextPage === lastPage) {
            this.props.dispatch(allPokemon(lastPage));
        }

        else if (page === first) {
            this.props.dispatch(allPokemon(first));
        }
    }

    _keyExtractor = (item, index) => item.id.toString();

    renderItem = ({ item, index }) => (
        <TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate('DetailScreen', {item})}>

        <Card style={{marginRight: 8, marginLeft:8 , marginBottom: 8 ,borderRadius: 8, width: 190, height: 250}}>
            <Image source={{uri: item.image_url}} style={styles.image}/>
            <Body style={{paddingLeft: 10, paddingTop: 10}}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15, paddingBottom: 3}}>{item.name}</Text>
              <Text style={{color: '#212121', fontSize: 13, paddingBottom: 3}}>Type: {item.types ? item.types.name : null}</Text>
              <Text style={{ fontSize: 13, color: '#212121'}}>Category: {item.categories ? item.categories.name : null}</Text>
            </Body>
        </Card>

        </TouchableWithoutFeedback>
    )

    handleLoad = async (page) => {
        await this.props.dispatch(allPokemon(page));
    }
    
    render(){
      
        return (
        <View>
            <FlatList
                data={this.props.pokemons.pokemons.data}
                renderItem={this.renderItem}
                keyExtractor={this._keyExtractor}
                onRefresh={()=>this.handleLoad(1)}
                refreshing={this.props.pokemons.isLoading}
                onEndReachedThreshold={0.5}
                ListFooterComponent={()=>(
                <View style={{height:100}}></View>
                )}
                onEndReached={()=>this.getData()}
                horizontal={false}
                numColumns={2}
            />
            {!this.props.pokemons.isLoading&&
            <View style={{marginTop : -10}}>
                <Fab
                    style={{ backgroundColor: '#344453' }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate("AddPokemon")}>
                    <Ionicons name='ios-add'/>
                </Fab>
            </View>
            }
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
    image: {
        margin: 2,
        height: 151
    }
})