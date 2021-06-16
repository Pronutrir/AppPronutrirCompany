import React, { useState } from 'react'
import { StyleSheet, Button, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function MyDateTimerPicker() {

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View>
            <View>
                <Button onPress={showDatepicker} title="Selecione a data da consulta" />
            </View>
            <View>
                <Button onPress={showTimepicker} title="Selecione a hora da consulta" />
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='spinner'
                    onChange={onChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({})
