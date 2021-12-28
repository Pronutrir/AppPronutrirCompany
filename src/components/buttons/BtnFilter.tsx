import React from 'react';
import { StyleSheet, Text, Platform, TextStyle, Pressable } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
interface Props {
    name?: string;
    styleText?: TextStyle;
    onPress(): void;
    active?: boolean;
}

const BtnFilter: React.FC<Props> = ({
    name = 'teste',
    onPress,
    active,
}: Props) => {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5,
    },
    textBtn: {
        color: '#666666',
        fontSize: RFValue(14, 680),
    },
    textBtnActive: {
        color: '#ffff',
        fontSize: RFValue(14, 680),
        fontWeight: 'bold',
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#fff',
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
        backgroundColor: '#20cbc1',
    },
});
