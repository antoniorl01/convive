import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

const Page = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  function getToken(email: string) {
    fetch("https://8b86-2a0c-5a82-320a-300-f801-6ce8-c914-2be1.ngrok-free.app/api/v1/token", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch(Error => console.log(Error));
  }

  return (
    <View style={[defaultStyles.container]}>
      <KeyboardAvoidingView behavior="padding" style={{ gap: 20 }}>
        <View style={[defaultStyles.sectionHeader, { gap: 10 }]}>
          <Text style={defaultStyles.header}>Welcome</Text>
          <Text style={defaultStyles.h4}>
            Write down your email. {"\n"}
            You will receive a validation code.
          </Text>
        </View>
        <TextInput
          style={[defaultStyles.textInput]}
          placeholder="example@mail.com"
          placeholderTextColor={Colors.lightGray}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setValidEmail(regex.test(text));
          }}
        />
      </KeyboardAvoidingView>
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          validEmail ? styles.buttonActive : styles.buttonDisabled,
        ]}
        disabled={!validEmail}
        onPress={() => {
          getToken(email);
          router.push({
            pathname: "/verify/[email]",
            params: { email: email },
          });
        }}
      >
        <Text style={{ color: Colors.dark.text, fontSize: 24 }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonActive: {
    backgroundColor: Colors.black,
  },
  buttonDisabled: {
    backgroundColor: "#E7E7E7",
  },
});

export default Page;
