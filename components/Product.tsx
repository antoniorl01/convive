import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export interface IProduct {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
}

const Product = ({ item }: { item: IProduct }) => {
  const { addToCart } = useCart();
  const [counter, setCounter] = useState(0);

  const addCounter = () => {
    setCounter(counter + 1);
  };

  const removeCounter = () => {
    if (counter <= 1) return;
    setCounter(counter - 1);
  };

  return (
    <View style={styles.cartItem}>
    <Text style={styles.productName}>{item.name}</Text>
    <Text style={styles.productPrice}>Price: ${item.price}</Text>
    <Text style={styles.productQuantity}>{counter}</Text>
    <Button title="+" onPress={addCounter} />
    <Button title="-" onPress={removeCounter} />
    <Button disabled={counter === 0} title="Add" onPress={() => addToCart(item, counter)} />
  </View>
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

export default Product;