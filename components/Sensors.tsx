import { View, Text, ScrollView } from "react-native";

function ListOfSensors({ sensors }: any) {
  return (
    <ScrollView style={{flex: 1, gap: 20}}>
      {sensors.map((sensor: any) => (
        <View key={sensor.id}>
          <Text>name: {sensor.name}</Text>
          <Text>uploaded_at: {sensor.first_upload.uploaded_at}</Text>
          <Text>humidity_soil: {sensor.first_upload.humidity_soil}</Text>
          <Text>humidity_air: {sensor.first_upload.humidity_air}</Text>
          <Text>temperature_soil: {sensor.first_upload.temperature_soil}</Text>
          <Text>temperature_air: {sensor.first_upload.temperature_air}</Text>
          <Text>pH: {sensor.first_upload.pH}</Text>
          <Text>potassium: {sensor.first_upload.potassium}</Text>
          <Text>phosporus: {sensor.first_upload.phosporus}</Text>
          <Text>nitrogen: {sensor.first_upload.nitrogen}</Text>
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
    </View>
  );
}

export function Sensors({ sensors }: any) {

  const hasSensors = sensors?.length > 0;

  return hasSensors ? <ListOfSensors sensors={sensors} /> : <NoSensorFound sensors={sensors}/>;
}
