import { View, Image, TextInput, StyleSheet, Pressable, Text, Alert, KeyboardAvoidingView, ScrollView } from "react-native";



export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const validateName = (name) => {
  return name.match(
    /[\w\s]+/
  );
};
