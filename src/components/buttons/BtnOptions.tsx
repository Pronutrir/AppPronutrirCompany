import React, { memo } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Platform,
    Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import useTheme from '../../hooks/useTheme';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

interface Props {
    valueText: string;
    onPress(): void;
    disable?: boolean;
}

const BtnOptions: React.FC<Props> = ({
    valueText,
    onPress,
    disable,
}: Props) => {
    const styleOpacity = useSharedValue(1);

    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: styleOpacity.value,
        };
    });
    return (
        <View style={styles.container}>
            <Pressable
                onPressIn={() => {
                    styleOpacity.value = withTiming(0.4, { duration: 50 });
                }}
                onPressOut={() =>
                    (styleOpacity.value = withTiming(1, { duration: 100 }))
                }
                disabled={disable}
                style={styles.btn}
                onPress={onPress}>
                <Animated.View style={[styles.viewBtn, animatedStyles]}>
                    <LinearGradient
                        style={styles.linearGradient}
                        colors={[theme.colors.GREENPRIMARY, theme.colors.GREENLIGHT]}>
                        <Text style={styles.text}>{valueText}</Text>
                    </LinearGradient>
                </Animated.View>
            </Pressable>
        </View>
    );
};

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: theme.typography.SIZE.fontysize14,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_TERTIARY,
        },
        linearGradient: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
        },
        btn: {
            width: screenWidth / 4,
            height: screenHeight / 20,
            borderRadius: 10,
            marginVertical: 5,
            ...Platform.select({
                android: {
                    elevation: 3,
                },
                ios: {
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                },
                default: {
                    elevation: 3,
                },
            }),
            backgroundColor: '#fff',
        },
        viewBtn: {
            flex: 1,
        },
        disabledBtn: {
            opacity: 0.4,
        },
    });
    return styles;
}

export default memo(BtnOptions);
