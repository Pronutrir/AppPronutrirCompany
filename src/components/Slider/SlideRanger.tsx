import React, { useCallback, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// @ts-expect-error: Unreachable code error
import RangeSlider from 'rn-range-slider';
import Notch from './Notch';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Thumb from './Thumb';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import IncrementDecrement from '../IncrementDecrement';

interface Props {
    label: string;
    medida: string;
    step: number;
    valueMin: number;
    valueMax: number;
    valueRanger: number;
    setValueRanger(value: number): void;
    disabled?: boolean;
    disabledIncrement?: boolean;
}

const SlideReanger: React.FC<Props> = ({
    label = 'texto',
    medida = 'cm',
    step = 1,
    valueMin = 0,
    valueMax = 10,
    valueRanger = 1.0,
    setValueRanger,
    disabled= false,
    disabledIncrement= false,
}: Props) => {
    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    //const renderLabel = useCallback((value) => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);

    const handleValueChange = useCallback(
        (value) => {
            if (!Number.isInteger(value)) {
                value = parseFloat(value.toFixed(1));
            }
            setValueRanger(value);
        },
        [setValueRanger],
    );

    return (
        <View style={styles.ContainerRanger}>
            <View style={styles.labelRanger}>
                <Text style={styles.textLabel}>{label}</Text>
                <IncrementDecrement
                    RangerValue={valueRanger}
                    setRangerValue={setValueRanger}
                    medida={medida}
                    max={valueMax}
                    min={valueMin}
                    disabled={disabled || disabledIncrement}
                />
            </View>
            <RangeSlider
                style={disabled ? styles.RangeSliderDisabled : styles.RangeSlider}
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
                disabled={disabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    ContainerRanger: {
        flex: 1,
        paddingVertical: RFPercentage(1),
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    labelRanger: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: RFPercentage(2),
        paddingVertical: RFPercentage(0.5),
    },
    RangeSlider: {
        paddingVertical: RFPercentage(1),
        opacity: 1,
    },
    RangeSliderDisabled: {
        paddingVertical: RFPercentage(1),
        opacity: 0.1,
    },
    textLabel: {
        fontSize: RFValue(16, 680),
        color: '#666666',
        fontWeight: 'bold',
    },
});

export default memo(SlideReanger);
