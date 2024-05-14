import { defaultStyles } from "@/constants/Styles";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

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
    <View style={styles.page}>
      <TouchableOpacity style={styles.container}>
        <View key={item.id}>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Text style={defaultStyles.h3}>{item.name}</Text>
            <Text style={defaultStyles.h3}>${item.price}</Text>
            <Text style={defaultStyles.h3}>{counter}</Text>
            <TouchableOpacity onPress={addCounter}>
              <Text style={defaultStyles.h3}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={removeCounter}>
              <Text style={defaultStyles.h3}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addToCart(item, counter)}>
              <Text style={[defaultStyles.h3, {backgroundColor: "f9eba6"}]}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    alignItems: "flex-start",
    gap: 10,
  },
});

export default Product;
