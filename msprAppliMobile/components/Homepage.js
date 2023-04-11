import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function Homepage({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/plante.png")} />
      <TouchableOpacity 
      style={styles.loginBtn}
      onPress={() => navigation.navigate('Homepage')}>
        <Text style={styles.loginText}>Mes plantes</Text> 
      </TouchableOpacity> 
      <TouchableOpacity 
      style={styles.loginBtn}
      onPress={() => navigation.navigate('Homepage')}>
        <Text style={styles.loginText}>Garder une plante</Text> 
      </TouchableOpacity> 
    </View> 
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faeecd",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    width: 100,
    height: 100
  },
  inputView: {
    backgroundColor: "#b2fc90",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  register: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#8bfc56",
  },
});
