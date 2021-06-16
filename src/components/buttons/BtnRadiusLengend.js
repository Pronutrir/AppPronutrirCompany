import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import propTypes from 'prop-types';

const BtnRadiusLengend = ({ labelBtn, labelBtnStyle, onPress, containerBtnStyle, imgBtn }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => setActiveModalBotttom(true)}>
                <ExcluirSvg fill={'#FFFF'} width={widthBtn + 10} height={widthBtn + 10} />
            </TouchableOpacity>
            <Text style={[styles.textBtn, labelBtnStyle && {...labelBtnStyle}]}>{labelBtn}</Text>
        </View>
    )
}

BtnRadiusLengend.propTypes = {
    labelBtn: propTypes.string,
    fontSize: propTypes.number
}

BtnRadiusLengend.defaultProps = {
    actilabelBtnveModal: 'MyButtom',
    fontSize: 16
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center'
    },
    btn: {
        marginHorizontal: 20,
        backgroundColor: '#84cac5',
        padding: 10,
        borderRadius: 30,
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
        })
    },
    boxBtn: {
        marginVertical: 10,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    
});

export default BtnRadiusLengend;
