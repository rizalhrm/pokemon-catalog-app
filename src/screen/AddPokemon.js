import React from 'react';
import {View, StyleSheet, Alert, AsyncStorage} from 'react-native';
import { Card, CardItem, Body, Button, Text, Container, Content, Item, Input, Label, Picker, Right, Left, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { createPokemon } from '../public/redux/actions/pokemon';
import { allCategory } from '../public/redux/actions/category';
import { allType } from '../public/redux/actions/type';
import CheckboxFormX from 'react-native-checkbox-form';

class AddPokemon extends React.Component {

    constructor(){
        super();
        this.checkAuth();
        this.state = {
            categories : null,
            chosenCategories : '0',
            indexCategories : '',
            chosenTypes : '0',
            name : "",
            latitude : "",
            longitude : "",
            image : ""
        }
        this.arrayCategories = () => {
            let items = [<Picker.Item key='0' label='--Categories--' value='0'/>];
            this.props.categories.categories.forEach((item) => {
                items.push(
                    <Picker.Item key={item.id} label={item.name} value={item.id}/>
                );
            })
            return items
        }
    }

    checkAuth = async () => {
        const token = await AsyncStorage.getItem("token");
        setTimeout(() => {
          this.props.navigation.navigate(token ? "AddPokemon" : "Login");
        });
    };
    
    componentDidMount() {
        this.getData();
        this.getType();
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

    handleSave = async () => {
        let name = this.state.name;
        this.props.dispatch(createPokemon({name: name, image_url : this.state.image ,type_id : this.state.chosenTypes, category_id : this.state.chosenCategories, latitude: this.state.latitude, longitude: this.state.longitude}))
        .then( res => {
            Alert.alert(
                'Success!',
                'Your pokemon was successfully added',
                [
                  {text: 'OK', onPress: () => this.props.navigation.navigate("Home") },
                ],
                {cancelable: false},
              )
        })
        .catch( err => {
            alert('message : ' + err)
        })
    }

    selectType  = async ( item ) => {
        let RNchecked = []
        let IDchecked = []
        item.forEach((element) => {
            RNchecked.push(element.RNchecked)
            IDchecked.push(element.id)
        });
        for (let i = 0; i < RNchecked.length; i++) {
            if (RNchecked[i] == true) {
                this.setState({
                    chosenTypes: IDchecked[i]
                });
            }
        }
    };

    render(){
        console.disableYellowBox = true;
        const { isValid } = this.state;
        let types = [];   
        this.props.type.type.forEach((item) => {
            types.push(item)
        })
        return (
        <Container>
            <Content padder>
              <View>
                <Card>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Name of Pokemon</Label>
                            <Input onChangeText={(text) =>  {
                                this.setState({name: text})
                                this.validation();
                            }}/>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Image URL</Label>
                            <Input onChangeText={(text) => {
                                this.setState({image: text})
                                this.validation();
                            }}/>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Latitude</Label>
                            <Input onChangeText={(text) => {
                                this.setState({latitude: text})
                                this.validation();
                            }}/>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Longitude</Label>
                            <Input onChangeText={(text) => {
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
                            <Text>Type :</Text>
                            <CheckboxFormX
                                style={{ width: 350 - 30, color: 'black' }}
                                dataSource={types}
                                itemShowKey='name'
                                itemCheckedKey="RNchecked"
                                iconSize={16}
                                formHorizontal={true}
                                labelHorizontal={false}
                                onChecked={(item) => this.selectType(item)}
                            />
                    </CardItem>
                  </Card>
                </View>
            </Content>
            {
                isValid && this.state.chosenCategories != '0' && this.state.chosenTypes != '0' ?
                (
                    <Button style={{alignItems: 'center', backgroundColor: '#344453'}} full onPress={this.handleSave}>
                    <Text style={{color: '#fff', textAlign: 'center'}}>SAVE</Text>
                    </Button>
                ):
                (
                    <Button style={{alignItems: 'center'}} full disabled>
                    <Text style={{color: '#fff', textAlign: 'center'}}>SAVE</Text>
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

export default connect(mapStateToProps)(AddPokemon)

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#fff'
    }
})