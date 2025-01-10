import React, { useEffect } from "react";
import { ColorValue, StyleSheet, Text, View, ViewProps } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
    interpolate,
} from "react-native-reanimated";
import { ThemeContextData } from "../../contexts/themeContext";
import { useThemeAwareObject } from "../../hooks/useThemedStyles";

interface Props {
    delay: number;
}

const Ring = ({ delay }: Props) => {
    const ring = useSharedValue(0);

    const styles = useThemeAwareObject(createStyles);

    const ringStyle = useAnimatedStyle(() => {
        return {
            opacity: 0.4 - ring.value,
            transform: [
                {
                    scale: interpolate(ring.value, [0, 1], [0, 4]),
                },
            ],
        };
    });
    useEffect(() => {
        ring.value = withDelay(
            delay,
            withRepeat(
                withTiming(1, {
                    duration: 3000,
                }),
                -1,
                false
            )
        );
    }, []);
    return <Animated.View style={[styles.ring, ringStyle]} />;
};

interface PropsAnimatedRing {
    valueNumer?: number;
    backgroundColor?: ColorValue;
    bottom?: number | undefined;
    right?: number | undefined;
    left?: number | undefined;
    top?: number | undefined;
}

export default function AnimatedRing({ valueNumer = 0, backgroundColor = "tomato", bottom = undefined, right = undefined, left = undefined, top = undefined }: PropsAnimatedRing) {
    const styles = useThemeAwareObject(createStyles);

    if (valueNumer > 0) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    backgroundColor: backgroundColor,
                    width: 30,
                    height: 30,
                    borderRadius: 40,
                    position: "absolute",
                    bottom: bottom,
                    right: right,
                    top: top,
                    left: left,
                    margin: 5,
                }}
            >
                <Text style={styles.text}>{valueNumer}</Text>
                <Ring delay={1000} />
            </View>
        );
    } else {
        return null;
    }
}

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        ring: {
            position: "absolute",
            width: 40,
            height: 40,
            borderRadius: 40,
            borderColor: "tomato",
            borderWidth: 6,
        },
        text: {
            fontSize: theme.typography.SIZE.fontysize12,
            fontFamily: theme.typography.FONTES.Black,
            letterSpacing: theme.typography.LETTERSPACING.L,
            color: theme.colors.TEXT_TERTIARY,
            textAlign: 'center',
        }
    });

    return styles;
}