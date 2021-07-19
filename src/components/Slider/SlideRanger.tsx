import React, { useCallback, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// @ts-ignore
import RangeSlider from 'rn-range-slider';
import Label from './Label';
import Notch from './Notch';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Thumb from './Thumb';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import IncrementDecrement from '../IncrementDecrement';

interface Props {
    label: string;
    medida: string;
    step: number;
    valueMin: number;
    valueMax: number;
    valueRanger: number;
    setValueRanger(value: number): void;
};

const SlideReanger: React.FC<Props> = ({ label = "texto", medida= "cm", step= 1, valueMin= 0, valueMax= 10, valueRanger = 1.00, setValueRanger }: Props) => {

    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);

    const handleValueChange = useCallback(value => {
        console.log("Render - SlideReanger");
        if(!Number.isInteger(value)){
            value = parseFloat(value.toFixed(1))
        }
        setValueRanger(value);
    }, []);

    return (
        <View style={styles.ContainerRanger}>
            <View style={styles.labelRanger}>
                <Text style={styles.textLabel}>{label}</Text>
                <IncrementDecrement RangerValue={valueRanger} setRangerValue={setValueRanger} medida={medida} max={valueMax} min={valueMin} />
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
        padding: RFPercentage(1),
        marginLeft: RFPercentage(1),
        marginRight: RFPercentage(1),
        alignItems: "stretch",
        justifyContent: "center"
    },
    labelRanger: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: RFPercentage(2),
        paddingVertical: RFPercentage(1)
    },
    RangeSlider: {
        //backgroundColor: 'blue',
        paddingVertical: RFPercentage(1)
    },
    textLabel: {
        fontSize: RFValue(16, 680),
        color: '#666666',
        fontWeight: 'bold'
    }
});

export default memo(SlideReanger);