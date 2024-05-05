import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

import TabNavigator from "./TabNavigator"
import LoginScreen from "../components/LoginScreen";
import RegisterScreen from "../components/RegisterScreen";
import DetailScreen from "../components/DetailScreen";
import PostScreen from "../components/PostScreen";
import * as SecureStore from 'expo-secure-store';

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Image, Button, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MainStackNavigator() {
  const { isSignedIn,setIsSignedIn } = useContext(AuthContext)
  const navigation = useNavigation()
  return (
    <Stack.Navigator>
      {
        isSignedIn ? (
          <>
            <Stack.Screen
              name="HomeTab"
              component={TabNavigator}
              options={{
                headerLeft: () => (
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                  />
                ),
                headerTitle: () => (
                  <TextInput
                    placeholder="Search..."
                    style={{ flex: 1, marginLeft: 50, marginRight: 10 }}
                    // onChangeText={(text) => {
                    //   // Handle search functionality here
                    // }}
                  />
                ),
                headerRight: () => (
                  <Button
                    title="Logout"
                    onPress={async() => {
                      await SecureStore.deleteItemAsync("access_token")
                      setIsSignedIn(false)
                      navigation.navigate("Login")
                    }}
                    style={{ marginRight: 10 }}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="Details"
              component={DetailScreen}
              options={{
                // headerShown: false
              }}
            />
            <Stack.Screen
              name="PostTab"
              component={PostScreen}
              options={{
                // headerShown: false
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                headerShown: false
              }}
            />
          </>
        )
      }
    </Stack.Navigator>
  )
}