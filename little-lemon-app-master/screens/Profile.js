import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import * as React from "react";
import Header from "../components/Header";
import HeaderTitle from "../components/HeaderTitle";
import FormInput from "../components/FormInput";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import ButtonBasic from "../components/ButtonBasic";
import { colors } from "../styles/colors";
import { useState, useEffect, useContext } from "react";
import { setItem, getItem, clear, removeItem } from "../utils/asyncStorage";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../contexts/AuthReducer";
import { ACTION_TYPES } from "../contexts/AuthActionTypes";

// import { Context as AuthContext } from "../contexts/AuthContext";

function Avatar() {
  const { state, dispatch } = useContext(AuthContext);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0,
        base64: true,
      });
      if (!result.canceled) {
        // setUser({ ...user, profilePicture: result.assets[0].uri });
        dispatch({
          type: ACTION_TYPES.USERINFO_UPDATE_SINGLE,
          name: "profilePicture",
          payload: result.assets[0].uri,
        });
        const jsonValue = await getItem("userInfo");
        await setItem("userInfo", {
          ...jsonValue,
          profilePicture: result.assets[0].uri,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeImage = () => {
    Alert.alert("Image selection", "Do you really want to delete your image?", [
      {
        text: "No",
        onPress: () => console.log("Cancel image deletion"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          console.log("image picked");
          // setUser({ ...user, profilePicture: "" });
          dispatch({
            type: ACTION_TYPES.USERINFO_UPDATE_SINGLE,
            name: "profilePicture",
            payload: "",
          });
        },
      },
    ]);
  };

  console.log("profile: state");
  console.log(state);

  return (
    <View style={styles.avatarContainer}>
      <View style={styles.avatarImageContainer}>
        {state.userInfo.profilePicture == "" ? null : (
          <Image
            source={{ uri: state.userInfo.profilePicture }}
            style={styles.avatarImage}
          ></Image>
        )}
      </View>
      <Button
        buttonActive={true}
        buttonText={"Change"}
        buttonDisabled={false}
        style={styles.avatarButton}
        onPress={() => pickImage()}
      />
      <Button
        buttonActive={false}
        buttonText={"Remove"}
        buttonDisabled={false}
        style={styles.avatarButton}
        onPress={removeImage}
      />
    </View>
  );
}

export default function Profile({ navigation }) {
  // const navigation = useNavigation();
  const { state, dispatch } = useContext(AuthContext);

  // Checkbox states
  // const [emailOrderStatuses, setEmailOrderStatuses] = useState(false);
  // const [emailPasswordChanges, setEmailPasswordChanges] = useState(false);
  // const [emailSpecialOffers, setEmailSpecialOffers] = useState(false);
  // const [emailNewsletter, setEmailNewsletter] = useState(false);

  // // User state
  // const [user, setUser] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phoneNumber: "",
  //   profilePicture: "",
  // });

  // Set single parameter in user object
  // const handleFirstName = (text) => setUser({ ...user, firstName: text });
  // const handleLastName = (text) => setUser({ ...user, lastName: text });
  // const handleEmail = (text) => setUser({ ...user, email: text });
  // const handlePhoneNumber = (text) => setUser({ ...user, phoneNumber: text });

  // Store user info in asyncStorage // INFO: Only 1 user possible
  const storeUserInfo = async (value) => {
    try {
      await setItem("userInfo", value);
    } catch (e) {
      console.error(e);
    }
  };

  // Get user info from asyncStorage and store it in user state + prefill input fields
  const getUserInfo = async () => {
    try {
      const jsonValue = await getItem("userInfo");
      console.log(jsonValue);
      if (jsonValue == null) {
        console.warn("Could not load user data from async storage!");
      } else {
        dispatch({
          type: ACTION_TYPES.USERINFO_UPDATE_MULTI,
          payload: {
            firstName: jsonValue.firstName,
            lastName: jsonValue.lastName,
            email: jsonValue.email,
            phoneNumber: jsonValue.phoneNumber,
            profilePicture: jsonValue.profilePicture,
            emailOrderStatuses: jsonValue.emailOrderStatuses,
            emailPasswordChanges: jsonValue.emailPasswordChanges,
            emailSpecialOffers: jsonValue.emailSpecialOffers,
            emailNewsletter: jsonValue.emailNewsletter,
          },
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    // clear(); // clears all
    // removeItem("userInfo");
    setItem("userInfo", {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      profilePicture: "",
      emailOrderStatuses: false,
      emailPasswordChanges: false,
      emailSpecialOffers: false,
      emailNewsletter: false,
    });
    setItem("isOnboardingCompleted", false);
    dispatch({
      type: ACTION_TYPES.LOGOUT_USER,
    });
  };

  // load saved user info at the beginning
  useEffect(() => {
    getUserInfo("userInfo");
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.form}>
      <Text style={{ fontFamily: "Kablammo-Regular" }}>hallo</Text>
      <HeaderTitle title="Personal Information" />
      <Avatar />
      <FormInput
        title="First Name"
        placeholder="Enter your first name"
        value={state.userInfo.firstName}
        onChangeText={(value) => {
          dispatch({
            type: ACTION_TYPES.USERINFO_UPDATE_SINGLE,
            name: "firstName",
            payload: value,
          });
        }}
      />
      <FormInput
        title="Last Name"
        placeholder="Enter your last name"
        value={state.userInfo.lastName}
        onChangeText={(value) => {
          dispatch({
            type: ACTION_TYPES.USERINFO_UPDATE_SINGLE,
            name: "lastName",
            payload: value,
          });
        }}
      />
      <FormInput
        title="Email"
        placeholder="Enter your email"
        value={state.userInfo.email}
        onChangeText={(value) => {
          dispatch({
            type: ACTION_TYPES.USERINFO_UPDATE_SINGLE,
            name: "email",
            payload: value,
          });
        }}
      />
      <FormInput
        isEmail
        title="Phone Number"
        placeholder="Enter your phone number"
        value={state.userInfo.phoneNumber}
        onChangeText={(value) => {
          dispatch({
            type: ACTION_TYPES.USERINFO_UPDATE_SINGLE,
            name: "phoneNumber",
            payload: value,
          });
        }}
      />
      <HeaderTitle title="Email Notifications" />
      <View>
        <Checkbox
          value={state.userInfo.emailOrderStatuses}
          onValueChange={(value) => {
            dispatch({
              type: ACTION_TYPES.USERINFO_UPDATE_SINGLE,
              name: "emailOrderStatuses",
              payload: value,
            });
          }}
          detail="Order statuses"
        />
        <Checkbox
          value={state.userInfo.emailPasswordChanges}
          onValueChange={(value) => {
            dispatch({
              type: ACTION_TYPES.USERINFO_UPDATE_SINGLE,
              name: "emailPasswordChanges",
              payload: value,
            });
          }}
          detail="Password changes"
        />
        <Checkbox
          value={state.userInfo.emailSpecialOffers}
          onValueChange={(value) => {
            dispatch({
              type: ACTION_TYPES.USERINFO_UPDATE_SINGLE,
              name: "emailSpecialOffers",
              payload: value,
            });
          }}
          detail="Special offers"
        />
        <Checkbox
          value={state.userInfo.emailNewsletter}
          onValueChange={(value) => {
            dispatch({
              type: ACTION_TYPES.USERINFO_UPDATE_SINGLE,
              name: "emailNewsletter",
              payload: value,
            });
          }}
          detail="Email newsletter"
        />
      </View>
      <ButtonBasic
        buttonOn={true}
        buttonColor={colors.primary2}
        buttonText={"Log out"}
        buttonDisabled={false}
        style={{ margin: 10 }}
        onPress={() => handleLogout()}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          margin: 10,
        }}
      >
        <ButtonBasic
          buttonOn={false}
          buttonColor={colors.primary1}
          buttonText={"Discard changes"}
          buttonDisabled={false}
          onPress={() => {
            Alert.alert(
              "Discard changes",
              "Do you really want to delete your changes?",
              [
                {
                  text: "No",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    console.log("discarded changes.");
                    getUserInfo("userInfo");
                  },
                },
              ]
            );
          }}
        />
        <ButtonBasic
          buttonOn={false}
          buttonColor={colors.primary1}
          buttonText={"Save changes"}
          buttonDisabled={false}
          onPress={() => {
            Alert.alert("Info", "Changes saved");
            storeUserInfo(state.userInfo);
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",

    borderColor: "lightgray",
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
    marginBottom: 20,
    backgroundColor: "lightgray",
  },
  avatarContainer: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    //backgroundColor: "lightyellow",
    width: "100%",
  },

  avatarImageContainer: {
    height: 80,
    width: 80,
    backgroundColor: "lightgray",
    borderRadius: 100,
  },

  avatarImage: {
    height: "100%",
    maxWidth: "100%",
    resizeMode: "contain",
    borderRadius: 100,
  },

  avatarButton: {
    maxWidth: "40%",
  },

  form: {
    // marginTop: 20,
    display: "flex",
    flexDirection: "column",

    borderColor: "lightgray",
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
    marginBottom: 20,
    backgroundColor: "#e8edea",
    padding: 10,
  },
  formText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.disabled,
    marginBottom: 2,
  },
  input: {
    height: 40,
    borderColor: colors.disabled,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  // avatarContainer: {
  //   display: "flex",
  //   flexWrap: "nowrap",
  //   flex: 0.15,
  //   flexDirection: "row",
  //   justifyContent: "space-evenly",
  //   alignItems: "center",
  //   backgroundColor: "lightgray",
  // },

  // avatarImage: {
  //   display: "flex",
  //   flex: 1,
  //   height: 80,
  //   width: 80,
  // },
  // avatarButton: {
  //   display: "flex",
  //   // height: "100%",
  //   width: "70%",
  //   flex: 0.5,
  // },
});
