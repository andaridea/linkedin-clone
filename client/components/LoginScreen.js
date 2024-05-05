import {
    SafeAreaView,
    SafeAreaProvider,
  } from 'react-native-safe-area-context';

import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation, gql } from '@apollo/client';
import { useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../context/AuthContext';


const MUTATION_LOGIN = gql`
mutation Login($input: Login) {
  login(input: $input) {
    access_token
  }
}
`

export default function LoginScreen() {
  const[email, onChangeEmail] = useState("")
  const [password, onChangePassword] = useState("")
  const [login, {loading, error, data}] = useMutation(MUTATION_LOGIN)

  const { setIsSignedIn } = useContext(AuthContext)
  async function handleSubmit() {
    try {
      console.log("Tombol sign in", email, password)
      const result = await login({
        variables: {
          input: {
            email: email,
            password: password
          }
        }
      })
      console.log(result)
      setIsSignedIn(true)
      await SecureStore.setItemAsync("access_token", `Bearer ${result.data.login.access_token}`);
      // console.log(token, "<<<<<<<<ini di login")
    } catch (error) {
      Alert.alert(error.message)
      console.log("Error setting token:", error.message)
    }
  }
  console.log(loading, error, data, "<<<<<<")
  const navigate = useNavigation()
    return (
      <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <View>
              <Image
                style={styles.tinyLogo}
                source={require('../public/images/Linkedin-logo.png')}
              />
              <Text style={styles.textLogin}>Sign in</Text>
              <Text style={styles.textJoin}>
                or{" "}
                <Text
                  style={styles.textLinking}
                  onPress={() => navigate.navigate("Register")
                  }
                >
                  Join LinkedIn
                </Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={onChangeEmail}
                value={email}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={true}
              />
              <TouchableHighlight 
                title="Submit"
                onPress={handleSubmit}
              >
                <View style={styles.button}>
                  <Text 
                  style={styles.buttonText}
                  >Sign In</Text>
                </View>
              </TouchableHighlight>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    textLogin: {
      marginTop: 50,
      marginLeft: 25,
      fontWeight: "bold",
      fontSize: 30
    },
    textJoin: {
      marginLeft: 25,
      fontSize: 15
    },
    textLinking: {
      fontSize: 15,
      color: "#1E90FF",
      fontWeight: "bold"
    },
    tinyLogo: {
      width: 150,
      height: 100,
      marginLeft: 10
    },
    input: {
      marginLeft: 25,
      marginRight: 25,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    button: {
      alignItems: 'center',
      padding: 10,
      marginLeft: 25,
      marginRight: 25,
      borderRadius: 30,
      backgroundColor: "#1E90FF",
    },
    buttonText: {
      color: "#FFFFFF"
    },
    textOr: {
      fontSize: 20,
      marginTop: 30,
    },
  });