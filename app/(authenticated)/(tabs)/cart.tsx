import { useCart } from "@/context/CartContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, StyleSheet, Button, View } from "react-native";
import { CartProduct } from "@/reducers/cart";

const Page = () => {
  const { cart, removeFromCart, addToCart, clearCart, reduceFromCart } =
    useCart();

  const renderCartItem = ({ item }: { item: CartProduct }) => (
    <View style={styles.cartItem}>
      <Text style={styles.productName}>{item.product.name}</Text>
      <Text style={styles.productPrice}>Price: ${item.product.price}</Text>
      <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
      <Button title="+" onPress={() => addToCart(item.product, 1)} />
      <Button title="-" onPress={() => reduceFromCart(item.product, 1)} />
      <Button
        title="Remove"
        onPress={() => removeFromCart(item.product, item.quantity)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {!(
        cart?.cart === null ||
        cart?.cart === undefined ||
        cart?.cart.length === 0
      ) ? (
        <View>
          <FlatList
            data={cart.cart}
            renderItem={(item) => renderCartItem(item)}
            keyExtractor={(item) => item.product.id.toString()}
          />
          <Button
            title="Clear Cart"
            onPress={() => {
              clearCart();
            }}
          />
        </View>
      ) : (
        <Text>No products in the cart</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
  },
  productQuantity: {
    fontSize: 14,
  },
});

export default Page;
