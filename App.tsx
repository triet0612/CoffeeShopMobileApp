import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { openDB } from './src/Database';
import { Home } from './src/pages/Home';
import {Details} from './src/pages/Details';
import { CoffeeCard } from './src/pages/CoffeeCard';
import { Account } from './src/pages/Account';
import { Cart } from './src/pages/Cart';
import { Order } from './src/pages/Order';

const Stack = createNativeStackNavigator();

export default function App() {
  const [start, setStart] = useState(false);
  useEffect(() => {
    (async () => {
      await openDB();
      setStart(true);
    })()
  }, [])
  if (!start) {
    return null
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false, animation: "slide_from_right"}}>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='Details' component={Details}/>
            <Stack.Screen name='Coffee' component={CoffeeCard}/>
            <Stack.Screen name='Account' component={Account} options={{headerShown: true}}/>
            <Stack.Screen name='Shopping cart' component={Cart} options={{headerShown: true}}/>
            <Stack.Screen name='Order' component={Order} options={{headerShown: true}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}
