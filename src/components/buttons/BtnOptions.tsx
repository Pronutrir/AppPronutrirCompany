import React, { memo } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Platform,
    Pressable,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

interface Props {
    valueText: string;
    onPress(): void;
    arrayColors?: string[];
    disable?: boolean;
}

const BtnOptions: React.FC<Props> = ({
    valueText,
    onPress,
    arrayColors = ['#20c4cb', '#20b3cb'],
    disable,
}: Props) => {
    const styleOpacity = useSharedValue(1);

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
                        colors={arrayColors}>
                        <Text style={styles.text}>{valueText}</Text>
                    </LinearGradient>
                </Animated.View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: RFValue(14, 680),
        color: '#fff',
        fontWeight: 'bold',
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

export default memo(BtnOptions);
