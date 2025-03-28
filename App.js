import React, {useEffect, useState} from "react";
import * as Location from 'expo-location';
import {ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import Fontisto from '@expo/vector-icons/Fontisto';

const {width: SCREEN_WIDTH} = Dimensions.get("window");
const API_KEY = "3d8246cb64d6e5756b0021d313b6881f";

const icons = {
    "Clouds": "cloudy",
    "Clear": "day-sunny",
    "Rain": "rain",
    "Snow": "snow",
    "Thunderstorm": "lightning"
}

export default function App() {
    const [city, setCity] = useState("Loading...")
    const [days, setDays] = useState([])
    const [ok, setOk] = useState(true);
    const getWeather = async () => {
        const {granted} = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
            setOk(false);
        }

        const {
            coords: {latitude, longitude},
        } = await Location.getCurrentPositionAsync({accuracy: 5})

        const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false});
        console.log(location)
        setCity(location[0].city)

        // 날씨 가져오기
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
        const json = await response.json();
        console.log(json);

        setDays(
            json.list.filter((weather) => {
                if (weather.dt_txt.includes("12:00:00")) {
                    return weather;
                }
            })
        );
    };
    useEffect(() => {
        getWeather();
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.city}>
                <Text style={styles.cityName}>{city}</Text>
            </View>
            <ScrollView
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.weather}
            >
                {days.length === 0 ? (
                    <View style={styles.day}>
                        <ActivityIndicator
                            color="white"
                            size="large"
                            style={{marginTop: 10}}/>
                    </View>
                ) : (
                    days.map((day, index) =>
                        <View key={index} style={styles.day}>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                width: "80%",
                                justifyContent: "space-between"
                            }}
                            >
                                <Text style={styles.temperature}>
                                    {parseFloat(day.main.temp_max).toFixed(1)}°
                                </Text>
                                <Fontisto style={styles.weatherIcon} name={icons[day.weather[0].main]} size={68} color="black"/>
                            </View>
                            <Text style={styles.description}>{day.weather[0].main}</Text>
                            <Text style={styles.tinyDescription}>{day.weather[0].description}</Text>
                            {/* 날짜 표시 */}
                            <Text style={styles.date}>{day.dt_txt.split(" ")[0]}</Text>
                        </View>
                    )
                )}
            </ScrollView>
            <StatusBar style="dark"></StatusBar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "teal"
    },
    city: {
        flex: 1.1,
        justifyContent: "center",
        alignItems: "center"
    },
    cityName: {
        fontSize: 58,
        fontWeight: "500"
    },
    weather: {
        marginLeft: 20
    },
    day: {
        width: SCREEN_WIDTH,
    },
    temperature: {
        marginTop: 50,
        fontSize: 128,
    },
    description: {
        marginTop: -10,
        fontSize: 40,
    },
    tinyDescription: {
        fontSize: 20,
    },
    date: {
        fontSize: 20,
    },
    weatherIcon: {
        marginTop: 80
    }
});
