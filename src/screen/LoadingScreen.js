import React from "react";
import { ActivityIndicator, StyleSheet, View, AsyncStorage } from "react-native";
import { connect } from 'react-redux';

class Splash extends React.Component {

    constructor(props) {
        super(props);
    }

    Async = async () => {
        const token = await AsyncStorage.getItem('token');
        this.props.navigation.navigate(token ? 'AddPokemon' : 'Login');
    };

    componentDidMount() {
        setTimeout(() => {
            this.Async();
        }, 800);
    }

    render(){
        return(
            <View style={styles.container}>
              <View behavior="padding" style={styles.container}>
                    <View style={styles.titleContainer}>
                        <ActivityIndicator size='large' color='#03A9F4'/>
                    </View>
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

export default connect(mapStateToProps)(Splash);

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
    headtext: {
        color: "#fff",
        width: 160,
        textAlign: "center",
        fontSize: 28,
        fontFamily: 'SharpeBl_PERSONAL'
    }
});