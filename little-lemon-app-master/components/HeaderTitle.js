import React from "react";
import { Text, StyleSheet } from "react-native";

const HeaderTitle = ({ title, style }) => {
  return <Text style={[styles.headerTitle, style]}>{title}</Text>;
  //return <Text style={{ fontFamily: "Kablammo-Regular" }}>{title}</Text>;
  // return <Text style={styles.headerTitle}>{title}</Text>;
};

export default HeaderTitle;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Kablammo-Regular",
    marginBottom: 10,
  },
});
