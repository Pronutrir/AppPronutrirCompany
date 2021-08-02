import React from 'react';
import { Platform } from 'react-native';
import { StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native';
import ArrowBack from '../../assets/svg/arrowBack.svg';

interface Props {
    onPress(): void;
}

const BackButton: React.FC<Props> = ({ onPress } : Props) => {

    const size = Dimensions.get('screen').width / 15

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <ArrowBack fill={'#748080'} width={size} height={size} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'transparent'
    },
    btn: {
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            }
        }),
        borderRadius: 100,
    },
    imgBtn: {
        padding: 15,
    }
})

export default BackButton;
