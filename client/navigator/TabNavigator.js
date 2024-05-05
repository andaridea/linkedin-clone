import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/HomeScreen';
import SettingsScreen from '../components/SettingsScreen';
import PostScreen from '../components/PostScreen';
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
     <>
      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused ? "home": "home-outline"
              } else if (route.name === 'Settings') {
                iconName = focused 
                ? 'settings' 
                : 'settings-outline';
              } else if(route.name === 'Post'){
                iconName = focused
                ? 'add-circle' 
                : 'add-circle-outline';
              }
              
              return (
              <Ionicons 
              name={iconName} 
              size={size} 
              color={color} 
              />
              
              )
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',

          }
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Post" component={PostScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
     </>
  );
}