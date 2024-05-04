import { useSession } from '@/context/SessionContext';
import { View, Text, TouchableOpacity } from 'react-native'

const Page = () => {
  const { signOut } = useSession();
  
  return (
    <View>
      <Text>Page</Text>
      <TouchableOpacity 
        style={{backgroundColor: '#191919', marginTop: 80}}
        onPress={() => {
          signOut();
        }}  
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Page