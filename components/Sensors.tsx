import { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

function ListOfSensors({ sensors }: any) {
  console.log(sensors);

  return (
    <ScrollView>
      {sensors.map((sensor: any) => (
        <View key={sensor.id}>
          <Text>{sensor.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function NoSensorFound({sensors}: any) {
  return (
    <View>
      <Text>
        No data available. Add a sensor and start meassuring to improve your
        corps!
      </Text>
      <TouchableOpacity
        onPress={() => {
            console.log(sensors)
        }}
      >
        <Text>
          Console Log
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function Sensors({ sensors }: any) {
    useEffect(() => {
        console.log(sensors)
      }, [])

  const hasSensors = sensors?.length > 0;

  return hasSensors ? <ListOfSensors sensors={sensors} /> : <NoSensorFound sensors={sensors}/>;
}
