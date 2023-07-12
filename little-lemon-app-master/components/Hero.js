import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Searchbar } from "react-native-paper";

// import { styles } from "../styles/styles";
import { colors } from "../styles/colors";

const Hero = ({ handleSearchChange, searchBarText }) => {
  return (
    <View style={styles.hero}>
      <Text style={styles.title}>Little Lemon</Text>
      <View style={styles.heroBottomContainer}>
        <View style={styles.heroSubTextContainer}>
          <Text style={styles.subTitle}>Chicago</Text>
          <Text style={styles.paragraph}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
        </View>
        <View style={styles.heroImageContainer}>
          <Image
            source={require("../assets/Heroimage.png")}
            style={styles.heroImage}
          />
        </View>
      </View>
      <Searchbar
        placeholder="Search"
        placeholderTextColor="black"
        onChangeText={handleSearchChange}
        value={searchBarText}
        style={styles.searchBar}
        iconColor="black"
        inputStyle={{ color: "black" }}
        elevation={0}
      />
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary2,
  },
  subTitle: {
    fontSize: 40,
    fontWeight: "300",
    fontFamily: "Kablammo-Regular",
    color: colors.white,
  },
  paragraph: {
    fontSize: 16,
    color: colors.white,
    fontFamily: "RobotoMono-Regular",
  },
  heroImageContainer: {
    // width: 180,
    // height: 180,
    // borderRadius: 16,
    // marginLeft: 4,
    // alignItems: "center",
    // overflow: "hidden",
    // backgroundColor: "white",
    // height: 80,
    // width: 80,
    height: 150,
    maxWidth: "30%",
    // backgroundColor: "lightgray",
  },
  hero: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    backgroundColor: colors.primary1,
  },
  heroBottomContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "gray",
  },
  heroSubTextContainer: {
    flexDirection: "column",
    maxWidth: "70%",
  },
  heroImage: {
    // color: colors.white,
    height: "100%",
    maxWidth: "100%",
    resizeMode: "contain",
    borderRadius: 20,
  },
  avatarImage: {
    height: "100%",
    maxWidth: "100%",
    resizeMode: "contain",
    borderRadius: 100,
  },
  searchBar: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "white",
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 15,
    // fontSize: 20,
  },
});
