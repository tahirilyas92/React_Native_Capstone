import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

const FormInput = ({
  title,
  value,
  placeholder,
  onChangeText,
  isEmail = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.formText}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChangeText(text)}
        keyboardType={isEmail ? "phone-pad" : "default"}
        autoCapitalize={isEmail ? "none" : "words"}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  formText: {
    fontSize: 14,
    fontWeight: "400",
    color: "black",
    marginTop: 5,
    marginBottom: 2,
  },
  input: {
    fontSize: 14,
    fontWeight: "400",
    color: "black",
    borderWidth: 1,
    borderColor: "black",
    padding: 1,
    paddingLeft: 10,
    borderRadius: 8,
    marginBottom: 3,
  },
});
