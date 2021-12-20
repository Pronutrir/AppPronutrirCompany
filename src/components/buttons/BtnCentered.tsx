import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
    labelBtn: string;
    enabled?: boolean;
    SizeText: number;
    onPress(): void;
}

const BtnCentered: React.FC<Props> = ({
    labelBtn = 'OK',
    SizeText = 12,
    onPress,
    enabled = false,
}: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                disabled={enabled}
                style={enabled ? styles.btnDisabled : styles.btn}
                onPress={() => onPress()}>
                <LinearGradient
                    useAngle={true}
                    angle={45}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    colors={
                        enabled
                            ? ['#e6f4f3', '#e6f4f3']
                            : ['#52b4ad', '#219f96', '#08948a']
                    }
                    style={styles.linearGradient}>
                    <Text
                        style={[
                            styles.text,
                            { fontSize: RFValue(SizeText, 680) },
                        ]}>
                        {labelBtn}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: RFValue(20, 680),
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    btn: {
        width: RFPercentage(20),
        height: RFPercentage(6),
        marginVertical: 5,
        backgroundColor: 'transparent',
        borderRadius: 30,
        ...Platform.select({
            android: {
                elevation: 5,
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
                elevation: 5,
            },
        }),
    },
    btnDisabled: {
        width: RFPercentage(22),
        height: RFPercentage(8),
        marginVertical: 5,
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
});

export default BtnCentered;
