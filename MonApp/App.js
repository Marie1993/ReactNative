import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WeatherScreen from './screens/WeatherScreen';
import FeedScreen from './screens/FeedScreen';
import ListScreen from './screens/ListScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HistoryContextProvider } from './context/HistoryContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <HistoryContextProvider>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Météo') {
                iconName = focused ? 'sunny' : 'sunny-outline';
              } else if (route.name === 'Liste') {
                iconName = focused ? 'image' : 'image-outline';
              } else if (route.name === 'Feed') {
                iconName = focused ? 'share-social' : 'share-social-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name='Liste' component={ListScreen} />
          <Tab.Screen name='Météo' component={WeatherScreen} />
          <Tab.Screen name='Feed' component={FeedScreen} />
        </Tab.Navigator>
      </HistoryContextProvider>
    </NavigationContainer>
  );
}

// import React, { useEffect, useState } from "react";

// import { Text, View, StyleSheet } from "react-native";
// import * as Location from 'expo-location';
// import WeatherInfo from "./components/WeatherInfo";

// const WEATHER_API_KEY = '6405f165f9f38e0283d6d4b276b172af'
// const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

// //const Tab = createBottomTabNavigator();

// export default function App() {

//   const [errorMessage, setErrorMessage] = useState(null)
//   const [currentWeather, setCurrentWeather] = useState(null)
//   const [unitsSystem, setUnitsSystem] = useState('metric')

//   useEffect(() => {
//     load()
//   }, [])

//   async function load() {
//     try {
//       let { status } = await Location.requestPermissionsAsync() //TODO changer la methode

//       if (status != 'granted') {
//         setErrorMessage('Acces to location is needed to run the app')
//         return
//       }
//       const location = await Location.getCurrentPositionAsync()

//       const { latitude, longitude } = location.coords

//       const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

//       const response = await fetch(weatherUrl)

//       const result = await response.json()

//       if (response.ok) {
//         setCurrentWeather(result)
//       } else {
//         setErrorMessage(result.message)
//       }

//     } catch (error) { }
//   }

//   if (currentWeather) {

//     return (
//       <View style={styles.container}>
//         <View style={styles.main}>
//           <WeatherInfo currentWeather={currentWeather} />
//         </View>
//       </View>
//     );
//   } else {
//     return (
//       <View style={styles.container}>
//         <Text>Erreur
//         </Text>
//         <Text>{errorMessage}</Text>
//       </View>
//     );
//   }

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   main: {
//     justifyContent: 'center',
//     flex: 1
//   }
// })
