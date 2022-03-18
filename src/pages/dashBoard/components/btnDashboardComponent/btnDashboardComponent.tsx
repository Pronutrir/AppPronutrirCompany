import {
    StyleSheet,
    Text,
    View,
    Platform,
    Dimensions,
    PixelRatio,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import useTheme from '../../../../hooks/useTheme';
import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
import { ThemeContextData } from '../../../../contexts/themeContext';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';

type Props = {
    label: string;
    onpress(): void;
    disabled: boolean;
    ImgSVG: React.FC<SvgProps>;
};

const BtnDashboardComponent: React.FC<Props> = ({
    onpress,
    disabled,
    ImgSVG,
    label,
}: Props) => {
    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);

    return (
        <TouchableOpacity
            style={disabled ? styles.btnDisabled : styles.btn}
            disabled={disabled}
            onPress={() => onpress()}>
            <View style={styles.img_btnHotrizontal}>
                <ImgSVG
                    fill={theme.colors.FILL_ICONE}
                    width={RFPercentage(5)}
                    height={RFPercentage(5)}
                />
            </View>
            <View style={styles.box_btnHorizontal}>
                <Text style={styles.text_btnHorizontal}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default BtnDashboardComponent;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        btn: {
            width: Dimensions.get('window').width / 3.2,
            height: RFPercentage(13),
            backgroundColor: theme.colors.BACKGROUND_1,
            marginVertical: 5,
            paddingVertical: PixelRatio.get() < 2 ? 10 : 15,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
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
        },
        btnDisabled: {
            width: Dimensions.get('window').width / 3.3,
            height: RFPercentage(13),
            backgroundColor: theme.colors.BACKGROUND_1,
            margin: 5,
            paddingVertical: PixelRatio.get() < 2 ? 10 : 15,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
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
            opacity: 0.3,
        },
        img_btnHotrizontal: {
            flex: 1,
            height: '40%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        box_btnHorizontal: {
            height: Dimensions.get('screen').height / 25,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 5,
        },
        text_btnHorizontal: {
            fontSize: theme.typography.SIZE.fontysize10,
            fontFamily: theme.typography.FONTES.Light,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            textAlign: 'center',
        },
    });
    return styles;
};
