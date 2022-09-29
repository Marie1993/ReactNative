import React, { useEffect, useState } from "react";

import { Text, View, StyleSheet } from "react-native";
import * as Location from 'expo-location';
import WeatherInfo from "../components/WeatherInfo";

const WEATHER_API_KEY = 'fc573c996811b65db5442439f571d88d'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'


export default function WeatherScreen() {

    const [errorMessage, setErrorMessage] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(null)
    // const [unitsSystem, setUnitsSystem] = useState('metric')


    useEffect(() => {
        load()
    }, [])

    async function load() {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync() //TODO changer la methode

            if (status != 'granted') {
                setErrorMessage('Acces to location is needed to run the app')
                return
            }

            const location = await Location.getCurrentPositionAsync()

            const { latitude, longitude } = location.coords

            const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`

            const response = await fetch(weatherUrl)

            const result = await response.json()

            if (response.ok) {
                setCurrentWeather(result)
            } else {
                setErrorMessage(result.message)
            }

        } catch (error) {
            console.error(error)
        }
    }

    if (currentWeather) {
        return (
            <View style={styles.container}>
                <View style={styles.main}>
                    <WeatherInfo currentWeather={currentWeather} />
                </View>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text>Chargement en cour ...
                </Text>
                <Text>{errorMessage}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        justifyContent: 'center',
        flex: 1
    }
})