import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Login from "./components/Login"
import Register from "./components/Register"
import Homepage from "./components/Homepage"
import MyPlants from "./components/MyPlants"
import GuardPlants from "./components/GuardPlants"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="MyPlants" component={MyPlants} />
        <Stack.Screen name="GuardPlants" component={GuardPlants} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;