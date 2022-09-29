import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import WeatherInfo from '../components/WeatherInfo';
import { HistoryContext } from '../context/HistoryContext';

// const WEATHER_API_KEY = '6405f165f9f38e0283d6d4b276b172af'
const WEATHER_API_KEY = 'fc573c996811b65db5442439f571d88d';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export default function FeedScreen() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { setNewSearch } = useContext(HistoryContext);

  const handleButton = async () => {
    const weatherUrl = `${BASE_WEATHER_URL}q=${text}&units=metric&appid=${WEATHER_API_KEY}`;

    setResponse(await fetch(weatherUrl));

    const result = await response?.json();

    console.log('WXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', weatherUrl);
    if (response?.ok && result) {
      setCurrentWeather(result);
      setNewSearch(result);
      //
    } else {
      setErrorMessage(result?.message);
    }
  };

  return (
    <View>
      <Text>Chercher une ville</Text>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        placeholder='city'
      />
      <Button
        onPress={() => handleButton()}
        title='Envoyer'
        style={styles.button}
      />
      {currentWeather && <WeatherInfo currentWeather={currentWeather} />}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
  },
});
