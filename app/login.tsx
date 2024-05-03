import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { SelectList } from 'react-native-dropdown-select-list';
import countries from '@/data/CountryCodes.json'

const Page = () => {

    const [countryCode, setCountryCode] = useState("")

    return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          >
          <View style={defaultStyles.container}>
            <Text style={defaultStyles.header}>Welcome back</Text>
            <Text style={defaultStyles.descriptionText}>
              Enter the phone number associated with your account
            </Text>
            <View style={styles.inputContainer}>
              <SelectList data={countries.filter(x => !!x.dial_code).map((y) => { return { key: y.code, value: y.emoji.concat(y.dial_code!)}})} setSelected={setCountryCode} />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Mobile number"
                placeholderTextColor={Colors.light.text}
                keyboardType="numeric"
              />
            </View>
    
            <TouchableOpacity
              style={[
                defaultStyles.pillButton,
                { marginBottom: 20 },
              ]}
              onPress={() => Alert.alert('Si')}>
              <Text style={defaultStyles.buttonText}>Continue</Text>
            </TouchableOpacity>
    
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <View
                style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.light.text }}
              />
              <Text style={{ color: Colors.light.text, fontSize: 20 }}>or</Text>
              <View
                style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.light.text }}
              />
            </View>
    
            <TouchableOpacity
              onPress={() => Alert.alert('si')}
              style={[
                defaultStyles.pillButton,
                {
                  flexDirection: 'row',
                  gap: 16,
                  marginTop: 20,
                  backgroundColor: '#fff',
                },
              ]}>
              <Ionicons name="mail" size={24} color={'#000'} />
              <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with email</Text>
            </TouchableOpacity>
    
            <TouchableOpacity
              onPress={() => Alert.alert('si')}
              style={[
                defaultStyles.pillButton,
                {
                  flexDirection: 'row',
                  gap: 16,
                  marginTop: 20,
                  backgroundColor: '#fff',
                },
              ]}>
              <Ionicons name="logo-google" size={24} color={'#000'} />
              <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with email </Text>
            </TouchableOpacity>
    
            <TouchableOpacity
              onPress={() => Alert.alert('Apple')}
              style={[
                defaultStyles.pillButton,
                {
                  flexDirection: 'row',
                  gap: 16,
                  marginTop: 20,
                  backgroundColor: '#fff',
                },
              ]}>
              <Ionicons name="logo-apple" size={24} color={'#000'} />
              <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with email </Text>
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