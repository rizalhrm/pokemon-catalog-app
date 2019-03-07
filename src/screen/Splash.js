import React from "react";
import { StyleSheet, Text, View } from "react-native";

class Splash extends React.Component {

    main = async () => {
        this.props.navigation.navigate("Home");
    };

    componentDidMount() {
        setTimeout(() => {
            this.main();
        }, 800);
    }

    render(){
        return(
            <View style={styles.container}>
              <View behavior="padding" style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headtext}>Pokedumb</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default Splash;

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
        color: "#344453",
        width: 160,
        textAlign: "center",
        fontSize: 28,
        fontWeight : 'bold'
    }
});