import React from 'react';
import {View, StyleSheet, Alert, AsyncStorage} from 'react-native';
import { Card, CardItem, Body, Button, Text, Container, Content, Item, Input, Label, Picker, Right, Left, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { updatePokemon } from '../public/redux/actions/pokemon';
import { allCategory } from '../public/redux/actions/category';
import { allType } from '../public/redux/actions/type';

class UpdatePokemon extends React.Component {

    constructor(props){
        super(props);
        let id = props.navigation.state.params.item.id;
        let name = props.navigation.state.params.item.name;
        let latitude = props.navigation.state.params.item.latitude;
        let longitude = props.navigation.state.params.item.longitude;
        let image = props.navigation.state.params.item.image_url;
        let type_id = props.navigation.state.params.item.type_id;
        let category_id = props.navigation.state.params.item.category_id;
        this.state = {
            chosenCategories : category_id,
            indexCategories : '',
            chosenTypes : type_id,
            indexTypes : '',
            name : name,
            id : id,
            latitude : latitude,
            longitude : longitude,
            image : image
        }
        this.arrayCategories = () => {
            let items = [];
            this.props.categories.categories.forEach((item) => {
                items.push(
                    <Picker.Item key={item.id} label={item.name} value={item.id}/>
                );
            })
            return items
        }
        this.arrayTypes = () => {
            let items = [];
            this.props.type.type.forEach((item) => {
                items.push(
                    <Picker.Item key={item.id} label={item.name} value={item.id}/>
                );
            })
            return items
        }
    }
    
    componentDidMount() {
        this.getData();
        this.getType();
        this.validation();
    }

    getData = async () => {
        await this.props.dispatch(allCategory());
    }

    getType = async () => {
        await this.props.dispatch(allType());
    }

    validation = () => {
        const self = this;
        
        setTimeout(() => {
            const self = this;

            setTimeout(() => {
                const { name, latitude, longitude, image} = self.state;
                if(name != "" && latitude != "" && longitude != "" && image != ""){
                    self.setState({isValid: true});
                }
                else{
                    self.setState({isValid: false})
                }
            }, 800);
        })
    }

    handleUpdate = async () => {
        let id = this.state.id;
        let name = this.state.name;
        let image = this.state.image;
        let latitude = this.state.latitude;
        let longitude = this.state.longitude;
        this.props.dispatch(updatePokemon({id: id, name: name, image_url : image ,type_id : this.state.chosenTypes, category_id : this.state.chosenCategories, latitude: latitude, longitude: longitude}))
        .then( res => {
            Alert.alert(
                'Success!',
                'Your pokemon has been updated successfully',
                [
                  {text: 'OK', onPress: () => this.props.navigation.navigate("ListPokemon")},
                ],
                {cancelable: false},
              )
        })
        .catch( err => {
            alert('message : ' + err)
        })
    }

    render(){
        console.disableYellowBox = true;
        const { isValid } = this.state;
        return (
        <Container>
            <Content padder>
              <View>
                <Card>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Name of Pokemon</Label>
                            <Input 
                            value={this.state.name}
                            onChangeText={(text) =>  {
                                this.setState({name: text})
                                this.validation();
                            }}/>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Image URL</Label>
                            <Input
                            value={this.state.image}
                            onChangeText={(text) => {
                                this.setState({image: text})
                                this.validation();
                            }}/>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Latitude</Label>
                            <Input
                            value={this.state.latitude}
                            onChangeText={(text) => {
                                this.setState({latitude: text})
                                this.validation();
                            }}/>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Longitude</Label>
                            <Input
                            value={this.state.longitude}
                            onChangeText={(text) => {
                                this.setState({longitude: text})
                                this.validation();
                            }}/>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item picker>
                            <Text>Category :</Text>
                            <Picker
                                selectedValue={this.state.chosenCategories}
                                onValueChange={(itemValue, itemIndex)=>(this.setState({chosenCategories: itemValue, indexCategories: itemIndex}))}
                            >
                            {this.arrayCategories()}
                            </Picker>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item picker>
                            <Text>Type :</Text>
                            <Picker
                                selectedValue={this.state.chosenTypes}
                                onValueChange={(itemValue, itemIndex)=>(this.setState({chosenTypes: itemValue, indexTypes: itemIndex}))}
                            >
                            {this.arrayTypes()}
                            </Picker>
                        </Item>
                    </CardItem>
                  </Card>
                </View>
            </Content>
            {
                isValid ?
                (
                    <Button style={{alignItems: 'center', backgroundColor: '#344453'}} full onPress={this.handleUpdate}>
                    <Text style={{color: '#fff', textAlign: 'center'}}>UPDATE</Text>
                    </Button>
                ):
                (
                    <Button style={{alignItems: 'center'}} full disabled>
                    <Text style={{color: '#fff', textAlign: 'center'}}>UPDATE</Text>
                    </Button>
                )
            }
        </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth : state.auth,
        pokemons : state.pokemons,
        categories : state.categories,
        type : state.type
    }
  }

export default connect(mapStateToProps)(UpdatePokemon)

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#fff'
    }
})