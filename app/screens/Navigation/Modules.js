import React from 'react';
import { Text, View } from 'react-native';
import mytext from '../../assets/data';
import { StyleSheet } from 'react-native';



function Modules(props) {
    
    
    console.log(mytext);
    
return(
        <View style={styles.container}>
            <Text>
            mytext
            </Text>
        </View>
);
}

 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
    }
})

export default Modules;