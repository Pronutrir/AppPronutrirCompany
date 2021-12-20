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
interface Props {
    ImageSvg: React.FC<SvgProps>;
    onPress(): void;
    containerStyles?: StyleProp<ViewStyle>;
    propsSvg?: PropsSvg;
}

interface PropsSvg extends FillProps {
    width?: number;
    height?: number;
}

const BtnRadius: React.FC<Props> = ({
    ImageSvg,
    onPress,
    containerStyles,
    propsSvg,
}: Props) => {
    return (
        <TouchableOpacity
            style={[styles.container, containerStyles]}
            onPress={() => onPress()}>
            <ImageSvg
                width={RFPercentage(4)}
                height={RFPercentage(4)}
                fill={'#fff'}
                {...(propsSvg && propsSvg)}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#20c4cb',
        padding: 10,
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
        alignSelf: 'center',
        margin: 5,
    },
});

export default BtnRadius;
