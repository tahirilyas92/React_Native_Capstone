import React from "react";
import Checkbox from "expo-checkbox";
import { View, Text, StyleSheet } from "react-native";

// import { styles } from "../styles/styles";
import { colors } from "../styles/colors";

const CheckboxItem = ({ value, onValueChange, detail }) => {
  return (
    <View style={styles.section}>
      <Checkbox
        style={styles.checkbox}
        value={value}
        onValueChange={onValueChange}
        color={value ? colors.primary1 : undefined}
      />
      <Text style={[styles.paragraph, { color: "black" }]}>{detail}</Text>
    </View>
  );
};

export default CheckboxItem;

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
