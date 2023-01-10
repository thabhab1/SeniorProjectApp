import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
    return(
        <View style={styles.container}>
            <Text>Welcome</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8eadd',
        alignItems: 'center',
        justifyContent: 'center',
    },
});