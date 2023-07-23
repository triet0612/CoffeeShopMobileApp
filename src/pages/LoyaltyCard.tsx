import { View, Text, StyleSheet, FlatList } from "react-native";
import React, {useState, useEffect} from "react";

type stamps = {
  val: boolean,
  id: number
}

export function LoyaltyCard(user: {loyalty: number}) {
  const [loyalty_stamps, setStamps] = useState<stamps[]>([
    {id: 1, val: false},{id: 2, val: false},
    {id: 3, val: false},{id: 4, val: false},
    {id: 5, val: false},{id: 6, val: false},
    {id: 7, val: false},{id: 8, val: false},
  ]);
  const [num, setNum] = useState(8)
  useEffect(() => {
    if (user !== undefined) {
      let temp = loyalty_stamps
      for (let i = 0; i < user.loyalty; i++) {
        temp[i].val = true
      }
      setStamps(temp)
      setNum(user.loyalty)
    }
  }, [user])
  return (
    <View style={styles.loyalty_card}>
      <FlatList data={loyalty_stamps} horizontal={true} 
        contentContainerStyle={styles.icons_row}
        renderItem={({item}) =>
          <Text style={{fontSize: 24}}>{item.val === true? '\u26AB': '\u26AA'}</Text>
        }
      />
      <View style={styles.text_row}>
        <Text style={styles.text}>Loyalty Card</Text>
        <Text style={styles.text}>{num}/8</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loyalty_card: {
    flex: 1,
    backgroundColor: '#324A59',
    padding: 20,
    borderRadius: 12,
    marginBottom: 10
  },
  icons_row: {
    flex: 1,
    justifyContent: 'space-between'
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
})
