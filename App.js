import React, {Component} from 'react';
import {View, TouchableOpacity, AsyncStorage, StyleSheet} from 'react-native';
import {createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Provider } from 'react-redux';

import HomeScreen from './src/screen/HomeScreen';
import DetailScreen from './src/screen/DetailScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import LocationScreen from './src/screen/LocationScreen';
import AddPokemon from './src/screen/AddPokemon';
import UpdatePokemon from './src/screen/UpdatePokemon';
import ListPokemon from './src/screen/ListPokemon';
import ProfileScreen from './src/screen/ProfileScreen';
import Splash from './src/screen/Splash';
import store from './src/public/redux/store';

const getCurrentRoute = (navigationState) => {
  if (!navigationState) {
      return null
  } else if (!navigationState.routes) {
      return navigationState
  }

  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
      return getCurrentRoute(route)
  }

  return route
}

const Routes = {
  TabStack: { key: "TabStack" },

  Home: { key: "Home", title: "Pokedumb" },
  Location : { key: "Location", title: "Location of Pokemon" },
  Profile : { key: "Profile", title: "My Profile" }
}

const AppNavigator = createStackNavigator({
  Home: {
      screen: createBottomTabNavigator({
          [Routes.Home.key]: { screen: HomeScreen },
          [Routes.Location.key]: { screen: LocationScreen },
          [Routes.Profile.key]: { screen: ProfileScreen }
      },
      {
          defaultNavigationOptions: ({ navigation }) =>  ({
              tabBarIcon: ({ focused, tintColor }) => {
                  const { routeName } = navigation.state;
                  let iconName;
                  if (routeName === "Home") {
                      iconName = 'ios-home';
                  }
                  else if (routeName === "Location") {
                    iconName = 'ios-locate';
                  }
                  else if (routeName === "AddPokemon") {
                    iconName = 'ios-add-circle';
                  }
                  else if (routeName === "Profile") {
                    iconName = 'ios-people';
                  }
                 
                  return <Ionicons name={iconName} size={25} color={tintColor} />;
              }
          }),
          initialRouteName: Routes.Home.key,
          tabBarOptions: {
              activeTintColor: "#344453",
              inactiveTintColor: "#5f6f7f",
              labelStyle: {
                  fontSize: 14
              }
          },
          navigationOptions: ({navigation}) => {
              const navRoute = getCurrentRoute(navigation.state)
              , route = navRoute && navRoute.routeName && Routes[navRoute.routeName]
              , title = route ? route.title : ""

              return { 
                  title, 
                  headerStyle: {
                      backgroundColor: '#344453'
                  },
                  headerTintColor: '#fff'
              }
          }
  
      })
  },
  DetailScreen: {
      screen: DetailScreen,
      navigationOptions: ({}) => ({
          title: "Detail Of Pokemon",
          headerStyle: {
              backgroundColor: '#344453',
          },
          headerTintColor: '#fff'
    })
  },
  AddPokemon: {
    screen: AddPokemon,
    navigationOptions: ({navigation}) => ({
        title: "Add Your Pokemon",
        headerStyle: {
            backgroundColor: '#344453',
        },
        headerRight : (
        <View style={{padding: 5}}>
          <TouchableOpacity onPress={() => navigation.navigate('ListPokemon')}>
              <Entypo style={styles.myicon} size={25} name='list'/>
          </TouchableOpacity>
        </View>),
        headerTintColor: '#fff'
    })
  },
  ListPokemon: {
    screen: ListPokemon,
    navigationOptions: ({navigation}) => ({
        title: "Pokemons List",
        headerStyle: {
            backgroundColor: '#344453',
        },
        headerRight : (
        <View style={{padding: 5}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Ionicons style={styles.myicon} size={25} name='ios-home'/>
          </TouchableOpacity>
        </View>),
        headerTintColor: '#fff'
    })
  },
  UpdatePokemon: {
    screen: UpdatePokemon,
    navigationOptions: ({navigation}) => ({
        title: "Update Your Pokemon",
        headerStyle: {
            backgroundColor: '#344453',
        },
        headerRight : (
        <View style={{padding: 5}}>
          <TouchableOpacity onPress={() => navigation.navigate('UpdatePokemon')}>
              <Ionicons style={styles.myicon} size={25} name='ios-home'/>
          </TouchableOpacity>
        </View>),
        headerTintColor: '#fff'
    })
  }
})

const LoginNavigator = createStackNavigator({
  Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
          header: null
      })
  },
  Register: {
      screen: RegisterScreen,
      navigationOptions: () => ({
          title: "Register",
          headerStyle: {
              backgroundColor: '#344453',
          },
          headerTintColor: '#fff'
      }),
  }
})

const MainStack = createAppContainer(createSwitchNavigator(
  {
      LoginNavigator: LoginNavigator,
      AppNavigator : AppNavigator,
      Splash : Splash
  },
  {
      initialRouteName: 'Splash'
  }
))

const styles = StyleSheet.create({
  myicon : {
      color: 'white',
      marginRight: 10,
      alignItems: 'center',
      alignContent: 'center',
      alignSelf: 'center'
  }
})

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainStack />
      </Provider>
    )
  }
}