import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";

const Page = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <StatusBar style="light" />
      <Text>
        Mock up text to preview what it will look like. If anyone is looking I'm Antonio. I'm a software developer
        that works as an Automation Engineer. If any doubts about this app, email antonio.rl.1011@gmail.com
      </Text>
    </View>
  );
};

export default Page;
