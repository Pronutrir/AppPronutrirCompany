import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Platform,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { FillProps, SvgProps } from 'react-native-svg';
import OptionsSvg from '../../assets/svg/historico.svg';
import { ThemeContextData } from '../../contexts/themeContext';
import useTheme from '../../hooks/useTheme';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
interface Props {
    ImageSvg?: React.FC<SvgProps>;
    onPress?(): void;
    containerStyles?: StyleProp<ViewStyle>;
    propsSvg?: PropsSvg;
    size?: number;
}
interface PropsSvg extends FillProps {
    width?: number;
    height?: number;
}

const onpressFake = () => {
    null;
};

const BtnRadius: React.FC<Props> = ({
    ImageSvg = OptionsSvg,
    onPress = onpressFake,
    containerStyles,
    propsSvg,
    size = 3,
}: Props) => {
    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);

    return (
        <TouchableOpacity
            style={[styles.container, containerStyles]}
            onPress={() => onPress()}>
            <ImageSvg
                width={RFPercentage(size)}
                height={RFPercentage(size)}
                fill={theme.colors.FILL_ICONE}
                {...(propsSvg && propsSvg)}
            />
        </TouchableOpacity>
    );
};

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.BACKGROUND_1,
            padding: 5,
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
            borderRadius: 30,
            margin: 5,
        },
    });
    return styles;
};

export default BtnRadius;
