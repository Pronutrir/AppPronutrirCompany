import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import LinearGradient from 'react-native-linear-gradient';
import propTypes from 'prop-types';

const widthScreen = Dimensions.get('screen').width;
const heightScreen = Dimensions.get('screen').height;

const BtnCentered = ({ labelBtn = "OK", fontSize = 12 , onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => onPress()}>
                <LinearGradient
                    useAngle={true}
                    angle={45}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    colors={['#52b4ad', '#219f96', '#08948a']}
                    style={styles.linearGradient}
                >
                    <Text
                        style={[styles.text, fontSize && { fontSize: RFValue(fontSize, 680) }]}
                    >
                        {labelBtn}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        fontSize: RFValue(24, 680),
        color: '#fff',
        fontWeight: 'bold'
    },
    btn: {
        width: RFPercentage(18, 680),
        height: RFPercentage(6, 680),
        marginVertical: 5,
        backgroundColor: 'transparent',
        borderRadius: 30,
        ...Platform.select({
            android: {
                elevation: 5
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
                elevation: 5
            }
        })
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    }
});

BtnCentered.propTypes = {
    labelBtn: propTypes.string,
    fontSize: propTypes.number
}

BtnCentered.defaultProps = {
    actilabelBtnveModal: 'MyButtom',
    fontSize: 16
}

export default BtnCentered;
