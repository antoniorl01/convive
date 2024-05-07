import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

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
  return (
    <View key={product.id} style={styles.item}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text>{product.title}</Text>
        <Text>{product.description}</Text>
        <Text>${product.price}</Text>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const Products: React.FC<{ products: ProductData[] }> = ({ products }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.container}
        data={products}
        keyExtractor={(product) => String(product.id)}
        renderItem={({ item }) => <Product product={item} />}
      />
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
  },
});

export default Products;
