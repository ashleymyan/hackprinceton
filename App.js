import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './screens/ProfileScreen';
import MapScreen from './screens/MapScreen';
import AddFriendsScreen from './screens/AddFriendsScreen';
import WelcomeScreen from './screens/welcome';
import SignupScreen from './screens/signup';
import LoginScreen from './screens/login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { db, auth } from './firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome5';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs( {route, navigation} ) {
  const [isAvailable, setIsAvailable] = useState(false);

  const tagsData = [
    { key: 'studying', label: 'Studying', active: false },
    { key: 'eating', label: 'Eating', active: false},
    { key: 'workingOut', label:'Working Out', active: false}
  ];

  const [tags, setTags] = useState(tagsData);

  const handleTagToggle = (tagKey) => {
    setTags((prevTags) => 
    prevTags.map((tag) => 
    tag.key === tagKey ? {...tag, active: !tag.active } : tag));
  }

  const setIsAvailableInTabs = (value) => {
    setIsAvailable(value);
  };

  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile">
        {props => (
          <ProfileScreen
            {...props}
            isAvailable={isAvailable}
            setIsAvailableInTabs={setIsAvailableInTabs}
            tags={tags}
            setTags={setTags}
            handleTagToggle={handleTagToggle}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Map">
        {props => (
          <MapScreen
            {...props}
            isAvailable={isAvailable}
            setIsAvailableInTabs={setIsAvailableInTabs}
            tags={tags}
            setTags={setTags}
            handleTagToggle={handleTagToggle}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Friends">
        {props => (
          <AddFriendsScreen/>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );

}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.data() != undefined) {
                const userData = userDocSnap.data();
                setName(userData.name);
            } else {
                console.log("No such document!");
            }
        }
      }
      fetchUserName();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login">
              {props => <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );

}