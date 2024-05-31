import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import { PermissionStatus } from "expo-modules-core";

export default function AddSensorScreen() {
  const [isCamera, setIsCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState<PermissionStatus | null>(
    null
  );
  const [text, setText] = useState("");


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status);
    })();
  }, [isCamera]);

  if (isCamera && hasPermission === null) {
    return <View />;
  }

  if (isCamera && hasPermission !== PermissionStatus.GRANTED) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Text>Text</Text>
        <Switch value={isCamera} onValueChange={setIsCamera} />
        <Text>Camera</Text>
      </View>
      {isCamera ? (
        <Camera style={styles.camera}></Camera>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Enter sensor data"
          value={text}
          onChangeText={setText}
        />
      )}
      <Button
        title="Add"
        onPress={() => {
          // Handle add sensor logic
          console.log("Sensor data:", text);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  camera: {
    width: 300,
    height: 300,
  },
  input: {
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
});
