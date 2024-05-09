import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useCart } from "@/context/CartContext";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";

interface ProductData {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  category: string;
  images: string[];
}

interface ProductProps {
  product: ProductData;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <View key={product.id} style={styles.item}>
      <Image
        source={require("@/assets/images/cup.png")}
        style={{ width: 180, height: 280 }}
        resizeMode={"cover"}
      />
      <View style={{display: "flex", flexDirection: 'row', gap: 10}}>
        <View>
          <Text style={[defaultStyles.h4]}>{product.title}</Text>
          <Text style={{fontSize: 50, fontWeight: '700', color: Colors.dark.text}}>${product.price}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            addToCart;
          }}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Products: React.FC<{ products: ProductData[] }> = ({ products }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: gap, justifyContent: 'center', alignItems: 'center' }}
        columnWrapperStyle={{ gap: gap }}
        numColumns={2}
        data={products}
        keyExtractor={(product) => String(product.id)}
        renderItem={({ item }) => <Product product={item} />}
      />
    </SafeAreaView>
  );
};

const windowsWidth = Dimensions.get('window').width;
const width = windowsWidth * 0.45;
const height = Dimensions.get('window').height * 0.4;
const gap = windowsWidth * 0.05;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ffd1de",
    borderRadius: 40,
    height: height,
    width: width,
    
  },
  container: {
    flex: 1,
  }
});

export default Products;
