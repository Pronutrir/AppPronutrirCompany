import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RangeSlider from 'rn-range-slider';
import Label from './Label';
import Notch from './Notch';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Thumb from './Thumb';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import IncrementDecrement from '../../components/IncrementDecrement';

const SlideReanger = ({ label = "texto", medida= "cm", step= 1, valueMin= 0, valueMax= 10, valueRanger = 1.00, setValueRanger }) => {

    //const [rangeDisabled, setRangeDisabled] = useState(false);
    //const [min, setMin] = useState(1);
    //const [max, setMax] = useState(2.5);
    //const [floatingLabel, setFloatingLabel] = useState(false);

    //const [value, setValue] = useState(1.50);

    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);

    const handleValueChange = useCallback(value => {
        if(!Number.isInteger(value)){
            value = parseFloat(value.toFixed(1))
        }
        setValueRanger(value);
    }, []);

    /* useEffect(() => {
        handleValueChange(valueRanger);
    }, []) */

    return (
        <View style={styles.ContainerRanger}>
            <View style={styles.labelRanger}>
                <Text style={styles.textLabel}>{label}</Text>
                <IncrementDecrement RangerValue={valueRanger} setRangerValue={setValueRanger} medida={medida}/>
            </View>
            <RangeSlider
                style={styles.RangeSlider}
                low={valueRanger}
                min={valueMin}
                max={valueMax}
                step={step}
                floatingLabel={true}
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                //renderLabel={renderLabel}
                renderNotch={renderNotch}
                onValueChanged={handleValueChange}
                disableRange={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    ContainerRanger: {
        flex: 1,
        padding: RFPercentage(1, 680),
        marginLeft: RFPercentage(1, 680),
        marginRight: RFPercentage(1, 680),
        alignItems: "stretch",
        justifyContent: "center"
    },
    labelRanger: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: RFPercentage(2, 680),
        paddingVertical: RFPercentage(1, 680)
    },
    RangeSlider: {
        //backgroundColor: 'blue',
        paddingVertical: RFPercentage(1, 680)
    },
    textLabel: {
        fontSize: RFValue(16, 680),
        color: '#666666',
        fontWeight: 'bold'
    }
});

export default SlideReanger;