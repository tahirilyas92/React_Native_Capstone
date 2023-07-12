import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  hero: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: colors.primary1,
  },
  heroBottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroImage: {
    color: colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  logo: {
    width: 200,
    height: 40,
    resizeMode: "contain",
  },
  heroImageContainer: {
    width: 180,
    height: 180,
    borderRadius: 16,
    marginLeft: 4,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "white",
  },
  heroImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    borderRadius: 16,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginLeft: 4,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "white",
    alignSelf: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    borderRadius: 16,
  },
  headerImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderRadius: 16,
  },
  form: {
    marginTop: 20,
  },
  formText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.disabled,
    marginBottom: 2,
  },
  input: {
    height: 40,
    borderColor: colors.disabled,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    height: 50,
    backgroundColor: colors.primary1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: colors.disabled,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "300",
  },
  title: {
    fontSize: 64,
    fontWeight: "300",
    fontFamily: "Kablammo-Regular",
    color: colors.primary2,
  },
  subTitle: {
    fontSize: 40,
    fontWeight: "300",
    fontFamily: "Kablammo-Regular",
    color: colors.white,
  },
  paragraph: {
    fontSize: 16,
    color: colors.white,
    fontFamily: "RobotoMono-Regular",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "300",
    fontFamily: "RobotoMono-Regular",
    marginBottom: 10,
  },
  checkbox: {
    margin: 8,
  },
  leftItem: {
    flex: 1,
    paddingLeft: 4,
    alignItems: "flex-start",
    paddingBottom: 4,
  },
  rightItem: {
    flex: 1,
    paddingRight: 4,
    alignItems: "flex-end",
    paddingBottom: 4,
  },
  headerItem: {
    flex: 2,
    paddingBottom: 4,
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fixToButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
  roundButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: colors.white,
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
  searchBar: {
    marginBottom: 24,
    backgroundColor: "#495E57",
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
