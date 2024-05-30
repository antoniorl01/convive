import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { TouchableOpacity } from "react-native";
import { SessionProvider } from "@/context/SessionContext";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { CartProvider } from "@/context/CartContext";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const router = useRouter();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  //Don't delete
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          title: "",
          headerStyle: { backgroundColor: Colors.light.background },
        }}
      />
      <Stack.Screen
        name="sendEmail"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.light.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={"#191919"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="verify/[email]"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.light.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={"#191919"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(authenticated)/(tabs)"
        options={{ headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="(authenticated)/(modals)/help"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "modal",
          title: "Help",
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <SessionProvider>
      <CartProvider>
        <InitialLayout />
      </CartProvider>
    </SessionProvider>
  );
};

export default RootLayoutNav;
