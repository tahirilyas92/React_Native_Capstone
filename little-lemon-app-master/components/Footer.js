import * as React from 'react';
import { useState } from "react";
import { View, Text, StyleSheet, Pressable,Alert } from 'react-native';



export default function Footer() {
  const [subscriber, onChangesubscriber] = useState("");
  return (
    <View style={styles.container}>
      <Pressable onPress={() => {  alert('Next') }} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  button: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    margin: 100,
    backgroundColor: 'gray',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
  },
});
