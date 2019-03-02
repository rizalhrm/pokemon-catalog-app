import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container, Icon, Content} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card, Image, Button } from 'react-native-elements';
import { connect } from 'react-redux';

class LocationScreen extends React.Component {

    constructor(props) {
        super(props);
       
        this.state = {
        }
    }

    render(){
        return (
        <Container>
            <Content>
            
                <Card containerStyle={{borderRadius: 13, marginBottom: 15}}
                title={this.state.name} titleStyle={{fontSize: 18}}>
                <Text>Location</Text>
                </Card>
            </Content>
        </Container>
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
    spinnerTextStyle: {
        color: '#fff'
    }
})