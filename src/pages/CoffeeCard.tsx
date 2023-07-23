import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import {ImageAssets} from '../Assets';
import {NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

export function CoffeeCard(props: {name: string}) {
	const navigation = useNavigation<NavigationProp<ParamListBase>>()
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.buttonImage}
				onPress={
					() => {navigation.navigate('Details', {name: props.name})}
				}>
				<Image style={styles.image} contentFit="contain"
					source={ImageAssets.ImageChooser(props.name)}
				/>
			</TouchableOpacity>
			<Text style={{fontFamily: "monospace"}}>{props.name}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		margin: 20,
		borderRadius: 15,
		padding: 10
	},
	buttonImage :{
		flex: 1, flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		flex: 1,
		height: "100%"
	},
})
