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
import OptionsSvg from '../../assets/svg/historico.svg'
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

const onpressFake = () => {null}

const BtnRadius: React.FC<Props> = ({
    ImageSvg = OptionsSvg,
    onPress = onpressFake,
    containerStyles,
    propsSvg,
    size = 3,
}: Props) => {
    return (
        <TouchableOpacity
            style={[styles.container, containerStyles]}
            onPress={() => onPress()}>
            <ImageSvg
                width={RFPercentage(size)}
                height={RFPercentage(size)}
                fill={'#fff'}
                {...(propsSvg && propsSvg)}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#20c4cb',
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

export default BtnRadius;
