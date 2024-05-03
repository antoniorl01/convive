import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';

const Page = () => {
  const router = useRouter();

  return (
    <View style={[styles.container, {padding: 40}]}>
      <View style={styles.headerContainer}>
        <Text style={[defaultStyles.header, styles.headerText]}>ConVive</Text>
        <Text style={[defaultStyles.header, styles.headerText]}>Un mundo mejor para todos</Text>
      </View>
      <TouchableOpacity style={[styles.button, {marginBottom: 20}]} onPress={() => { router.push('/login') }}>
        <Text style={{ color: Colors.dark.text, fontSize: 24}}>Press Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 20, 
  },
  headerContainer: {
    alignItems: 'flex-start',
    marginTop: 20, 
  },
  headerText: {
    marginBottom: 10, 
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    padding: 10,
    height: 60,
    justifyContent: 'center',
    textAlign: 'center'
  },
});

export default Page;
