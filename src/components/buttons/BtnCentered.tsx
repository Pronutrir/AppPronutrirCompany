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
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';

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
    enabled = true,
}: Props) => {
    const styles = useThemeAwareObject(createStyles);
    return (
        <View style={styles.container}>
            <TouchableOpacity
                disabled={!enabled}
                style={enabled ? styles.btn : styles.btnDisabled}
                onPress={() => onPress()}>
                <LinearGradient
                    useAngle={true}
                    angle={45}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    colors={
                        enabled
                            ? ['#52b4ad', '#219f96', '#08948a']
                            : ['#e6f4f3', '#e6f4f3']
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

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
        },
        text: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_TERTIARY,
            fontSize: theme.typography.SIZE.fontysize20,
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
            width: RFPercentage(20),
            height: RFPercentage(6),
            marginVertical: 5,
        },
        linearGradient: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
        },
    });
    return styles;
}

export default BtnCentered;
