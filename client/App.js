import { NavigationContainer } from "@react-navigation/native"
import MainStackNavigator from "./navigator/MainStackNavigator";
import { ApolloProvider } from "@apollo/client";
import * as SecureStore from 'expo-secure-store';
import client from "./config/apollo";
import { useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { View, Image, StyleSheet } from "react-native";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getToken () {
      let result = await SecureStore.getItemAsync("access_token")
      if (result) {
        setIsSignedIn(true)
      }
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
    getToken()
  }, [])

  if (isLoading)
    return (
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Image
          style={styles.tinyLogo}
          source={require('./public/images/linkedin2.png')}
        />
      </View>
    )
  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </AuthContext.Provider>

  );
}
const styles = StyleSheet.create({
  tinyLogo: {
    width: 400,
    height: 400,
  }
})