import React from 'react';
import { StyleSheet, Text, Platform, TextStyle, Pressable } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
interface Props {
    name?: string;
    styleText?: TextStyle;
    onPress?(): void;
    active?: boolean;
}

const BtnFilter: React.FC<Props> = ({
    name = 'teste',
    onPress = () => {
        ('');
    },
    active = true,
}: Props) => {
    const styles = useThemeAwareObject(createStyles);

    const styleOpacity = useSharedValue(1);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: styleOpacity.value,
        };
    });

    return (
        <Pressable
            style={[styles.container]}
            onPressIn={() => {
                styleOpacity.value = withTiming(0.4, { duration: 50 });
            }}
            onPressOut={() =>
                (styleOpacity.value = withTiming(1, { duration: 100 }))
            }
            onPress={() => onPress()}>
            <Animated.View
                style={[
                    active ? styles.activeBtn : styles.btn,
                    animatedStyles,
                ]}>
                <Text style={[active ? styles.textBtnActive : styles.textBtn]}>
                    {name}
                </Text>
            </Animated.View>
        </Pressable>
    );
};

export default BtnFilter;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: RFPercentage(0.4),
        },
        textBtn: {
            color: theme.colors.TEXT_SECONDARY,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            fontSize: theme.typography.SIZE.fontysize14,
        },
        textBtnActive: {
            color: theme.colors.TEXT_TERTIARY,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            fontSize: theme.typography.SIZE.fontysize14,
        },
        btn: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
            paddingVertical: 10,
            backgroundColor: theme.colors.BUTTON_PRIMARY,
            ...Platform.select({
                ios: {
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 6,
                },
                android: {
                    elevation: 3,
                },
            }),
            borderRadius: 10,
        },
        activeBtn: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
            paddingVertical: 10,
            ...Platform.select({
                ios: {
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 6,
                },
                android: {
                    elevation: 3,
                },
            }),
            borderRadius: 10,
            backgroundColor: theme.colors.BUTTON_SECUNDARY,
        },
    });
    return styles;
};
