import { ScrollView, Text, StyleSheet, View } from "react-native";
import LineGraph from "./LineGraph";
import Colors from "@/constants/Colors";

export const ListOfSensors = ({sensor}: SensorDataComponentProps) => {
  const groupedData = groupDataByType(sensor.data);

  return (
    <ScrollView style={{flex: 1, gap: 20}}>
      <Text style={styles.header}>Sensor: {sensor.name}</Text>
      {Object.keys(groupedData).map((type) => (
        <View key={type} style={styles.section}>
          <Text style={styles.type}>{type}</Text>
          <LineGraph
            data={groupedData[type]}
            colorStoke={Colors.blue}
            colorGradient={Colors.lightBlue}
            label={type}
            unit="ºC"
          />
        </View>
      ))}
    </ScrollView>
  );
}

interface SensorData {
  time: string;
  s_temperature: number;
  s_humidity: number;
  s_conductivity: number;
  s_nitrogen: number;
  s_phosphorus: number;
  s_potassium: number;
  s_pH: number;
  s_tensiometer: number;
  a_temperature: number;
  a_humidity: number;
  wind_speed: number;
  wind_direction: number;
  light_intensity: number;
  co2: number;
}

interface Sensor {
  sensor_id: string;
  name: string;
  data: SensorData[];
}

interface SensorDataComponentProps {
  sensor: Sensor;
}

const groupDataByType = (data: SensorData[]) => {
  const groupedData: { [key: string]: number[] } = {};

  data.forEach((entry) => {
    Object.keys(entry).forEach((key) => {
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      if (typeof entry[key as keyof SensorData] === 'number') {
        groupedData[key].push(entry[key as keyof SensorData] as number);
      }
    });
  });

  return groupedData;
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 4,
  },
});

