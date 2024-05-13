import { defaultStyles } from "@/constants/Styles";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export interface IProduct {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
}

const Product = ({ item }: { item: IProduct }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(item.name + "was added");
      }}
      style={styles.container}
    >
      <View key={item.id} style={styles.circle}>
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <Text style={defaultStyles.h3}>{item.name}</Text>
          <Text style={defaultStyles.h3}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#191919",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Product;
