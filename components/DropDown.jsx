import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import datos from "@/data/sensors.json";
import { useState } from "react";
import { ListOfSensors } from "./Sensors";
import Colors from "@/constants/Colors";


const DropdownComponent = () => {
  const [value, setValue] = useState(datos[0].sensor_id);

  return (
    <View style={{flex: 1}}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={datos}
        maxHeight={300}
        valueField={"sensor_id"}
        labelField={"name"}
        onChange={(item) => {
          setValue(item.sensor_id);
        }}
        value={value}
        placeholder="Sensor..."
        searchPlaceholder="Sensor..."
      />
      <ListOfSensors sensor={datos.find(item => item.sensor_id === value)}/>
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
