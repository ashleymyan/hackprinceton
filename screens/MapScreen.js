import React, { useState, useEffect } from 'react'
import MapView from 'react-native-maps';
import { View, Text, Image, StyleSheet, TouchableOpacity, Switch, ScrollView, FlatList} from 'react-native'
import { Marker, Callout } from 'react-native-maps';
import { CurrentRenderContext } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

const registerForPushNotificationsAsync = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const {status: newStatus } = await Notifications.requestPermissionsAsync();
  

    if (newStatus !== 'granted') {
      alert('Failed to get push token for push notifications');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  }
};

registerForPushNotificationsAsync();



const MapScreen = ({ isAvailable, setIsAvailableInTabs, tags, setTags, handleTagToggle }) => {

    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location denied')
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
      })();
    }, []);

    const initialRegion = {
        latitude: 39.952217, 
        longitude: -75.193214, 
        latitudeDelta: 0.02, // Adjust the delta values to control the zoom level
        longitudeDelta: 0.02,
      };

    const locations = [
        { id: 1, userName: 'Cindy', locationName: 'Quaker Kitchen', coordinate: { latitude: 39.954116446548966, longitude: -75.2025458341666 }, message: 'Eating dinner 🍽️', image: require('./images/dinner.jpeg') }, 
        { id: 2, userName: 'Ashley', locationName: 'Pottruck Gym', coordinate: { latitude: 39.95408373331323, longitude: -75.19694350348684 }, message: 'Arm day 💪🏽'},
        { id: 3, userName: 'Rachel', locationName: 'Van Pelt Library', coordinate: { latitude: 39.952921480923465, longitude: -75.19338647047526 }, message: 'Finance midterm 📚' }, 
        { id: 4, userName: 'Fiona', locationName: 'Van Pelt Library', coordinate: { latitude: 39.952921480923465, longitude: -75.19338647047526 }, message: 'Nets midterm 😵‍💫' }, 
        { id: 5, userName: 'Emily', locationName: 'Huntsman', coordinate: { latitude: 39.9523317127984, longitude: -75.19852910348689 }, message: 'Grabbing food from Pret 🥖'},
        { id: 6, userName: 'Carol', locationName: 'Harnwell College House', coordinate: { latitude: 39.9525461264199, longitude: -75.2001916220874 }, message: 'Chilling' },
    ];

    const locationInfo = locations.map(
        (location) => `${location.userName} - ${location.locationName} \n ${location.message} \n`
      );

    const handleNudgeFriend = async (recipientExpoPushToken) => {
      await sendNudgeNotification(recipientExpoPushToken);
    };
  

    const sendNudgeNotification = async(recipientExpoPushToken) => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'You got nudged!',
          body: 'what do i put here'
        },
        to: recipientExpoPushToken,
      });
    };


  return (
      <View style={styles.container}>
        
        <Text style={styles.textAboveMap}>Find your friends!</Text>

        {isAvailable && 
        <View>
        <Text style={styles.tagText}> You are currently: {tags.filter((tag) => tag.active).map((tag) => tag.label).join(', ')}</Text>
        </View>
        }
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          {isAvailable && currentLocation && (
            <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude, // lowkey no need for ur own pin
            }}
            title="My location"
            description= {tags.filter((tag) => tag.active).map((tag) => tag.label).join(', ')}
            pinColor="blue"
            />
          )}
          {locations.map((location) => (
            <Marker
              key={location.id}
              // coordinate={location.coordinate}
              coordinate={{
                  latitude: location.coordinate.latitude + Math.random() * 0.0001, // Adjust this value for the desired offset
                  longitude: location.coordinate.longitude + Math.random() * 0.0001, // Adjust this value for the desired offset
              }}
              // title={location.title}
              // description={`Your friend ${location.userName} is at ${location.locationName}`}
            >
              {/* <Callout style={styles.calloutContainer}> */}
              <Callout style={[styles.calloutContainer, location.image && styles.calloutWithImage]}>
                  <View>
                      <Text style={styles.tagText}>{`Your friend ${location.userName} is at ${location.locationName}!`}</Text>
                      {location.image && <Image source={location.image} style={{ width: 150, height: 150 }} />}
                  </View>
              </Callout>
            </Marker>
          ))}
        </MapView>

        <View style={styles.bulletContainer}>
          <Text style={styles.bulletList}>{'Friend Status'}</Text>
          <ScrollView style={styles.scrollContainer}>
            <FlatList
              data={locations}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.bulletItemContainer}>
                  <Text style={styles.nameItem}>{item.userName}</Text>
                  <Text style={styles.bulletItem}>@{item.locationName}: {item.message}</Text>
                  <TouchableOpacity
                    style={styles.nudgeButton}
                    onPress={() => handleNudgeFriend(item.id)}
                  >
                    <Text style={styles.buttonText}>Nudge</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </ScrollView>
        </View>

          
          {/* <View style = {styles.bulletContainer}> 
            <Text style={styles.bulletList}>{'Friend Statuses'}</Text>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.bulletList}>{locationInfo.join('\n')}</Text>
            </ScrollView>
          </View> */}
          

      </View>
    );
  };



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start', // Center vertically
        alignItems: 'center',     // Center horizontally
    },
    map: {
        width: '100%',
        height: '50%',
        marginTop: 10,
    }, 
    textAboveMap: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 15,
    },
    tagText: {
      fontSize: 16, 
      marginTop: 5,

    },
    bulletContainer: {
      width: '100%',
      marginLeft: 10,
      flex: 1,
    },

    bulletList: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
    },
    calloutContainer: {
        width: 200,
        height: 45,
    },
    calloutWithImage: {
        height: 200,
    },
    scrollContainer: {
      width: '100%'
    },
    bulletItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: 10,
      marginTop: 8,
      paddingHorizontal: 15,

    },
    nameItem: {
      fontSize: 14,
    },
    bulletItem: {
      fontSize: 12, 

    },
    nudgeButton: {
      backgroundColor: '#1C9BF5',
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 15,
      alignItems: 'center',
      justifyContent: 'center',

    },
    buttonText: {
      color: 'white',
      fontSize: 10,
    }

})

export default MapScreen;