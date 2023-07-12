import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

// import { styles } from "../styles/styles";
import { colors } from "../styles/colors";

export default function ItemList() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Foodlist</Text>

      <FlatList
        style={{ paddingHorizontal: 10 }}
        data={data}
        keyExtractor={({ item, index }) => index}
        ItemSeparatorComponent={
          <View
            style={{
              height: 1,
              width: "100%",
              marginVertical: 6,
              backgroundColor: colors.highlight,
            }}
          />
        }
        renderItem={({ item }) => (
          <Item
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
});
