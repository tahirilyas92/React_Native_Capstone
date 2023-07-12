import * as React from "react";
import { useState, useEffect, useUpdateEffect, useContext } from "react";
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { validateEmail, validateName } from "../utils";
import HomeScreen from "../screens/HomeScreen";
import Profile from "../screens/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthReducer";
import { ACTION_TYPES } from "../contexts/AuthActionTypes";
import { setItem } from "../utils/asyncStorage";

const SignUp = ({ navigation, setisOnboardingCompleted }) => {
  console.log("Onboarding2=");
  console.log(setisOnboardingCompleted);
  const { state, dispatch } = useContext(AuthContext);
  const [name, onChangeName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [nextButtonStatus, setNextButtonStatus] = useState(false); //false

  const handleValidation = () => {
    if (validateName(name) !== null && validateEmail(email) !== null) {
      setNextButtonStatus(true);
    } else {
      setNextButtonStatus(false); // flase
    }
  };

  useEffect(() => {
    handleValidation();
  }, [name, email]);

  const SetOnboardingFinished = () => {
    ///////////////////// SIMPLE ////////////////////////////
    // // SAVE
    (async () => {
      try {
        await AsyncStorage.setItem(
          "isOnboardingCompleted",
          JSON.stringify(true)
        );
        setItem("userInfo", {
          firstName: name,
          lastName: "",
          email: email,
          phoneNumber: "",
          profilePicture: "",
          emailOrderStatuses: false,
          emailPasswordChanges: false,
          emailSpecialOffers: false,
          emailNewsletter: false,
        });
        dispatch({ type: ACTION_TYPES.ONBOARD });
        dispatch({
          type: ACTION_TYPES.USERINFO_UPDATE,
          payload: {
            firstName: name,
            lastName: "",
            email: email,
            phoneNumber: "",
            profilePicture: "",
            emailOrderStatuses: false,
            emailPasswordChanges: false,
            emailSpecialOffers: false,
            emailNewsletter: false,
          },
        });
      } catch (e) {
        Alert.alert(`An error occurred: ${e.message}`);
      }
    })();

    // // LOAD
    // const getData = async () => {
    //   try {
    //     const value = await AsyncStorage.getItem('@test');
    //     if (value !== null) {
    //       // value previously stored
    //       //Alert.alert(`Loaded : ${value}`);
    //     }
    //   } catch (e) {
    //     // error reading value
    //   }
    // }
    // storeData(JSON.stringify({ var1: 1, bool1: true, str1: "string" }));
    // getData();
    ///////////////////// SIMPLE ////////////////////////////
  };

  console.log("SIGN_UP: state");
  console.log(state);
  return (
    <KeyboardAvoidingView style={styles.container} enabled>
      <ScrollView style={{ flex: 1 }} keyboardDismissMode="on-drag">
        <Text style={{ fontSize: 30 }}> </Text>
        <Text style={styles.text}>Let us get to know you</Text>
        <Text style={{ fontSize: 150 }}> </Text>

        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.inputBox}
          value={name}
          onChangeText={onChangeName}
          placeholder={"Name here"}
          multiline={false}
          keyboardType={"default"}
          secureTextEntry={false}
          clearButtonMode="always"
        />

        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.inputBox}
          value={email}
          onChangeText={onChangeEmail}
          placeholder={"Email here"}
          multiline={false}
          keyboardType={"email-address"}
          secureTextEntry={false}
          clearButtonMode="always"
        />

        <Text style={{ fontSize: 30 }}> </Text>

        <Pressable
          onPress={() => {
            SetOnboardingFinished();
          }}
          style={[
            styles.button,
            nextButtonStatus
              ? { backgroundColor: "green" }
              : { backgroundColor: "gray" },
          ]}
          disabled={!nextButtonStatus}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
  },
  inputBox: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "EDEFEE",
    backgroundColor: "#EDEFEE",
    borderRadius: 10,
  },

  text: {
    color: "black",
    textAlign: "center",
    fontSize: 25,
  },
  button: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    margin: 100,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
  },
});
