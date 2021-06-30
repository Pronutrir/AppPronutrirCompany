import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, ViewStyle, TouchableOpacityProps } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

interface Props {
    styleCardContainer?: ViewStyle;
    children: JSX.Element
};

const CardSimples: React.FC<Props> = ({ children, styleCardContainer } : Props) => {
    return (
        <View style={[styles.card, styleCardContainer]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: "#fff",
        margin: 10,
        padding: 10,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            }
        })
    }
})

export default CardSimples;