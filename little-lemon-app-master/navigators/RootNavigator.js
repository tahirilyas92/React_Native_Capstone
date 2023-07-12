import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect, useContext } from "react";
import Onboarding from "../screens/Onboarding";
import HomeScreen from "../screens/HomeScreen";
import Profile from "../screens/Profile";
import SplashScreen from "../screens/SplashScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import ScreenHeader from "../components/ScreenHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "../styles/styles";
import { colors } from "../styles/colors";
import { multiGet } from "../utils/asyncStorage";
import { useFonts } from "expo-font";
import * as Font from "expo-font";
import { setItem } from "../utils/asyncStorage";
import { AuthProvider } from "../contexts/AuthReducer";
import { AuthContext } from "../contexts/AuthReducer";
import { ACTION_TYPES } from "../contexts/AuthActionTypes";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { state, dispatch } = useContext(AuthContext);
  console.log("state");
  console.log(state);

  const [isLoading, setIsLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  // Populating preferences from storage using AsyncStorage.multiGet
  const getOnboardingInfo = async () => {
    try {
      // setItem("isOnboardingCompleted", false);
      const values = await AsyncStorage.multiGet(["isOnboardingCompleted"]);
      console.log("Loaded value from Storage on startup: ");
      console.log(JSON.parse(values[0][1]));
      // const initialState = JSON.parse(Object.fromEntries(values));
      setOnboardingCompleted(JSON.parse(values[0][1]));
      dispatch({ type: ACTION_TYPES.ONBOARD });
    } catch (e) {
      Alert.alert(`An error occurred: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect2");
    setIsLoading(true);
    setTimeout(() => getOnboardingInfo(), 1000); // after 1s function is run
  }, []); //[state]);

  const [fontsLoaded] = useFonts({
    "Kablammo-Regular": require("../assets/fonts/Kablammo-Regular.ttf"),
    "RobotoMono-Regular": require("../assets/fonts/RobotoMono-Regular.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else {
    console.log("Font loaded");
  }

  if (isLoading) {
    // We haven't finished reading from AsyncStorage yet
    console.log("isLoading");
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: false,
        headerBackTitleVisible: false,
      }}
    >
      {onboardingCompleted && state.isOnboardingCompleted ? (
        <>
          {/* // Onboarding completed, user is signed in*/}
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerTitle: () => (
                <Header backArrowVisible={false} navigation={navigation} />
              ),
            })}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={({ navigation }) => ({
              headerTitle: () => (
                <Header backArrowVisible={true} navigation={navigation} />
              ),
            })}
          />
        </>
      ) : (
        <>
          {/* User is NOT signed in*/}
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={({ navigation }) => ({
              headerTitle: () => (
                <Header backArrowVisible={false} navigation={navigation} />
              ),
            })}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function RootNavigator() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}
