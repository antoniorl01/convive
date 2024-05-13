import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useCart } from "@/context/CartContext";
import { View, Text, Image, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  const { cart, removeFromCart, addToCart, clearCart } = useCart();

  if (cart === undefined) {
    return <Text>No hay ningun producto</Text>;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1, backgroundColor: Colors.light.background}}>
        {cart.length === 0 && <Text>No items in the Cart</Text>}
        {cart.length >= 0 &&
          cart.map((product: any) => {
            return (
              <View key={product.id} style={{ backgroundColor: "#f9eba6", flexDirection: 'column',  }}>
                <Image
                  source={require("@/assets/images/cup.png")}
                  style={{ width: 200, height: 200 }}
                  resizeMode="cover"
                />
                <View>
                  <Text style={[defaultStyles.h3]}>{product.title}</Text>
                  <Text style={[defaultStyles.h4]}>{product.quantity}</Text>
                </View>
                <TouchableOpacity onPress={addToCart} style={{width: 50, height: 50}}>
                  <Text style={defaultStyles.h4}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={removeFromCart} style={{width: 50, height: 50}}>
                  <Text style={defaultStyles.h4}>-</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        {cart.lenght >= 0 && (
          <TouchableOpacity onPress={clearCart} style={{backgroundColor: Colors.lightBlue}}>
            <Text>Clear</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;
