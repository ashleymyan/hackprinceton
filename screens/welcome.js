import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

const Welcome = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Loc8</Text>
            <Text>The best way to find your friends on campus!</Text>
            <Button title="Create Account" onPress={() => navigation.navigate('Signup')} />
            <Button title="Log In" onPress={() => navigation.navigate('Login')} />
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0',
    },
    title: {
      fontSize: 20,
      marginBottom: 10,
    },
});

export default Welcome;