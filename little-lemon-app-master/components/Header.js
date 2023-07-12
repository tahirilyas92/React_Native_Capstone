import * as React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthReducer";

export default function Header({ backArrowVisible, navigation }) {
  const { state, dispatch } = useContext(AuthContext);

  const handlePress = () => {
    navigation.navigate("Profile");
  };

  const handlePressBack = () => {
    navigation.goBack(); // Zur vorherigen Seite springen
  };

  // console.log("Header: state.userInfo.profilePicture");
  // console.log(state.userInfo.profilePicture);

  return (
    <View style={styles.container}>
      {backArrowVisible && (
        <Pressable onPress={handlePressBack}>
          <View style={styles.backImageContainer}>
            <Image
              source={require("../assets/Button_Back.png")}
              style={styles.back_button}
            ></Image>
          </View>
        </Pressable>
      )}
      <View style={styles.logoImageContainer}>
        <Image
          source={require("../assets/Logo.png")}
          style={styles.logo}
        ></Image>
      </View>
      <Pressable onPress={handlePress}>
        <View style={styles.avatarImageContainer}>
          {state.userInfo.profilePicture == "" ? null : (
            <Image
              source={{ uri: state.userInfo.profilePicture }}
              style={styles.avatarImage}
            ></Image>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    //height: "100%",
    //flex: 1,
  },
  avatarImageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 50,
    width: 50,
    margin: 5,
    backgroundColor: "lightgray",
    borderRadius: 100,
  },
  logoImageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    maxWidth: "100%",
    // width: "50%",
    // backgroundColor: "lightyellow",
  },
  backImageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 40,
    width: "30%",
    // backgroundColor: "lightblue",
  },
  avatarImage: {
    height: 50,
    width: 50,
    resizeMode: "contain",
    borderRadius: 100,
  },

  back_button: {
    height: "100%",
    maxWidth: "100%",
    resizeMode: "contain",
  },
  logo: {
    height: "100%",
    maxWidth: "100%",
    resizeMode: "contain",
  },
  avatar: {
    height: 40,
    width: "20%",

    backgroundColor: "lighgray",
  },
});

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     flex: 0.1,
//     flexDirection: 'row',
//     flexWrap: "nowrap",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: '#EEEEEE',
//     margin:15,
//   },
//   back_button: {
//     height: "70%",
//     width: "25%",
//     backgroundColor: 'blue',
//   },
//   logo: {
//     height: "100%",
//     width: "50%",
//     backgroundColor: 'yellow',

//   },
//   avatar: {
//     height: "100%",
//     width: "25%",
//     backgroundColor: 'gray',

//   },
// });
