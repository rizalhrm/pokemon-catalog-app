import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  AsyncStorage
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
  Picker
} from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

import { logout } from "../public/redux/actions/auth";
import { getFullProfile, updateProfile } from "../public/redux/actions/user";


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
              name: this.props.user.data.name,
              about: this.props.user.data.about,
              gender: this.props.user.data.gender,
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
            onPress: () => {
                this.doLogout()
                    .then(res => {
                        AsyncStorage.removeItem("token");
                        AsyncStorage.removeItem("refreshToken");
                        this.props.navigation.navigate("Home");
                    })
                    .catch(err => {
                        console.log("error" + err);
                    });
            }
        }
    ]);
};

doLogout = async () => {
    const token = this.props.auth.access_token.token;
    await this.props.dispatch(logout(token));
};

checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    setTimeout(() => {
      this.props.navigation.navigate(token ? "Profile" : "Login");
    });
  };

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.viewImg}>
          <Image
            source={{uri: 'https://secure.gravatar.com/avatar/c9490c639969cbcac686c3e66feb4648?s=800&d=identicon'}}
            style={styles.image}
          />
          </View>
          
          <View style={styles.viewName}>
          {this.props.user.data ? (
            <Text style={styles.headerText} numberOfLines={1}>
             {this.props.user.data.name}
            </Text>
          ) : (
            <Text style={styles.headerText}> {this.props.user.data.name}</Text>
          )}
          {this.props.user.data ? (
            <Text style={styles.bioText}>
              "{this.props.user.data.about}"
            </Text>
          ) : (
            <Text style={styles.bioText}> "{this.props.user.data.about}"</Text>
          )}
            <TouchableOpacity
                style={styles.editBtn}
                onPress={() => {
                this.setModalVisible(true);
                }} 
            >
                <Text style={styles.editText}>Edit My Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => this.handleLogout()}
                    style={styles.buttonLogout}
                    >
                <Text style={styles.textButton}>Logout</Text>
            </TouchableOpacity> 
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
      </Container>
    );
  }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        user: state.user
    };
};

export default connect(mapStateToProps)(ProfileScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff"
    },
    viewImg: {
        left: 170,
        top: 70,
        backgroundColor: "#fff"
    },
    viewName: {
        left: 20,
        bottom: 20
    },
    editBtn: {
        bottom: 5,
        left: 3
    },
    buttonLogout:{
        width: 100,
        height: 50,
        borderWidth: 1,
        borderColor: '#00a699',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        top: 10,
        left: 220,
        
    },
    textButton: {
        fontFamily: 'AirbnbCereal-Medium',
        color: '#00a699',
    },
    editText: {
        color: "#424242",
        fontFamily: 'AirbnbCereal-Light',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
        left: 80
    },
    headerText: {
        fontFamily: 'AirbnbCereal-Bold',
        marginTop: 10,
        fontSize: 22,
        color: "#424242"
    },
    bioText: {
        fontFamily: 'AirbnbCereal-Medium',
        marginTop: 10,
        fontSize: 16,
        color: "#424242",
        marginBottom: 20
    },
    headerModal: {
        backgroundColor: "#0086cb"
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
