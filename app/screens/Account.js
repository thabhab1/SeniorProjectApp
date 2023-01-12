import WelcomeScreen from "./WelcomeScreen";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View } from "react-native";

export default function Account({navigation}) {
    return(
        <View style={styles.container}>
         <Button title="Log Out"
        onPress={() => navigation.navigate("WelcomeScreen")}
        />
        <Button title="Notifications"
        onPress={() => navigation.navigate("Modules")}
        />
        <StatusBar style='auto' />
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