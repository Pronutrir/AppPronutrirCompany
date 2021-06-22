import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RangeSlider from 'rn-range-slider';
import Label from './Label';
import Notch from './Notch';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Thumb from './Thumb';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const SlideReanger = () => {

    const [rangeDisabled, setRangeDisabled] = useState(false);
    const [valueRanger, setValueRanger] = useState(1.50);
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(2.5);
    const [floatingLabel, setFloatingLabel] = useState(false);

    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);

    const handleValueChange = useCallback(value => {
        setValueRanger(value.toFixed(2));
    }, []);

    return (
        <View style={styles.ContainerRanger}>
            <View style={styles.labelRanger}>
                <Text style={styles.textLabel}>Altura</Text>
                <Text style={styles.textLabel}>{valueRanger} cm</Text>
            </View>
            <RangeSlider
                style={styles.RangeSlider}
                min={min}
                max={max}
                step={0.01}
                floatingLabel
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                renderLabel={renderLabel}
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
        padding: RFPercentage(2, 680),
        marginLeft: RFPercentage(2, 680),
        marginRight: RFPercentage(2, 680),
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
        fontSize: RFValue(20, 680),
        color: '#666666',
        fontWeight: 'bold'
    }
});

export default SlideReanger;