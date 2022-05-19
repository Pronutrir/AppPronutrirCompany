import React from 'react';
import { Platform } from 'react-native';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ConfigSvg from '../../assets/svg/config.svg';

interface Props {
    onPress(): void;
}

const BtnOptionsFilter: React.FC<Props> = ({ onPress }: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <ConfigSvg
                    fill={'#fff'}
                    width={RFPercentage(5)}
                    height={RFPercentage(5)}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    btn: {
        width: RFPercentage(7),
        height: Dimensions.get('screen').height / 16,
        margin: 5,
        padding: 5,
        backgroundColor: '#833d72',
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
        borderRadius: 10,
    },
});

export default BtnOptionsFilter;
