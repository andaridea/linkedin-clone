import {
    SafeAreaView,
    SafeAreaProvider,
  } from 'react-native-safe-area-context';

import { StyleSheet, Text, View, Image, Linking, TextInput, TouchableHighlight } from 'react-native';
export default function LoginScreen() {
    return (
      <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <View>
              <Image
                style={styles.tinyLogo}
                source={require('../client/public/images/Linkedin-logo.png')}
              />
              <Text style={styles.textLogin}>Sign in</Text>
              <Text style={styles.textJoin}>
                or{" "}
                <Text
                  style={styles.textLinking}
                  onPress={() =>
                    Linking.openURL("https://www.linkedin.com/")
                  }
                >
                  Join LinkedIn
                </Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Email or Username"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
              />
              <TouchableHighlight >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Sign In</Text>
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