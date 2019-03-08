import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  AsyncStorage,
  ImageBackground
} from "react-native";
import {
  Container,
  Button,
  Header,
  Left,
  Body,
  Right,
  Form,
  Label,
  Picker,
  Text
} from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

import { logout } from "../public/redux/actions/auth";
import { getFullProfile, updateProfile } from "../public/redux/actions/profile";


class ProfileScreen extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false,
            name: "",
            about: "",
            gender: ""
        };
        this.checkAuth();
  }
  
  componentDidMount() {
        this.getProfile()
        .then(res => {
            this.setState({
              name: this.props.profile.data.name,
              about: this.props.profile.data.about,
              gender: this.props.profile.data.gender,
            });
        })
        .catch(err => {
            console.log("error " + err);
        });
  }

  getProfile = async () => {
        const user_id = this.props.auth.data.id;
        const token = this.props.auth.access_token.token;
        await this.props.dispatch(getFullProfile(user_id, token));
  };

  setModalVisible(visible) {
        this.setState({ modalVisible: visible });
  }

  saveProfile = () => {
        const token = this.props.auth.access_token.token;
        let body = {
          user_id: this.props.auth.data.id,
          name: this.state.name,
          about: this.state.about,
          gender: this.state.gender
        };
        this.props.dispatch(updateProfile(body, token));
        this.setModalVisible(!this.state.modalVisible);
  };


  handleLogout = () => {
    Alert.alert("Alert", "Are you sure to log out ?", [
        { text: "No" },
        {
            text: "Yes",
            style: "cancel",
            onPress: async () => {
                    this.doLogout()
                    await AsyncStorage.removeItem("token");
                    await AsyncStorage.removeItem("refreshToken");
                    this.props.navigation.navigate("Splash");
            }
        }
    ]);
};

doLogout = () => {
    const token = this.props.auth.access_token.token;
    this.props.dispatch(logout(token));
};

checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    setTimeout(() => {
      this.props.navigation.navigate(token ? "Profile" : "Login");
    });
  };

  render() {
    console.log(this.props.profile.data)
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <ImageBackground source={{uri : "https://images.alphacoders.com/434/434003.jpg"}} style={{width: '100%', height: '100%'}}>
            </ImageBackground>
            </View>
            <Image style={styles.avatar} source={{uri: 'https://secure.gravatar.com/avatar/c9490c639969cbcac686c3e66feb4648?s=800&d=identicon'}}/>
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                <Text style={styles.name}>Rizal</Text>
                <Text style={styles.email}>rizal@gmail.com</Text>
                <Text style={styles.description}>Web &amp; Mobile App Programmer</Text>
                
                <Button style={styles.buttonContainer}
                onPress={() => {
                  this.setModalVisible(true);
                  }} 
                >
                    <Text>Edit Profile</Text>  
                </Button>              
                <Button style={[styles.buttonContainer, styles.buttonLogout]}
                onPress={() => this.handleLogout()}
                >
                    <Text>Log Out</Text> 
                </Button>
                </View>
            </View>
            <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <Header style={styles.headerModal}>
            <Left>
              <Button
                transparent
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
              >
                <Ionicons name="md-close" size={25} color="#fff" />
              </Button>
            </Left>
            <Body />
            <Right>
              <Button transparent onPress={this.saveProfile}>
                <Text style={styles.saveModal}>Save</Text>
              </Button>
            </Right>
          </Header>
          <ScrollView>
            <View style={styles.containerModal}>
              <Text style={styles.textUpdate}>Edit your profile.</Text>
              <View style={styles.viewImgModal}>
                <Image
                  source={{uri: 'https://secure.gravatar.com/avatar/c9490c639969cbcac686c3e66feb4648?s=800&d=identicon'}}
                  style={styles.imageModal}
                />
                <TouchableOpacity>
                  <Text style={styles.chooseImg}>choose an image</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.formProfile}>
                <Form>
                  <View
                    style={{
                      borderBottomColor: "#d8d8d8",
                      borderBottomWidth: 1,
                      marginBottom: 10
                    }}
                  >
                    <Label>Name</Label>
                    <TextInput
                      value={this.state.name}
                      placeholder="Enter your full name"
                      onChangeText={text => this.setState({ name: text })}
                      style={{ fontSize: 16 }}
                    />
                  </View>
                  <View
                    style={{
                      borderBottomColor: "#d8d8d8",
                      borderBottomWidth: 1,
                      marginBottom: 10
                    }}
                  >
                    <Label>About</Label>
                    <TextInput
                      value={this.state.about}
                      placeholder="Enter a short bio"
                      onChangeText={text => this.setState({ about: text })}
                      maxLength={100}
                      style={{ fontSize: 16 }}
                    />
                  </View>
                  <View
                    style={{
                      borderBottomColor: "#d8d8d8",
                      borderBottomWidth: 1,
                      marginBottom: 10
                    }}
                  >
                    <Label>Gender</Label>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Ionicons name="ios-arrow-down" />}
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      style={{ width: undefined }}
                      selectedValue={this.state.gender}
                      onValueChange={text =>
                        this.setState({
                          gender: text
                        })
                      }
                    >
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                    </Picker>
                  </View>
                </Form>
              </View>
            </View>
          </ScrollView>
          </Modal>
        </View>
    );
  }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        profile: state.profile
    };
};

export default connect(mapStateToProps)(ProfileScreen);

const styles = StyleSheet.create({
    header:{
      height: 150,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 30,
        borderWidth: 5,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:80
    },
    name:{
        fontSize:22,
        color:"#fff",
        fontWeight:'bold',
    },
    body:{
        marginTop:30,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
    },
    name:{
        fontSize:28,
        color: "black",
        fontWeight: "bold"
    },
    email:{
        fontSize:16,
        color: "grey",
        marginTop:10
    },
    description:{
        fontSize:16,
        color: "black",
        marginTop:10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom:20,
        width:250,
        borderRadius:10,
        backgroundColor: "#344453",
    },
    buttonLogout: {
        marginTop : -8
    },
    headerModal: {
        backgroundColor: "#344453"
    },
    saveModal: {
        color: "#fff",
        fontSize: 18
    },
    containerModal: {
        marginLeft: 40,
        marginTop: 20,
        marginRight: 40
    },
    textUpdate: {
        fontSize: 20
    },
    viewImgModal: {
        flex: 1,
        flexDirection: "row"
    },
    imageModal: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20
    },
    chooseImg: {
        color: "black",
        marginLeft: 10,
        marginTop: 60
    },
    formProfile: {
        marginTop: 20
    }
});
