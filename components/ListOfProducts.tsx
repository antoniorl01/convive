import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import Product from "./Product";

const DATA = [
  {
    "id": "30",
    "name": "Key Holder",
    "description": "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
    "price": 30,
    "image": "https://i.dummyjson.com/data/products/30/thumbnail.jpg"
  },
  {
    "id": "6",
    "name": "MacBook Pro",
    "description": "MacBook Pro 2021 with mini-LED display may launch between September, November",
    "price": 1749,
    "image": "https://i.dummyjson.com/data/products/6/1.png"
  },
  {
    "id": "2",
    "name": "iPhone X",
    "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    "price": 899,
    "image": "https://i.dummyjson.com/data/products/2/1.jpg"
  },
  {
    "id": "3",
    "name": "Samsung Universe 9",
    "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
    "price": 1249,
    "image": "https://i.dummyjson.com/data/products/3/1.jpg"
  },
  {
    "id": "4",
    "name": "OPPOF19",
    "description": "OPPO F19 is officially announced on April 2021.",
    "price": 280,
    "image": "https://i.dummyjson.com/data/products/4/1.jpg"
  }
]

const ListOfProducts = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Product item={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ListOfProducts;
