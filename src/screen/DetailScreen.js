import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container, Icon, Content} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card, Image, Button } from 'react-native-elements';
import { connect } from 'react-redux';

class DetailScreen extends React.Component {

    constructor(props) {
        super(props);
        let id = props.navigation.state.params.item.id;
        let name = props.navigation.state.params.item.name;
        let image = props.navigation.state.params.item.image_url;
        let type = props.navigation.state.params.item.types.name;
        let category = props.navigation.state.params.item.categories.name;
        this.state = {
            name: name,
            id : id,
            image : image,
            type : type,
            category : category
        }
    }

    render(){
        return (
        <Container>
            <Content>
            
                <Card containerStyle={{borderRadius: 13, marginBottom: 15}}
                title={this.state.name} titleStyle={{fontSize: 18}}>
                <Image
                source={{ uri: this.state.image }}
                style={{ width: 300, height:300, alignItems: "center", alignSelf: "center", resizeMode:'contain', marginBottom: 5 }}
                />
                <View style={{flex: 1}}>
                    <Text style={{color: 'black', marginBottom: 10, fontSize:16, justifyContent: 'space-between', textAlign:"center"}}>
                    Type : {this.state.type}
                    {"\n"}
                    Category : {this.state.category}
                    </Text>
                    <Button
                    icon={<MaterialIcons name='location-on' style={{color: 'white', fontSize: 20}}/>}
                    buttonStyle={{borderRadius: 6, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor:'#344453'}}
                    title='Location'/>
                </View>
                </Card>
            </Content>
        </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      products: state.productDetails,
      carts: state.carts,
      checkCart: state.checkCart
    }
  }

export default connect(mapStateToProps)(DetailScreen)

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#fff'
    }
})