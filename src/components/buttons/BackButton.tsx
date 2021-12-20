import React from 'react';
import { Platform } from 'react-native';
import { StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native';
import ArrowBack from '../../assets/svg/arrowBack.svg';

interface Props {
    onPress(): void;
}

const BackButton: React.FC<Props> = ({ onPress }: Props) => {
    const size = Dimensions.get('screen').width / 15;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <ArrowBack fill={'#748080'} width={size} height={size} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    btn: {
        width: Dimensions.get('screen').width / 10,
        height: Dimensions.get('screen').width / 10,
        margin: 10,
        padding: 5,
        backgroundColor: '#fff',
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
        borderRadius: 30,
    },
});

export default BackButton;
