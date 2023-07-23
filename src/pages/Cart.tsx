import { View, Text, ScrollView, StyleSheet } from "react-native";
import {useState, useEffect} from "react";
import { CartMod, CoffeeMod } from "../model/Model";
import { Color, ImageAssets } from "../Assets";
import { Image } from "expo-image";
import { Button, Divider, IconButton, List } from "react-native-paper";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";

export function Cart() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  const [cart, setCart] = useState<CartMod.CartItem[]>([]);
  useEffect(() => {
    (async () => {
      const temp = await CartMod.readCart();
      setCart(temp);
    })()
  }, [])

  function updateCart(index: number) {
    setCart(cart.filter(
      (_, i) =>{ return i !==index }
    ));
    CartMod.deleteCart(cart[index]);
  }

  if (cart.length == 0) {
    return (
      <View style={{flex: 1, justifyContent:"center", margin: 20, paddingVertical: 20}}>
        <Button mode='contained' onPress={() =>{navigation.navigate("Order")}} 
          style={{backgroundColor: Color.AppThemeColor,  padding: 20, margin: 20}}
          labelStyle={{fontFamily: "monospace", fontWeight:"bold", fontSize: 20}}>
            Track my order
        </Button>
        <Button mode='contained' onPress={() =>{navigation.navigate("Home")}} 
          style={{backgroundColor: Color.AppThemeColor,  padding: 20 , margin: 20}}
          labelStyle={{fontFamily: "monospace", fontWeight:"bold", fontSize: 20}}>
            Home
        </Button>
      </View>
    )
  } else {
    return (
      <View style={{flex: 1, flexDirection: "column", margin: 30}}>
        <ScrollView style={{flex: 1}}>
          {cart.map((c, index) => {
            return <CartItem cart={c} key={index} onDelete={()=>{updateCart(index); }}/>
          })}
        </ScrollView>
        <View style={{flex: 0.2, justifyContent: "space-between"}}>
          <Button mode='contained' onPress={() =>{navigation.navigate("Home")}} style={{backgroundColor: Color.AppThemeColor}}
            labelStyle={{fontFamily: "monospace", fontWeight:"bold", fontSize: 18}}>
              Home
          </Button>
          <Button mode='contained' onPress={() =>{CartMod.submitOrder(); setCart([]);}} style={{backgroundColor: Color.AppThemeColor}}
            labelStyle={{fontFamily: "monospace", fontWeight:"bold", fontSize: 18}}>
              Purchase
          </Button>
        </View>
      </View>
    )
  }
}

function CartItem(props: {cart: CartMod.CartItem, onDelete: CallableFunction}) {
  const [price, setPrice] = useState(0);
  useEffect(() => {
    (async () => {
      setPrice(Number.parseInt((await CoffeeMod.readCoffeesByName(props.cart.Type)).Price))
    })()
  })
  return (
    <View style={{flex: 1, flexDirection: "row", height: 150, justifyContent: "space-between"}}>
      <Image style={{flex: 1}} contentFit="contain"
        source={ImageAssets.ImageChooser(props.cart.Type)}/>
      <View style={{flex: 2, justifyContent: "center"}}>
        <Text style={styles.textStyle}>{props.cart.Type}</Text>
        <Text style={styles.textStyle}>{props.cart.Number}</Text>
        <Text style={styles.textStyle}>{convertNote(props.cart.Note)}</Text>
        <Text style={styles.textStyle}>{price * props.cart.Number} VND</Text>
      </View>
      <View style={{flex: 0.5, justifyContent: "center"}}>
        <IconButton icon={"delete"} size={30} onPress={()=> {props.onDelete()}}/>
      </View>
    </View>
  )
}

function convertNote(note: string) {
  const mapShot = ['Single', 'Double']
  const mapTemp = ['Hot', 'Cold']
  const mapSize = ['S', 'M', 'L']
  const mapIce = ['0%', '25%', '50%']
  return `${mapShot[note[0]]}|${mapTemp[note[1]]}|${mapSize[note[2]]}|${mapIce[note[2]]}`
}

const styles = StyleSheet.create({
  textStyle: {
    margin: 5,
    fontSize: 16,
    fontFamily: "monospace"
  }
})