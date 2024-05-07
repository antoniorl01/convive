import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import dataSensors from "@/data/sensors.json";
import Colors from "@/constants/Colors";
import { Sensors } from "@/components/Sensors";
import LineGraph from "@/components/LineGraph";

const Page = () => {
  return (
    <View style={[styles.container, { padding: 40, marginTop: 80 }]}>
      <Text>Sensores</Text>
      {
        //<Sensors sensors={dataSensors} />
      }
      <LineGraph
        data={[12, 5, 9, 30, 20, 51, 20, 1, 4, 2, 70]}
        colorStoke={Colors.blue}
        colorGradient={Colors.lightBlue}
        label='Soil Temperature'
      />
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
