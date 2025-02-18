import { View, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import Dropdown from "@/components/DropDown";


const Page = () => {
  return (
    <View style={[styles.container, { padding: 40, marginTop: 80 }]}>
      <Dropdown />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: "flex-start",
    marginTop: 20,
  },
  headerText: {
    marginBottom: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.dark.background,
    padding: 10,
    height: 60,
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#d3d3d3",
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
});

export default Page;
