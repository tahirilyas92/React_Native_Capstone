import * as React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { colors } from "../styles/colors";

export default function ButtonBasic({
  buttonColor,
  buttonOn,
  style,
  buttonDisabled,
  buttonText,
  onPress,
}) {
  let _buttonColor;
  if (buttonColor) {
    let buttonColor = buttonColor;
  } else {
    buttonColor = "#f47d14";
  }
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        style,
        buttonOn
          ? {
              backgroundColor: buttonColor,
              borderColor: buttonColor,
              borderWidth: 2,
              borderRadius: 30,
            }
          : {
              backgroundColor: "white",
              borderColor: buttonColor,
              borderWidth: 2,
              borderRadius: 10,
            },
      ]}
      disabled={buttonDisabled}
    >
      <Text
        style={[
          styles.buttonText,
          buttonOn ? { color: "white" } : { color: "black" },
        ]}
      >
        {buttonText}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
  },
  buttonText: {
    padding: 7,
    textAlign: "center",
    fontSize: 16,
  },
});
