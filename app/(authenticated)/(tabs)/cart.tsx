import { useCart } from '@/context/CartContext'
import { View, Text } from 'react-native'

const Page = () => {
  const cartItem = useCart()

  return (
    <View>
      <Text>cart</Text>
    </View>
  )
}

export default Page