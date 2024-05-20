import { useCart } from "@/context/CartContext";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Text,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { CartProduct } from "@/reducers/cart";
import { defaultStyles } from "@/constants/Styles";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native';
import { useEffect, useState } from "react";

const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

const Page = () => {
  const [ready, setReady] = useState(false)
  const { cart, removeFromCart, addToCart, clearCart, reduceFromCart } = useCart();
  const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet();

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: "Convive",
      allowsDelayedPaymentMethods: true,
    });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      setReady(true)
    }
  }

  const fetchPaymentParams = async () => {
    const response = await fetch("localhost:8080/create-payment-intent", { //todo changes in api to return the 3 things
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
    });

    const {paymentIntent, ephemeralKey, customer} = await response.json()

    return {paymentIntent, ephemeralKey, customer}
  }

  async function buy() {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      Alert.alert(`Success`, 'Thanks for your pursache')
      setReady(false)
    }
  }

  const renderCartItem = ({ item }: { item: CartProduct }) => (
    <View style={styles.cartItem}>
      <Text style={styles.productName}>{item.product.name}</Text>
      <Text style={styles.productPrice}>Price: ${item.product.price}</Text>
      <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
      <Button title="+" onPress={() => addToCart(item.product, 1)} />
      <Button title="-" onPress={() => reduceFromCart(item.product)} />
      <Button
        title="Remove"
        onPress={() => removeFromCart(item.product, item.quantity)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StripeProvider publishableKey={publishableKey || ''}>
        {cart?.cart && cart.cart.length > 0 ? (
          <View>
            <FlatList
              data={cart.cart}
              renderItem={(item) => renderCartItem(item)}
              keyExtractor={(item) => item.product.id.toString()}
            />
            <Button
              title="Clear Cart"
              onPress={clearCart}
            />
            <TouchableOpacity
              style={[
                defaultStyles.pillButton,
                { backgroundColor: Colors.black },
              ]}
              onPress={buy}
            >
              <Text style={defaultStyles.buttonText}>Pagar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>No products in the cart</Text>
        )}
      </StripeProvider>
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
