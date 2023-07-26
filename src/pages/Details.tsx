import {View, Text, StyleSheet } from 'react-native';
import { ImageAssets, Color } from '../Assets';
import { Image } from 'expo-image';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, IconButton, RadioButton } from 'react-native-paper';
import { CartMod, CoffeeMod } from '../model/Model';


export function Details({route}) {
	const [shot, setShot] = useState("0");
	const [temp, setTemp] = useState("0");
	const [size, setSize] = useState("0");
	const [ice, setIce] = useState("0");
	const [amount, setAmount] = useState(1);
	
	const [coffee, setCoffee] = useState<CoffeeMod.Coffee>({Type: "", Price: ""})
	const navigation = useNavigation<NavigationProp<ParamListBase>>()

	useEffect(() => {
		(async () => {
			setCoffee(await CoffeeMod.readCoffeesByName(route.params.name))
		})()
	}, [])

  return (
		<View style={{flex: 1, padding: 15}}>
			<TopNavBar/>
			<View style={styles.container}>
				<Image style={styles.image} contentFit="contain"
					source={ImageAssets.ImageChooser(route.params.name)}
				/>
			</View>
			<View style={{flex: 3, borderRadius: 20, backgroundColor: "white", borderWidth: 5, borderColor: "black"}}>
				<View style={styles.formField}>
					<Text style={styles.fieldText}>{route.params.name}</Text>
					<IconButton nativeID='1' icon={"minus"} iconColor='black' onPress={() => {setAmount(amount-1 < 1? 1: amount-1)}}/>
					<Text style={styles.fieldText}>{amount}</Text>
					<IconButton nativeID='2' icon={"plus"} iconColor='black'  onPress={() => {setAmount(amount+1 > 20? 20: amount+1)}}/>
				</View>
				<View style={styles.formField}>
					<Text style={styles.fieldText}>Shot</Text>
					<RadioButton.Group
						onValueChange={value => setShot(value)} value={shot}>
						<View style={styles.fieldRadio}>
							<RadioButton.Item label='Single' value='0'
								color='black' uncheckedColor='black' labelStyle={styles.fieldText}/>
							<RadioButton.Item label='Double' value='1'
								color='black' uncheckedColor='black'labelStyle={styles.fieldText}/>
						</View>
					</RadioButton.Group>
				</View>
				<View style={styles.formField}>
					<Text style={styles.fieldText}>Temp</Text>
					<RadioButton.Group
						onValueChange={value => setTemp(value)} value={temp}>
						<View style={styles.fieldRadio}>
							<RadioButton.Item label='Hot' value='0'
								color='black' uncheckedColor='black' labelStyle={styles.fieldText}/>
							<RadioButton.Item label='Cold' value='1'
								color='black' uncheckedColor='black' labelStyle={styles.fieldText}/>
						</View>
					</RadioButton.Group>
				</View>
				<View style={styles.formField}>
					<Text style={styles.fieldText}>Size</Text>
					<RadioButton.Group
						onValueChange={value => setSize(value)} value={size}>
						<View style={styles.fieldRadio}>
							<RadioButton.Item label='S' value='0'
								color='black' uncheckedColor='black' labelStyle={styles.fieldText}/>
							<RadioButton.Item label='M' value='1'
								color='black' uncheckedColor='black'labelStyle={styles.fieldText}/>
								<RadioButton.Item label='L' value='2'
								color='black' uncheckedColor='black'labelStyle={styles.fieldText}/>
						</View>
					</RadioButton.Group>
				</View>
				<View style={styles.formField}>
					<Text style={styles.fieldText}>Ice</Text>
					<RadioButton.Group
						onValueChange={value => setIce(value)} value={ice}>
						<View style={styles.fieldRadio}>
							<RadioButton.Item label='0%' value='0'
								color='black' uncheckedColor='black' labelStyle={styles.fieldText}/>
							<RadioButton.Item label='25%' value='1'
								color='black' uncheckedColor='black'labelStyle={styles.fieldText}/>
							<RadioButton.Item label='50%' value='2'
								color='black' uncheckedColor='black'labelStyle={styles.fieldText}/>
						</View>
					</RadioButton.Group>
				</View>
			</View>
			<AddToCart totalPrice={Number.parseInt(coffee.Price) * amount} 
				onSubmit={(async () => {
					await CartMod.addToCart({ID: 1,Note: `${shot}${temp}${size}${ice}`, Status: '', Type: coffee.Type,Number: amount})
					navigation.navigate("Shopping cart");
				}).bind(this)}
			/>
		</View>
	)
}

function TopNavBar(): JSX.Element {
	const navigation = useNavigation<NavigationProp<ParamListBase>>()
	return (
		<View style={styles.topBar}>
      <IconButton nativeID='1' size={24} icon={"arrow-left"} iconColor='white' onPress={() => {navigation.goBack()}}/>
			<Text style={styles.text}>Details</Text>
			<IconButton nativeID='2' size={24} icon={"cart"} iconColor='white' onPress={() => {navigation.navigate("Shopping cart")}}/>
		</View>
	)
}

function AddToCart(prop: {totalPrice: number, onSubmit: CallableFunction}): JSX.Element {
	return (
		<View style={{flex: 1, flexDirection: "row", justifyContent:"space-between", marginTop: 10}}>
			<View style={{alignSelf: "center", flex: 1}}>
				<Text style={{fontFamily: "monospace", fontWeight: "bold", fontSize: 16}}>
					Total Amount: {'\n'+prop.totalPrice}
				</Text>
			</View>
			<View style={{alignSelf: "center"}}>
				<Button mode='contained' onPress={() =>{prop.onSubmit()}} style={{backgroundColor: Color.AppThemeColor}}
					labelStyle={{fontFamily: "monospace", fontWeight:"bold", fontSize: 18}}>
						Add to cart
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		margin: 20,
		borderRadius: 15,
		padding: 10
	},
	image: {
		flex: 1,
		height: "100%",
		width: "100%"
	},
	topBar: {
		flexDirection: 'row',
		backgroundColor: Color.AppThemeColor,
		borderColor: Color.AppThemeColor,
		justifyContent: 'space-between',
		alignItems: "center",
		borderWidth: 2,
		borderRadius: 12,
	},
	text: {
		fontFamily: "monospace",
		fontSize: 20,
		fontWeight: "bold",
		color:"white"
	},
	formField: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		paddingLeft: 20
	},
	fieldText: {
		fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: "bold",
    color: 'black',
		justifyContent: "flex-end"
	},
	fieldRadio:{
		flexDirection: 'row',
		justifyContent: "center",
		alignItems: "center"
	},

})
