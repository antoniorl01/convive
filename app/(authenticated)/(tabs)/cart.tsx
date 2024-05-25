import { useCart } from "@/context/CartContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, StyleSheet, Button, View, Alert } from "react-native";
import { CartProduct } from "@/reducers/cart";
import { useState } from "react";
import { CardField, CardFieldInput, useConfirmPayment } from "@stripe/stripe-react-native";
import { useSession } from "@/context/SessionContext"; 
import * as SecureStore from "expo-secure-store";


const getEmail = async () => {
  // Replace with your token retrieval logic
  return await SecureStore.getItem('email');
};

const Page = () => {

  const { cart, removeFromCart, addToCart, clearCart, reduceFromCart } = useCart();
  const { session } = useSession();

  const [cardDetails, setCardDetails] = useState<CardFieldInput.Details | null>(null);
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`https://8b86-2a0c-5a82-320a-300-f801-6ce8-c914-2be1.ngrok-free.app/api/v1/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${session}`,
      },
      body: JSON.stringify({ items: cart!.cart, payment_method_type: "card" }), 
    });

    const result = await response.json();
    const { client_secret: clientSecret, error } = result;
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    // Gather the customer's billing information
    if (!cardDetails?.complete) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }

    const email = await getEmail();

    const billingDetails = {
      email: email!,
    };

    // Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      // Confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
          paymentMethodData: {
            billingDetails
          }
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
    // Confirm the payment with the card details
  };

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
      {cart && cart.cart && cart.cart.length > 0 ? (
        <View>
          <FlatList
            data={cart.cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.product.id.toString()}
          />
          <Button
            title="Clear Cart"
            onPress={() => {
              clearCart();
            }}
          />
          <CardField
            placeholders={{ number: "4242 4242 4242 4242" }}
            onCardChange={(cardDetails) => {
              setCardDetails(cardDetails);
            }}
            style={styles.cardContainer}
          />
        <Button onPress={handlePayPress} title="Pay" disabled={loading} />
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
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});

export default Page;
