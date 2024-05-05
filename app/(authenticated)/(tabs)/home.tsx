import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import dataSensors from "@/data/sensors.json";
import Colors from "@/constants/Colors";
import { Sensors } from "@/components/Sensors";

const Page = () => {

  return (
    <View style={[styles.container, { padding: 40 }]}>
      <Text>Sensores</Text>
      <TouchableOpacity
        style={[styles.button, { marginBottom: 20 }]}
        onPress={() => {
          Alert.alert("Adding new sensor");
        }}
      >
        <Text style={{ color: Colors.dark.text, fontSize: 24 }}>
          Add New Sensor
        </Text>
      </TouchableOpacity>
      <Sensors sensors={dataSensors} />
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
