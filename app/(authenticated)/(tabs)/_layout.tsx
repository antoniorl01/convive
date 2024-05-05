import CustomHeader from "@/components/CustomHeader";
import Colors from "@/constants/Colors";
import { useSession } from "@/context/SessionContext";
import { FontAwesome } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { Text } from "react-native";

const Layout = () => {
  const { session, isLoading } = useSession();

  // Not needed but i would like an animation or something
  if (isLoading) {
    return (
    <Text>Loading...</Text>
  );
  }

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/" />;
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.dark.background }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
          headerShown: true,
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: "store",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="shopping-bag" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "cart",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="shopping-cart" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "settings",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="gear" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
};
export default Layout;
