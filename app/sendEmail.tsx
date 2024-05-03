import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { useState } from 'react'
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

const Page = () => {
  const [email, setEmail] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome</Text>
        <Text style={defaultStyles.descriptionText}>
          Write down your email. You will receive a verification code.
        </Text>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="example@mail.com"
          placeholderTextColor={Colors.light.text}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            { marginBottom: 20 },
          ]}
          onPress={() => Alert.alert('Si')}>
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: 'row',
  },
  input: {
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
  },
  disabled: {
  },
});

export default Page;