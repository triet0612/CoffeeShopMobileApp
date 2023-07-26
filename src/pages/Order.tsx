import { View, Text, ScrollView, StyleSheet } from "react-native";
import {useState, useEffect} from "react";
import { CartMod, CoffeeMod, UserMod } from "../model/Model";
import { Color, ImageAssets } from "../Assets";
import { Image } from "expo-image";
import { Button } from "react-native-paper";
import { useNavigation, NavigationProp, ParamListBase, useIsFocused } from "@react-navigation/native";

export function Order() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const focus = useIsFocused();

  const [page, setPage] = useState(true);

  const [order, setOrder] = useState<CartMod.CartItem[]>([]);
  useEffect(() => {
    (async () => {
      const temp = await CartMod.readOrder();
      setOrder(temp);
    })()
  }, [page, focus])

  if (page) {
    return (
      <View style={{flex: 1, flexDirection: "column", margin: 30}}>
        <View style={{flex: 0.08}}>
        <PageButton text="Order" togglePage={((tx) => {setPage(tx)}).bind(this)}/>
      </View>
        <ScrollView style={{flex: 1}}>
          {order.map((c, index) => {
            if (c.Status == "Waiting") {
              return <CartItem cart={c} key={index}/>
            }
          })}
        </ScrollView>
        <View style={{flex: 0.1, justifyContent: "space-between"}}>
          { order.filter(val => val.Status == "Waiting").length > 0? 
            <Button mode='contained' onPress={() =>{CartMod.completeOrder(); UserMod.addPoints();UserMod.addLoyalty(); setOrder([]);}} style={{backgroundColor: Color.AppThemeColor}}
              labelStyle={{fontFamily: "monospace", fontWeight:"bold", fontSize: 18}}>
                Complete order
            </Button>: null
          }
        </View>
      </View>
    )
  } else if (!page) {
    return (
    <View style={{flex: 1, flexDirection: "column", margin: 30}}>
      <View style={{flex: 0.08}}>
        <PageButton text="History" togglePage={((tx) => {setPage(tx)}).bind(this)}/>
      </View>
      <ScrollView style={{flex: 1}}>
        {order.map((c, index) => {
          if (c.Status == "Complete") {
            return <CartItem cart={c} key={index}/>
          }
        })}
      </ScrollView>
    </View>
    )
  }
}

function PageButton(props: {togglePage: CallableFunction, text: string}) {
  return (
    <View style={{flex: 1, justifyContent: "space-between", flexDirection: "row"}}>
      <Button mode='outlined' onPress={() =>{props.togglePage(true)}} style={{backgroundColor: Color.AppThemeColor}}
        labelStyle={{fontFamily: "monospace", fontWeight:"bold", fontSize: 16 ,color: "white"}}>
          Order
      </Button>
      <Text style={styles.textStyle}>{props.text}</Text>
      <Button mode='outlined' onPress={() =>{props.togglePage(false)}} style={{backgroundColor: Color.AppThemeColor}}
        labelStyle={{fontFamily: "monospace", fontWeight:"bold", fontSize: 16,color: "white"}}>
          History
      </Button>
    </View>
  )
}

function CartItem(props: {cart: CartMod.CartItem}) {
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