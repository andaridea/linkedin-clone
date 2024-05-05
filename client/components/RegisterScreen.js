import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const MUTATION_REGISTER = gql`
mutation Mutation($newUser: newUser) {
  register(newUser: $newUser) {
    _id
    name
    username
    email
    profilePic
  }
}
`
export default function RegisterScreen() {
  const navigate = useNavigation()
  const [register, { loading, error, data }] = useMutation(MUTATION_REGISTER)
  const [name, onChangeName] = useState("")
  const [email, onChangeEmail] = useState("")
  const [username, onChangeUsername] = useState("")
  const [password, onChangePassword] = useState("")
  const [profilePicture, onChangeProfilePicture] = useState("")

  if (loading)
    return (
      <>
        <View
  
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator sezi="large" />
          <Text>Loading...</Text>
        </View>
      </>
    )
  
  if (error)
    return (
      <>
        <View
  
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>Something went wrong</Text>
        </View>
      </>
    )

  async function handleSubmit() {
    // console.log("Tombol sign up")
    try {
      const result = await register({
        variables: {
          newUser: {
            name: name,
            email: email,
            username: username,
            password: password,
            profilePic: profilePicture
          }
        }
      })
      navigate.navigate("Login")
      // console.log(result, "<<<<<<<<<, result")
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(loading, error,data)
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <Image
            style={styles.tinyLogo}
            source={require('../public/images/Linkedin-logo.png')}
          />
          <Text style={styles.textRegister}>Join LinkedIn</Text>
          <Text style={styles.textLogin}>
            or{" "}
            <Text
              style={styles.textLinking}
              onPress={() => navigate.navigate("Login")
              }
            >
              Sign In
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
            placeholder="Username"
            onChangeText={onChangeUsername}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={onChangeName}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder="Profile Picture"
            onChangeText={onChangeProfilePicture}
            value={profilePicture}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={onChangePassword}
            value={password}
          />
          <TouchableHighlight
            title="Submit"
            onPress={handleSubmit}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
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
  textRegister: {
    marginTop: 50,
    marginLeft: 25,
    fontWeight: "bold",
    fontSize: 30
  },
  textLogin: {
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