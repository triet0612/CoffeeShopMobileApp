import { useEffect, useRef, useState } from 'react';
import {View, Text} from 'react-native';
import { Avatar, Button, Dialog, IconButton, Portal, TextInput } from 'react-native-paper';
import { UserMod } from '../model/Model';
import { Color } from '../Assets';
import { useIsFocused } from '@react-navigation/native';

export function Account() {
  const [user, setUser] = useState<UserMod.User>(UserMod.blankUser())
  const focus = useIsFocused(); 
  useEffect(() => {
    (async () => {
      if (focus == true) {
        const a = await UserMod.readUsers().then(user => user);
        setUser(a);
      }
    })()
  }, [focus])

  const setUserProp = (val: string, field: string) => {
    field === "Name"?
      setUser({...user, Name: val}):
    field === "Phone"?
      setUser({...user, Phone: val}):
    field === "Email"?
      setUser({...user, Email: val}):
    field === "Address"?
      setUser({...user, Address: val}): null
  }
  return (
    <View style={{flex:1, flexDirection: "column", justifyContent: "flex-start", alignItems: "center", paddingHorizontal: 20}}>
      <InputCard name="Name" value={user.Name} icon='account'
        onPress={setUserProp.bind(this)}/>
      <InputCard name="Phone" value={user.Phone} icon='phone'
        onPress={setUserProp.bind(this)}/>
      <InputCard name="Email" value={user.Email} icon='email'
        onPress={setUserProp.bind(this)}/>
      <InputCard name="Address" value={user.Address} icon='map-marker-radius'
        onPress={setUserProp.bind(this)}/>
      <Button mode='contained'  style={{backgroundColor: Color.AppThemeColor}}
				labelStyle={{fontFamily: "monospace", fontWeight:"bold", fontSize: 18}}
        onPress={() =>{UserMod.updateUser(user)}}
      >
				Submit
			</Button>
    </View>
  )
}

function InputCard(props: {name: string, value: string, icon: string, onPress: CallableFunction}) {
  const [text, setText] = useState("");
  useEffect(() => {
    setText(props.value)
  }, [props.value])
  return (
    <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginVertical: 20}}>
      <View>
        <Avatar.Icon icon={props.icon} style={{backgroundColor: Color.AppThemeColor}}/>
      </View>
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <Text>{props.name}</Text>
        <TextInput 
          value={text}
          onChangeText={text => {props.onPress(text, props.name)}}
        />
      </View>
    </View>
  )
}
