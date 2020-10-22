import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

import Loading from './Loading';
import Weather from './Weather';

const API_KEY = '6939111834468c454bd21e07b6b11a64';
// http://api.openweathermap.org/data/2.5/weather?lat=37.4968989&lon=126.8458408&appid=6939111834468c454bd21e07b6b11a64

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState({ temp: 0, condition: '' });

  useEffect(() => {
    (async () => {
      try {

        await Location.requestPermissionsAsync();
        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});

        // send weather api
        const {
          data: {
            main: { temp },
            weather
          }
        } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
        setWeather({
          temp: Math.round(temp),
          condition: weather[0].main
        });
        setIsLoading(false);
      } catch (error) {
        Alert.alert("Can't find you.", "So sad");
      }
    })();
  }, []);

  return (
    isLoading
      ?
      <Loading />
      :
      <Weather
        temp={weather.temp}
        condition={weather.condition}
      />
  );
}