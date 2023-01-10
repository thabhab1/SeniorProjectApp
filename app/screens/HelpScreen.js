import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function HelpScreen() {
    return(
        <View style={styles.container}>
            <Text>Mwahahah no help 4 u</Text>
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