import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useTheme from "../../hooks/useTheme";
import { useThemeAwareObject } from "../../hooks/useThemedStyles";
import { ThemeContextData } from "../../contexts/themeContext";
import { RFPercentage } from "react-native-responsive-fontsize";
import BotaoMenu from '../../assets/svg/BotaoMenu.svg';
import HomeImg from '../../assets/svg/Home.svg';
import LupaImg from '../../assets/svg/Lupa.svg';
import UserImg from '../../assets/svg/avatar.svg';
import { SvgProps } from "react-native-svg";
import { DrawerActions } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

type IconType = FC<SvgProps & { fillSecondary?: string | undefined }>

const iconMap: Record<string, IconType> = {
    "menu": BotaoMenu,
    "inicio": HomeImg,
    "busca": LupaImg,
    "perfil": UserImg,
};

export default function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {

    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);

    return (
        <View style={styles.container}>
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    if (label === "menu") {
                        navigation.dispatch(DrawerActions.openDrawer())
                        return;
                    }

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const RenderIcon = (label: string, isFocused: boolean) => {
                    const IconComponent = iconMap[label];
                    return (
                        <>
                            <View style={styles.btnItem}>
                                <IconComponent
                                    fill={isFocused ? theme.colors.BUTTON_SECUNDARY : theme.colors.FILL_ICONE}
                                    width={20}
                                    height={20}
                                />
                            </View>
                            <View style={styles.btnItem}>
                                <Text style={{ color: isFocused ? theme.colors.BUTTON_SECUNDARY : theme.colors.FILL_ICONE }}>{label}</Text>
                            </View>
                        </>
                    );
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.boxBtn}
                    >
                        {RenderIcon(label, isFocused)}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            height: RFPercentage(6),
            backgroundColor: theme.colors.BACKGROUND_1,
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        boxBtn: {
            margin: 2,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: theme.typography.SIZE.fontysize10,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
        },
        btnItem: {
            flex: 1,
            justifyContent: 'flex-end',
        },
    });
    return styles;
};
