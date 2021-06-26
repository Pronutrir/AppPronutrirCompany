import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

interface Props {
    valueText: string;
    onPress(): void;
};

const BtnOptions: React.FC<Props> = ({ valueText, onPress } : Props) => {
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#066861', '#52b4ad']} style={styles.linearGradient}>
                <TouchableOpacity style={styles.btn} onPress={onPress}>
                    <Text style={styles.text}>{valueText}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#DBCCCC'
    },
    text: {
        fontSize: RFValue(14, 680),
        color: '#fff',
        fontWeight: 'bold'
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearGradient: {
        width: screenWidth / 6,
        height: screenHeight/ 20,
        borderRadius: 10,
        marginVertical: 5, 
        ...Platform.select({
            android: {
                elevation: 3
            },
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            default: {
                elevation: 3
            }
        })
    }
})

export default BtnOptions;
