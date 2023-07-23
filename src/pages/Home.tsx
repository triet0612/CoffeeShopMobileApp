import { View, Text, StyleSheet } from "react-native"
import { useCallback, useEffect, useState } from 'react';
import { UserMod } from '../model/Model';
import {LoyaltyCard} from './LoyaltyCard';
import {CoffeeCard} from './CoffeeCard';
import { IconButton } from "react-native-paper";
import { Color } from "../Assets";
import { NavigationProp, ParamListBase, useIsFocused, useNavigation } from "@react-navigation/native";

export function Home() {
  const [user, setUser] = useState<UserMod.User>(UserMod.blankUser())
  const focus = useIsFocused(); 

  useEffect(() => {
    (async () => {
      const a = await UserMod.readUsers().then(user => user);
      setUser(a);
    })()
  }, [focus])

  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <View style={styles.upper_container}>
        <UserCard Name={user.Name}/>
        <LoyaltyCard loyalty={user.Loyalty}/>
      </View>
      <View style={styles.down_container}>
        <Text style={[styles.name_text, {color: "white"}]}>
          Choose your coffee (≧∇≦)/
        </Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <CoffeeCard name="Black Coffee"/>
          <CoffeeCard name="White Coffee"/>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <CoffeeCard name="Cappucino"/>
          <CoffeeCard name="Latte"/>
        </View>
      </View>
    </View>
  )
}

function UserCard(user: {Name: string}) {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  return (
    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
      <View>
        <Text style={styles.good_morning_text}>Good morning</Text>
        <Text style={styles.name_text}>{user.Name}</Text>
      </View>
      <View style={styles.icons}>
        <IconButton nativeID='1' size={30} icon={"view-list-outline"} 
          iconColor='black' onPress={() => {navigation.navigate("Order")}}/>
        <IconButton nativeID='1' size={30} icon={"cart"} 
          iconColor='black' onPress={() => {navigation.navigate("Shopping cart")}}/>
        <IconButton nativeID='2' size={30} icon={"account"} 
          iconColor='black' onPress={() => {navigation.navigate("Account")}}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  upper_container: {
    flex: 1,
    padding: 25
  },
  down_container: {
    flex: 2.5,
    backgroundColor: Color.AppThemeColor,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: 25,
  },
  good_morning_text: {
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: "500",
  },
  name_text: {
    fontFamily: 'monospace',
    fontSize: 18,
    fontWeight: "500",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
})
