import { NavigationContainer } from "@react-navigation/native"
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";

export default function App() {
  return (
    <NavigationContainer>
      <LoginScreen />
      <RegisterScreen />
    </NavigationContainer>
  );
}