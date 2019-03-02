import React from 'react';
import { Image, StyleSheet, FlatList, View, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Card, Text, Button, Body} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { allPokemons } from './public/redux/actions/pokemons';

class HomeScreen extends React.Component {

    constructor() {
        super();
        this.state = {
          hasMore: false,
          search: "",
          position: 1,
          interval: null,
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const get = await this.props.dispatch(allPokemons());
        if (get) {
            this.setState({
                hasMore: this.props.pokemons.hasMore
            });
        }
    }

    loadMoreData = async () => {
        this.setState({
          hasMore: false
        });
        let url = this.props.pokemons.results.nextPage;
        const load = await this.props.dispatch(allPokemons(url));
        if (load) {
          this.setState({
            hasMore: this.props.pokemons.hasMore
          });
        }
      };

    handleNavigateDetail (item) {
        this.props.dispatch(savePokemDetail(item))
        this.props.navigation.navigate('DetailPokemon')
    }

    _keyExtractor = (item, index) => item.id.toString();

    renderItem = ({ item, index }) => (
        <TouchableWithoutFeedback onPress={()=> this.handleNavigateDetail(item.id)}>

        <Card style={{marginRight: 8, marginLeft:8 , marginBottom: 8 ,borderRadius: 8, width: 190, height: 280}}>
            <Image source={{uri: item.image_url}} style={styles.image_url}/>
            <Body style={{paddingLeft: 10, paddingTop: 10}}>
              <Text numberOfLines={1} style={{color: '#212121', fontSize: 15, paddingBottom: 5}}>{item.type_id.name}</Text>
              
              <Text style={{ fontSize: 14, color : 'black', marginBottom:2}}>{item.category_id.name}</Text>
    
              <View style={{flexDirection:'row', flexWrap:'wrap', paddingTop: 10}}>
                <Button style={{height: 30, backgroundColor: '#0086cb'}} primary onPress={()=> this.handleNavigateDetail(item.id)}>
                    <Text>View</Text>
                </Button>

              </View>
            </Body>
        </Card>

        </TouchableWithoutFeedback>
    )
    
    render(){

        const isCloseToBottom = ({
            layoutMeasurement,
            contentOffset,
            contentSize
          }) => {
            const paddingToBottom = 20;
            return (
              layoutMeasurement.height + contentOffset.y >=
              contentSize.height - paddingToBottom
            );
          };
      
        return (
        <Container>
            <Spinner
                    visible={this.props.pokemons.isLoading}
                    textContent={''}
                    textStyle={styles.spinnerTextStyle}
            />
            <View >
                <ScrollView
                    onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent) && this.state.hasMore) {
                        this.loadMoreData();
                    }
                    }}
                    scrollEventThrottle={16}
                >

                <View style={{ flex: 1, flexDirection: "row", marginBottom: 10, marginLeft:10, marginTop: -10 }}>
                    <View style={{ width: 10, height: 25, backgroundColor: "#0086cb" }}/>
                        <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 5 }}>
                                Pokemons List
                        </Text>
                </View>
                        <FlatList
                            data={this.props.pokemons}
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