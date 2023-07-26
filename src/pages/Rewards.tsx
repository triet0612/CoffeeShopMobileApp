import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import React, { useEffect, useState } from 'react';
import { CartMod, CoffeeMod, UserMod } from '../model/Model';
import {LoyaltyCard} from './LoyaltyCard';
import { Color, ImageAssets } from "../Assets";
import { Image } from "expo-image";

import { NavigationProp, ParamListBase, useIsFocused, useNavigation } from "@react-navigation/native";



export function Rewards() {
  const [user, setUser] = useState<UserMod.User>(UserMod.blankUser())
  const [redeemed, setRedeemed] = useState<CartMod.CartItem[]>([]);
  const focus = useIsFocused();

  useEffect(() => {
    (async () => {
      const a = await UserMod.readUsers().then(user => user);
      setUser(a);
    })();
    (async () => {
      const b = await CartMod.readRedeemed();
      setRedeemed(b);
    })()
    console.log(redeemed)
  }, [focus])

  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <View style={{flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 30}}>   
        <Text style={styles.name_text}>{user.Name}</Text>
      </View>
      <View style={styles.upper_container}>
        <TouchableOpacity onPress={async() => {
          UserMod.cleanLoyalty(); 
          setUser(await UserMod.readUsers().then(user=>user))
        }} style ={{flex: 1}}>
          <LoyaltyCard loyalty={user.Loyalty}/>
        </TouchableOpacity>
      </View>
      <RewardCards points={user.Points}/>
      <View style={styles.down_container}>
        <ScrollView style={{flex: 1}}>
          {redeemed.map((c, index) => {
            return <RedeemedItem cart={c} key={index}/>
          })}
        </ScrollView>
      </View>
    </View>
  )
}

function RewardCards(props: {points: number}) {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  return (
    <View style={styles.reward_card}>
      <View style={styles.text_row}>
        <Text style={styles.text}>Rewards points</Text>
        <TouchableOpacity style={{backgroundColor:"white", borderRadius: 10, flex: 0.5}}
        onPress={() => {navigation.navigate("Redeem")}}>
          <Text style={{...styles.text, color:"black", fontSize: 15, textAlign: "center"}}>Redeem</Text>
        </TouchableOpacity>
      </View>
      <View style={{...[styles.text_row], alignItems: "flex-start"}}>
        <Text style={styles.text}>{props.points}</Text>
      </View>
    </View>
  )
}

function RedeemedItem(props: {cart: CartMod.CartItem}) {
  return (
    <View style={{flex: 1, flexDirection: "row", height: 150, justifyContent: "space-between"}}>
      <Image style={{flex: 1}} contentFit="contain"
        source={ImageAssets.ImageChooser(props.cart.Type)}/>
      <View style={{flex: 2, justifyContent: "center"}}>
        <Text style={styles.textStyle}>{props.cart.Type}</Text>
        <Text style={styles.textStyle}>{props.cart.Number}</Text>
        <Text style={styles.textStyle}>{props.cart.Status}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  upper_container: {
    flex: 1.25,
    padding: 25,
    paddingBottom: 0
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
  reward_card: {
    flex: 0.4,
    backgroundColor: '#324A59',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: "column"
  },
  text_row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignContent: "center"
  },
  text: {
    fontFamily: 'monospace',
    fontSize: 16,
    fontWeight: "500",
    color: 'white'
  },
  textStyle: {
    margin: 5,
    fontSize: 16,
    fontFamily: "monospace",
    color: "white"
  }
},
)
