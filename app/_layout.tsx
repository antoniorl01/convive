import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [ready, setReady] = useState(false);
  const router = useRouter();
  const { authState } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      setReady(true); // Marcar como listo para navegar
    }
  }, [loaded]);

  useEffect(() => {
    if (ready && authState) {
      const inAuthGroup = segments[0] === "(authenticated)";
      if (inAuthGroup) {
        console.log("auth");
        router.replace("/(authenticated)/(tabs)/home");
      } else {
        router.replace("/");
      }
    }
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: "" }} />
      <Stack.Screen
        name="sendEmail"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#fff" },
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
          headerStyle: { backgroundColor: "#fff" },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={"#191919"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(authenticated)/(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayoutNav;
