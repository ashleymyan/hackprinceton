import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import welcome from './screens/welcome';
import login from './screens/login';
import signup from './screens/signup'


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={welcome} />
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="Signup" component={signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
