import React, { memo, useEffect } from 'react';
import { StyleSheet, Image, View, Dimensions } from 'react-native';

interface Props {
    active: boolean;
};

const LoadingBall: React.FC<Props> = ({ active }: Props) => {
    return (
        <View style={styles.container}>
            {
                active && <Image style={styles.loadingImg} source={require('../../assets/imagens/DualBall.gif')} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingImg:{
        width: Dimensions.get('screen').width / 8,
        height: Dimensions.get('screen').width / 8
    }
})

export default memo(LoadingBall);
