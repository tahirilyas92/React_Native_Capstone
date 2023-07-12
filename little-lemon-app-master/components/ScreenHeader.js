import React from "react";
import { SafeAreaView, View } from "react-native";
import { styles } from "../styles/styles";

const ScreenHeader = ({ leftNode, logo, rightNode }) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.leftItem}>{leftNode}</View>
      <View style={styles.headerItem}>{logo}</View>
      <View style={styles.rightItem}>{rightNode}</View>
    </SafeAreaView>
  );
};

export default ScreenHeader;
