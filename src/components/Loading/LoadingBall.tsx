import React, { memo, useEffect } from 'react';
import { StyleSheet, Image, View, Dimensions } from 'react-native';

interface Props {
    active: boolean;
    width?: number;
};

const DimensionsWidth = Dimensions.get('screen').width / 8;

const LoadingBall: React.FC<Props> = ({ active, width = DimensionsWidth }: Props) => {
    return (
        <View style={styles.container}>
            {
                active && <Image style={{ width: width, height: width }} source={require('../../assets/imagens/DualBall.gif')} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default memo(LoadingBall);
