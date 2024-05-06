import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const Page = () => {
  const router = useRouter();

  return (
    <View style={defaultStyles.container}>
      <View style={[defaultStyles.sectionHeader, { flex: 1, gap: 10 }]}>
        <Text style={defaultStyles.header}>ConVive</Text>
        <Text style={defaultStyles.h3}>
          Un mundo mejor para todos
        </Text>
      </View>
      <TouchableOpacity
        style={[defaultStyles.pillButton, {backgroundColor: Colors.black}]}
        onPress={() => {
          router.push("/sendEmail");
        }}
      >
        <Text style={defaultStyles.buttonText}>
          Start
        </Text>
      </TouchableOpacity>
    </View>
  );
};


export default Page;
