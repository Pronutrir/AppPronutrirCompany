import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import BackButton from '../components/buttons/BackButton';

const MyHeader = ({ onPress, transparent }) => {
    return (
        <View style={transparent ? styles.container2 : styles.container}>
            <View style={[styles.box1, transparent && { backgroundColor: 'transparent' }]}/>
            <View style={[styles.box2, transparent && { backgroundColor: 'transparent' }]}>
                <BackButton onPress={onPress}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: (Dimensions.get('window').height / 10 * 2)
    },
    container2: {
        height: (Dimensions.get('window').height / 10 * 1.5)
    },
    box1:{
        flex: 1,
        backgroundColor: '#00A1A3'
    },
    box2:{
        flex: 1,
        backgroundColor: '#fff'
    }
})

export default MyHeader