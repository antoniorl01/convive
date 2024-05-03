import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

const Page = () => {
  const [email, setEmail] = useState("");

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={[styles.container, { padding: 40 }]}>
        <View style={styles.headerContainer}>
          <Text style={[defaultStyles.header, styles.headerText]}>Welcome</Text>
          <Text style={[defaultStyles.descriptionText, styles.headerText]}>
            Write down your email. You will receive a validation code.
          </Text>
        </View>
        <View />
        <TextInput
          style={[styles.input]}
          placeholder="example@mail.com"
          placeholderTextColor={"#191919"}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={[styles.button, { marginBottom: 20 }]}
          onPress={() => {
            if (!email) return;
            router.push({
              pathname: "/verify/[email]",
              params: { email: email },
            });
          }}
        >
          <Text style={{ color: Colors.dark.text, fontSize: 24 }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
