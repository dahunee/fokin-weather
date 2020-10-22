import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const weatherOptions = {
    Haze: { iconName: 'weather-hail', gradient: ['#4DA0B0', '#D39D38'], title: 'title', subtitle: 'subtitle' },
    Thunderstorm: { iconName: 'weather-lightning', gradient: ['#090979', '#00d4ff'], title: 'title', subtitle: 'subtitle' },
    Drizzle: { iconName: 'weather-hail', gradient: ['#89F7FE', '#66A6FF'], title: 'title', subtitle: 'subtitle' },
    Rain: { iconName: 'weather-rainy', gradient: ['#00C6FB', '#005BEA'], title: 'title', subtitle: 'subtitle' },
    Snow: { iconName: 'weather-snowy', gradient: ['#7DE2FC', '#B9B6E5'], title: 'title', subtitle: 'subtitle' },
    Clouds: { iconName: 'weather-cloudy', gradient: ['#D7D2CC', '#304352'], title: 'In case this is too long', subtitle: 'and this one as well then?' },
    Atmosphere: { iconName: 'weather-hail', gradient: ['#89F7FE', '#66A6FF'], title: 'title', subtitle: 'subtitle' },
    Clear: { iconName: 'weather-sunny', gradient: ['#FEF253', '#FF7300'], title: 'title', subtitle: 'subtitle' },
    Haze: { iconName: 'weather-hail', gradient: ['#89F7FE', '#66A6FF'], title: 'title', subtitle: 'subtitle' },
}

export default function Weather({ temp, condition }) {
    return (
        <LinearGradient
            // Background Linear Gradient
            colors={weatherOptions[condition].gradient}
            style={styles.container}
        >
            <StatusBar barStyle='light-content' />
            <View style={styles.halfContainer}>
                <MaterialCommunityIcons
                    size={100}
                    name={weatherOptions[condition].iconName}
                    color="white"
                />
                <Text style={styles.temp}>{temp}</Text>
            </View>
            <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
                <Text style={styles.title}>{weatherOptions[condition].title}</Text>
                <Text style={styles.subtitle}>{weatherOptions[condition].subtitle}</Text>
            </View>
        </LinearGradient>
    )
}

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    condition: PropTypes.oneOf([
        'Thunderstorm',
        'Drizzle',
        'Rain',
        'Snow',
        'Clouds',
        'Atmosphere',
        'Clear',
        'Haze',
        'Mist',
        'Dust'
    ]).isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    temp: {
        fontSize: 36,
        color: 'white'
    },
    halfContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 44,
        fontWeight: '300',
        marginBottom: 10,
    },
    subtitle: {
        color: 'white',
        fontWeight: '600',
        fontSize: 24
    },
    textContainer: {
        paddingHorizontal: 20,
        alignItems: 'flex-start'
    }
})