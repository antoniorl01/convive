import { useCart } from "@/context/CartContext";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native";

const Page = () => {
  const { cart, removeFromCart, addToCart, clearCart } = useCart();

  if (cart === undefined) {
    return <Text>No hay ningun producto</Text>
  }

  return (
    <View>
      {cart.length === 0 && <Text>No items in the Cart</Text>}
      {cart.length >= 0 &&
        cart.map((product: any) => {
          return (
            <View key={product.id}>
              <Text>{product.brand}</Text>
              <Text>{product.title}</Text>
              <Text>{product.quantity}</Text>
              <Image 
                source={{
                  uri: product.thumbnail,
                  method: 'GET'
                }} 
                style={{width: 400, height: 400}} 
                resizeMode="cover"/>
              <TouchableOpacity onPress={addToCart}>
                <Text>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={removeFromCart}>
                <Text>-</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      {cart.lenght >= 0 && (
        <TouchableOpacity onPress={clearCart}>
          <Text>Clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Page;
