import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

import Loading from './Loading';
import Weather from './Weather';

const API_KEY = '6939111834468c454bd21e07b6b11a64';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState({ temp: 0, condition: '' });

  useEffect(() => {
    (async () => {
      try {
        await Location.requestPermissionsAsync();

        // 위도, 경도 가져오기
        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});

        await Location.setGoogleApiKey('AIzaSyBO4pj4wnpQEJ7rPMWTm-mW_PIugbV0GZc');
        const result = await Location.reverseGeocodeAsync({ latitude: latitude, longitude: longitude }, {});

        // send weather api
        const {
          data: {
            main: { temp },
            weather
          }
        } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);

        setWeather({
          location: result[1].name,
          temp: Math.round(temp),
          condition: weather[0].main
        });
        setIsLoading(false);
      } catch (error) {
        Alert.alert("Can't find you.", "So sad");
      }
    })();
  }, []);
  console.log('---------- start -----------');
  console.log(weather);
  console.log('----------  end  ------------');
  return (
    isLoading
      ?
      <Loading />
      :
      <Weather
        weather={weather}
        condition={weather.condition}
      />
  );
}