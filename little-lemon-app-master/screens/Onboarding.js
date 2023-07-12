/*
a header 

two text inputs to collect the user's name and email respectively

a button to complete the onboarding process
 */
import * as React from "react";
import { useState, useEffect, useUpdateEffect, useContext } from "react";
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import Header from "../components/Header";
import SignUp from "../components/SignUp";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthReducer";

const Onboarding = ({ navigation, route }) => {
  console.log("Onboarding1=");
  console.log(route);
  return (
    <View style={styles.container}>
      <SignUp navigation={navigation} />
    </View>
  );
};
// <Header/>

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
