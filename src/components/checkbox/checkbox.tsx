import { StyleSheet } from 'react-native';
import React, { useCallback, useImperativeHandle, useState } from 'react';
import useTheme from '../../hooks/useTheme';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { RFPercentage } from 'react-native-responsive-fontsize';

type Props = {
    size?: number;
    fillColor?: string;
    unfillColor?: string;
    text?: string;
    isChecked?: boolean;
    //iconStyle: CustomTextStyleProp;
    //textStyle={{ fontFamily: "JosefinSans-Regular" }}
    onPress?(isChecked: boolean, text?: string): void;
};
export interface CheckedHandles {
    onPressChecked?(isChecked: boolean): void;
    text?: string;
}

const Checkbox = React.forwardRef<CheckedHandles, Props>(
    (
        { size = 2.5, text = undefined, isChecked = false, onPress }: Props,
        ref,
    ) => {

        const theme = useTheme();
        const styles = useThemeAwareObject(createStyles);

        const [check, setcheck] = useState(isChecked);

        const onPressChecked = useCallback((isChecked: boolean) => {
            setcheck(isChecked);
        }, []);

        useImperativeHandle(ref, () => {
            return {
                onPressChecked,
                text
            };
        });

        return (
            <BouncyCheckbox
                size={RFPercentage(size)}
                isChecked={check}
                fillColor={theme.colors.GREENPRIMARY}
                unfillColor={theme.colors.BACKGROUND_1}
                style={styles.checkbox}
                textStyle={styles.text}
                text={text}
                onPress={() => {
                    if (onPress) {
                        onPress(check, text);
                    }
                }}
                disableBuiltInState={true}
                iconImageStyle={styles.iconImageStyle}
                iconStyle={styles.iconStyle}
            />
        );
    },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        contaner: {
            backgroundColor: theme.colors.BACKGROUND_1,
        },
        checkbox: {
            marginHorizontal: 10,
        },
        text: {
            fontSize: theme.typography.SIZE.fontysize14,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
        },
        iconImageStyle: {
            width: RFPercentage(1.5),
            height: RFPercentage(1.5),
        },
        iconStyle: {
            margin: 0,
            padding: 0,
        },
    });
    return styles;
};
