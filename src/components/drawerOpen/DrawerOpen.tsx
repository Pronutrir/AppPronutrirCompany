import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'

import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import BotaoMenu from '../../assets/svg/BotaoMenu.svg';
import { RFPercentage } from "react-native-responsive-fontsize";
import useTheme from '../../hooks/useTheme';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';

export default function DrawerOpen() {

    const navigation = useNavigation();
    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);

    return (
            <TouchableOpacity style={styles.container} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <View style={styles.btnItem}>
                    <BotaoMenu fill={theme.colors.FILL_ICONE} width={RFPercentage(3)} height={RFPercentage(3)} />
                </View>
                <View style={styles.btnItem}>
                    <Text style={styles.text}>Menu</Text>
                </View>
            </TouchableOpacity>
    )
}

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 10,
            marginTop: 2,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text:{
            fontSize: theme.typography.SIZE.fontysize12,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            paddingBottom: 5
        },
        btnItem:{
            flex: 1, 
            justifyContent: 'flex-end'
        }
    });
    return styles;
};


