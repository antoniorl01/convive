import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 16,
    paddingVertical: 40
  },
  header: {
    fontSize: 44,
    fontWeight: '700',
  },
  h3: {
    fontSize: 32,
    fontWeight: '500',
  },
  h4: {
    fontSize: 28,
    fontWeight: '400', 
  },
  pillButton: {
    padding: 10,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLink: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 18,
    marginTop: 20,
    color: "#899499",
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  pillButtonSmall: {
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextSmall: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    marginBottom: 10,
  },
  block: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    gap: 20,
  },
  textInput: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    fontSize: 20,
  },
});