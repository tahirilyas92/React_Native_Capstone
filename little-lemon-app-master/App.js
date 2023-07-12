import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";
import { View, Text } from "react-native";
import { useFonts } from "expo-font";
import * as React from "react";
// App.js is already setup by wrapping NavigationContainer around Root Navigator
export default function App() {
  // const [fontsLoaded] = useFonts({
  //   "Kablammo-Regular": require("./assets/fonts/Kablammo-Regular.ttf"),
  //   "RobotoMono-Regular": require("./assets/fonts/RobotoMono-Regular.ttf"),
  //   "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return null;
  // } else {
  //   console.log("Font loaded");
  // }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
