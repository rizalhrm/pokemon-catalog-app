import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';
import {createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';

import HomeScreen from './src/screen/Home/HomeScreen';
import DetailPokemon from './src/screen/Home/DetailPokemon';
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

  Home: { key: "Home", title: "Zona Gadget" }, 
  AddPokemon: { key: "AddPokemon", title: "Add Pokemon" },
  Profile: { key: "Profile", title: "My Profile" },
}

const AppNavigator = createStackNavigator({
  Home: {
      screen: createBottomTabNavigator({
          [Routes.Home.key]: { screen: HomeScreen },
          [Routes.AddPokemon.key]: { screen:AddPokemonScreen },
          [Routes.Profile.key]: { screen: ProfileScreen },
      },
      {
          defaultNavigationOptions: ({ navigation }) =>  ({
              tabBarIcon: ({ focused, tintColor }) => {
                  const { routeName } = navigation.state;
                  let iconName;
                  if (routeName === "Home") {
                      iconName = 'ios-home';
                  }
                  else if (routeName === "AddPokemon") {
                      iconName = 'ios-add-circle-outline';
                  }
                  else if (routeName === "Profile") {
                      iconName = 'md-people';
                  }
                  return <Ionicons name={iconName} size={25} color={tintColor} />;
              }
          }),
          initialRouteName: Routes.Home.key,
          tabBarOptions: {
              activeTintColor: "#005a9a",
              inactiveTintColor: "#0086cb",
              labelStyle: {
                  fontSize: 12
              }
          },
          navigationOptions: ({navigation}) => {
              const navRoute = getCurrentRoute(navigation.state)
              , route = navRoute && navRoute.routeName && Routes[navRoute.routeName]
              , title = route ? route.title : ""

              return { 
                  title, 
                  headerStyle: {
                      backgroundColor: '#0086cb'
                  },
                  headerTintColor: '#fff'
              }
          }
  
      })
  },
  DetailPokemon: {
      screen: DetailPokemon,
      navigationOptions: ({}) => ({
          title: "Detail Of Pokemon",
          headerStyle: {
              backgroundColor: '#0086cb',
          },
          headerTintColor: '#fff'
    })
  },
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
              backgroundColor: '#44b6fd',
          },
          headerTintColor: '#fff'
      }),
  }
})

const MainStack = createAppContainer(createSwitchNavigator(
  {
      LoginNavigator: LoginNavigator,
      AppNavigator : AppNavigator
  },
  {
      initialRouteName: 'AppNavigator'
  }
))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainStack />
      </Provider>
    )
  }
}
