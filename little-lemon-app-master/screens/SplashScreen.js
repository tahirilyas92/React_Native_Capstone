import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function SplashScreen() {
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     <Image
        source={require("../assets/Deliveryvan.png")}
        style={styles.logo}
        resizeMode="contain"
      ></Image>
    </View>
  );
}


const styles = StyleSheet.create({
  logo: {
          height: 100,
          width:400
        },
});
