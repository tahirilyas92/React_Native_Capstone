import * as React from "react";
import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, Image, Alert, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../contexts/AuthReducer";
import { ACTION_TYPES } from "../contexts/AuthActionTypes";
import Hero from "../components/Hero";
import Filters from "../components/Filters";
import ItemList from "../components/ItemList";
import { colors } from "../styles/colors";
import { fetchData } from "../utils/api";
import debounce from "lodash.debounce";
import { useUpdateEffect } from "../utils/utils";
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  deleteAllMenuItems,
  filterByQueryAndCategories,
} from "../utils/database";
import { getItem } from "../utils/asyncStorage";

const sections = ["Starters", "Mains", "Desserts", "Drinks"];

const Item = ({ name, price, description, image, category }) => (
  <View style={styles.item}>
    <View style={styles.itemContainer}>
      <View style={styles.menu}>
        <Text
          style={[styles.cardTitle, { fontWeight: "600", marginBottom: 0 }]}
        >
          {name}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[styles.paragraph, { color: colors.black }]}
        >
          {description}
        </Text>
        <Text style={[styles.paragraph, { color: colors.black }]}>
          ${price}
        </Text>
      </View>
      <Image
        source={{
          uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
        }}
        style={styles.menuPicture}
      />
    </View>
  </View>
);

export default function HomeScreen({ navigation }) {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  const [query, setQuery] = useState("");
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const getUserInfo = async () => {
    try {
      const jsonValue = await getItem("userInfo");
      console.log(jsonValue);
      if (jsonValue == null) {
        console.warn("Could not load user data from async storage!");
      } else {
        dispatch({
          type: ACTION_TYPES.USERINFO_UPDATE_MULTI,
          payload: {
            firstName: jsonValue.firstName,
            lastName: jsonValue.lastName,
            email: jsonValue.email,
            phoneNumber: jsonValue.phoneNumber,
            profilePicture: jsonValue.profilePicture,
            emailOrderStatuses: jsonValue.emailOrderStatuses,
            emailPasswordChanges: jsonValue.emailPasswordChanges,
            emailSpecialOffers: jsonValue.emailSpecialOffers,
            emailNewsletter: jsonValue.emailNewsletter,
          },
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        // await deleteAllMenuItems();
        let menuItems = await getMenuItems();
        // console.log("HomeScreen/LoadedFromDB: menuItems");
        // console.log(menuItems);

        if (!menuItems.length) {
          menuItems = await fetchData();
          menuItems.map((item) => saveMenuItems(item));
        }
        setData(menuItems);
        console.log("Home: menuItems");
        console.log(menuItems);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });

      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        setData(menuItems);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  console.log("Home: data");
  console.log(data.menu);
  return (
    <View style={styles.container}>
      <Hero
        handleSearchChange={handleSearchChange}
        searchBarText={searchBarText}
      />
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
      <FlatList
        style={{ paddingHorizontal: 10 }}
        data={data}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
  },
  item: {
    display: "flex",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  menu: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 10,
  },
  menuPicture: { width: 80, height: 80, marginLeft: 10 },
  filters: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 10,
    borderBottomColor: colors.highlight,
    borderBottomWidth: 2,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: colors.white,
    fontFamily: "RobotoMono-Regular",
  },

  cardTitle: {
    fontSize: 18,
    // fontWeight: "300",
    fontFamily: "RobotoMono-Regular",
    marginBottom: 10,
  },
});
