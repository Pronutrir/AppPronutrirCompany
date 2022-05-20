import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
interface Props {
    labelBtn: string;
    fontSize: number;
    containerBtnStyle?: object;
    onPress(): void;
}

const BtnRetangular: React.FC<Props> = ({
    labelBtn,
    fontSize,
    onPress,
    containerBtnStyle,
}: Props) => {
    const styles = useThemeAwareObject(createStyles);
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.btn,
                    containerBtnStyle && { ...containerBtnStyle },
                ]}
                onPress={() => onPress()}>
                <LinearGradient
                    useAngle={true}
                    angle={45}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    colors={['#52b4ad', '#219f96', '#08948a']}
                    style={styles.linearGradient}>
                    <Text
                        style={[
                            styles.text,
                            { fontSize: RFValue(fontSize, 680) },
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
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
        },
        text: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_TERTIARY,
            fontSize: theme.typography.SIZE.fontysize22,
        },
        btn: {
            width: 150,
            height: 50,
            marginVertical: 5,
            backgroundColor: 'transparent',
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
        linearGradient: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
    return styles;
}

export default BtnRetangular;
