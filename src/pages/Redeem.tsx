import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { CoffeeCard } from "./CoffeeCard";
import { Color } from "../Assets";
import { Button } from "react-native-paper";
import { UserMod } from "../model/Model";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";

export function Redeem() {
  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <View style={styles.down_container}>
        <Text style={[styles.name_text, {color: "white"}]}>
          Redeem your coffee (≧∇≦)/
        </Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <CoffeeCard name="Black Coffee" disabled={true}/>
            <RedeemButton name="BlackCoffee"/>
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <CoffeeCard name="White Coffee" disabled={true}/>
            <RedeemButton name="WhiteCoffee"/>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <CoffeeCard name="Cappucino" disabled={true}/>
            <RedeemButton name="Cappucino"/>
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <CoffeeCard name="Latte" disabled={true}/>
            <RedeemButton name="Latte"/>
          </View>
        </View>
      </View>
    </View>
  )
}

function RedeemButton(props:{name: string}) {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  return (
    <Button mode='outlined' onPress={() =>{UserMod.redeemCoffee(props.name); navigation.goBack()}} style={{backgroundColor: Color.AppThemeColor, marginHorizontal: 20}}
      labelStyle={{fontFamily: "monospace", fontWeight:"bold", fontSize: 16 ,color: "white"}}>
        Redeem
    </Button>
  )
}

const styles = StyleSheet.create({
  upper_container: {
    flex: 1.1,
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

