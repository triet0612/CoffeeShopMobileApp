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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Rewards } from './src/pages/Rewards';
import { Redeem } from './src/pages/Redeem';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
            <Stack.Screen name='Home' component={HomeTab}/>
            <Stack.Screen name='Details' component={Details}/>
            <Stack.Screen name='Coffee' component={CoffeeCard}/>
            <Stack.Screen name='Account' component={Account} options={{headerShown: true}}/>
            <Stack.Screen name='Shopping cart' component={Cart} options={{headerShown: true}}/>
            <Stack.Screen name='Redeem' component={Redeem} options={{headerShown: true}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

function HomeTab() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} >
      <Tab.Screen name='HomePage' component={Home} 
        options={{
          tabBarIcon: () => <Ionicons name='home' size={24}/>,
          tabBarActiveTintColor: "black"
        }}
      />
      <Tab.Screen name='Rewards' component={Rewards} options={{
        tabBarIcon: () => {
          return (
            <Ionicons name='gift' size={24}/>
          )
        }, tabBarActiveTintColor: "black", headerShown: true}}
      />
      <Tab.Screen name='Order' component={Order} 
        options={{
          tabBarIcon: () => <Ionicons name='list' size={24}/>,
          tabBarActiveTintColor: "black"
        }}
      />
    </Tab.Navigator>
  )
}
