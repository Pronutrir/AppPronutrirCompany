import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export default function RadioButton({
    options,
    Width_full,
    selection,
    enable,
    flag,
    editable,
    indexOption,
}) {
    const [value, setValue] = useState();

    const select = (item) => {
        setValue((value) => (value = item.key));
        if (selection) {
            selection(item);
        }
    };

    useEffect(() => {
        select(options[0]);
    }, [flag]);

    useEffect(() => {
        if (editable) {
            setValue(indexOption);
        }
    }, []);

    return (
        <View style={Width_full ? styles.container : styles.container2}>
            {options.map((item) => {
                return (
                    <TouchableOpacity
                        key={item.key.toString()}
                        style={
                            Width_full
                                ? styles.buttonContainer
                                : styles.buttonContainer2
                        }
                        onPress={() => select(item)}>
                        <View style={styles.circle} disabled={!enable}>
                            {value === item.key && (
                                <View style={styles.checkedCircle} />
                            )}
                        </View>
                        <Text style={enable ? styles.text : styles.textDisbled}>
                            {item.text}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '95%',
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10,
    },
    buttonContainer2: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'center',
    },
    circle: {
        height: Dimensions.get('screen').width / 16,
        width: Dimensions.get('screen').width / 16,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#08948A',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkedCircle: {
        height: Dimensions.get('screen').width / 25,
        width: Dimensions.get('screen').width / 25,
        borderRadius: 7,
        backgroundColor: '#08948A',
    },
    text: {
        marginHorizontal: 10,
        fontSize: RFValue(16, 680),
        color: '#7C9292',
    },
    textDisbled: {
        marginHorizontal: 10,
        fontSize: RFValue(16, 680),
        color: '#7C9292',
        opacity: 0.5,
    },
    disabled: {
        opacity: 0.5,
    },
});
