import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

export default function App() {
  return (
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>Seoul</Text>
        </View>
        <ScrollView style={styles.weather}>
          <View style={styles.day}>
            <Text style={styles.temperature}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temperature}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temperature}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temperature}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
        </ScrollView>
        <StatusBar style="light"></StatusBar>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"teal"
  },
  city: {
    flex: 1.1,
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    fontSize:58,
    fontWeight: "500"
  },
  weather: {
    flex: 3,
  },
  day: {
    flex: 1,
    alignItems: "center",
  },
  temperature: {
    marginTop: 50,
    fontSize: 168
  },
  description: {
    marginTop: -30,
    fontSize: 60
  }
});
