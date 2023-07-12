// import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

// const Filters = ({ onChange, selections, sections }) => {
//   return (
//     <View style={styles.filtersContainer}>
//       {sections.map((section, index) => (
//         <TouchableOpacity
//           onPress={() => {
//             onChange(index);
//           }}
//           style={{
//             flex: 1 / sections.length,
//             justifyContent: "center",
//             alignItems: "center",
//             padding: 16,
//             backgroundColor: selections[index] ? "#EE9972" : "#495E57",
//             borderWidth: 1,
//             borderColor: "white",
//           }}
//         >
//           <View>
//             <Text style={{ color: selections[index] ? "black" : "white" }}>
//               {section}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   filtersContainer: {
//     backgroundColor: "green",
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
// });

// export default Filters;

import React from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";

import { styles } from "../styles/styles";
import { colors } from "../styles/colors";

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filters}>
      <Text style={styles.cardTitle}>ORDER FOR DELIVERY!</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onChange(index);
            }}
            style={{
              flex: 1 / sections.length,
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
              marginRight: 8,
              marginVertical: 8,
              backgroundColor: selections[index]
                ? colors.primary1
                : colors.highlight,
              borderWidth: 1,
              borderRadius: 16,
              borderColor: "white",
            }}
          >
            <View>
              <Text
                style={[
                  styles.paragraph,
                  {
                    fontWeight: "bold",
                    color: selections[index] ? colors.white : colors.primary1,
                  },
                ]}
              >
                {section}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Filters;
