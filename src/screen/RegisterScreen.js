import React, { Component } from "react";
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  View
} from "react-native";
import { connect } from 'react-redux'
import { addUser } from '../public/redux/actions/user'

class RegisterScreen extends Component {

    state = {
		email: '',
		username: '',
		password: '',
		repassword: ''
	}

    async handleRegister(user) {
		try {
			if (user.email == '' || user.username == '' || user.password == '' || user.repassword == '') {
				throw 'Field must not be empty'
			}
			if (user.password != user.repassword){
				throw 'Password doesnt match'
			}
			await this.props.dispatch(addUser(user))
			this.props.navigation.navigate('Login')
		} catch(e) {
			if (e.response != undefined) {
				alert(e.response.data.message)
			} else {
				alert(e)
			}
			
		}
	}


    render(){
        return(
            <View style={styles.container}>
              <View behavior="padding" style={styles.container}>
                    <View style={styles.keyboard}>
                        <View style={styles.window}>
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="#000"
                            returnKeyType="next"
                            autoCapitalize="none"
                            borderLeftWidth={1}
                            borderRightWidth={1}
                            borderTopWidth={1}
                            borderBottomWidth={1}
                            borderColor="#000"
                            autoCorrect={false}
                            value={this.state.username}
                            style={styles.font}
                            onChangeText={username => this.setState({ username })}
                        />
                        </View>
                        <View style={styles.window}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#000"
                            returnKeyType="next"
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
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                        />
                        </View>
                        <View style={styles.window}>
                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor="#000"
                            borderLeftWidth={1}
                            borderRightWidth={1}
                            borderTopWidth={1}
                            borderBottomWidth={1}
                            borderColor="#000"
                            returnKeyType="go"
                            secureTextEntry
                            style={styles.font}
                            value={this.state.repassword}
                            onChangeText={repassword => this.setState({ repassword })}
                        />
                        </View>
                        <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => this.handleRegister(this.state)}
                        >
                        <Text style={styles.buttonText}>Register Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		user: state.user
	}
}

export default connect(mapStateToProps)(RegisterScreen)


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
        fontSize: 25,
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
        backgroundColor: "#c79081",
        paddingVertical: 15
    },
    buttonText: {
        textAlign: "center",
        color: "#FFF",
        fontWeight: "700",
        fontSize: 16
    },
    button: {
        backgroundColor: "#c79081",
        paddingVertical: 15
    },
    buttonDown: {
        paddingVertical: 15
    },
    window: {
        marginBottom: 15
    }
  });