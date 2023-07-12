import * as React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";

export default function Button(props) {
  return (
    <Pressable
      onPress={props.onPress}
      style={[
        styles.button,
        props.style,
        props.buttonActive ? styles.buttonActive : styles.buttonInactive,
      ]}
      disabled={props.buttonDisabled}
    >
      <Text
        style={[
          styles.buttonText,
          props.buttonActive ? { color: "white" } : { color: "black" },
        ]}
      >
        {props.buttonText}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {},
  buttonText: {
    padding: 7,
    textAlign: "center",
    fontSize: 16,
  },
  buttonActive: {
    backgroundColor: "#495E57",
    borderColor: "#495E57",
    borderWidth: 2,
    borderRadius: 30,
  },
  buttonInactive: {
    backgroundColor: "white",
    borderColor: "#495E57",
    borderWidth: 2,
    borderRadius: 10,
  },
});
