import { StyleSheet } from 'react-native';

const colors = {
	primary: "#0866C6",
	textSeconday: "#343D46"
}

export const color = colors;

export const themes = StyleSheet.create({
	primary: {
		color: colors.primary
	},
	secondary: {
		color: colors.textSeconday
	},
	menuStyle: {
		fontSize: 17,
		marginLeft: -10
	}
})