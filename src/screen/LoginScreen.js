import React from "react";
import { Alert, TouchableOpacity, TextInput, StyleSheet, Text, View, AsyncStorage } from "react-native";
import { connect } from 'react-redux';
import { login } from '../public/redux/actions/auth';

class LoginScreen extends React.Component {

    constructor() {
      super();
      this.state = {
        isLoading: false,
        email: "",
        password: ""
      };
    }

    onLoginPress = () => {
        this.setState({
            isLoading: true
        });      
        this.doLogin()
          .then(res => {
            const auth = this.props.auth;
            AsyncStorage.setItem("id", auth.data.id);
            AsyncStorage.setItem("token", auth.access_token.token);
            AsyncStorage.setItem("refreshToken", auth.access_token.refreshToken);
            setTimeout(() => {
                this.setState({
                  isLoading: true
                });    
            this.props.navigation.navigate("Home");
            }, 800);
          })
          .catch(err => {
            console.log(err);
            Alert.alert("Warning", "Login Failed !");
            this.setState({
                isLoading: false
            });      
          });
      };
    
    doLogin = async () => {
        await this.props.dispatch(
            login({
            email: this.state.email,
            password: this.state.password
            })
        );
    };
    
    render(){
        return(
            <View style={styles.container}>
              <View behavior="padding" style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headtext}>Pokedumb</Text>
                    </View>
                    <View style={styles.keyboard}>
                        <View style={styles.window}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#000"
                            returnKeyType="next"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            borderLeftWidth={1}
                            borderRightWidth={1}
                            borderTopWidth={1}
                            borderBottomWidth={1}
                            borderColor="#000"
                            autoCorrect={false}
                            value={this.state.email}
                            style={styles.font}
                            onChangeText={email => this.setState({ email })}
                        />
                        </View>
                        <View style={styles.window}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#000"
                            borderLeftWidth={1}
                            borderRightWidth={1}
                            borderTopWidth={1}
                            borderBottomWidth={1}
                            borderColor="#000"
                            returnKeyType="go"
                            secureTextEntry
                            style={styles.font}
                            ref={input => (this.passwordInput = input)}
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                        />
                        </View>
                        <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={this.onLoginPress}
                        >
                        <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.buttonDown} onPress={()=> this.props.navigation.navigate("Register")}>
                        <Text
                            style={styles.buttonTextTwo}
                        >
                            Sign up
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDown}>
                        <Text
                            style={styles.buttonTextTwo}
                        >
                            Forget Password
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(LoginScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleContainer: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 100,
        height: 100
    },
    headtext: {
        color: "#000",
        marginTop: 10,
        width: 160,
        textAlign: "center",
        fontSize: 30,
        fontWeight : '600',
        fontFamily: 'SharpeBl_PERSONAL'
    },
    font: {
        fontSize: 16,
        color: '#000'
    },
    keyboard: {
        margin: 20,
        padding: 20,
        alignSelf: "stretch"
    },
    buttonContainer: {
        backgroundColor: "#0086cb",
        paddingVertical: 15
    },
    buttonText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "700",
        fontSize: 16
    },
    buttonTextTwo: {
        textAlign: "center",
        color: "#000",
        fontWeight: "700",
        fontSize: 16
    },
    button: {
        backgroundColor: "#0086cb",
        paddingVertical: 15
    },
    buttonDown: {
        paddingVertical: 15
    },
    window: {
        marginBottom: 15
    }
  });