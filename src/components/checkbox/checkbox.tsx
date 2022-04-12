import { StyleSheet } from 'react-native';
import React from 'react';
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
    onPress?(isChecked: boolean): void;
};

const Checkbox = ({
    size = 4,
    text = undefined,
    isChecked = false,
    onPress,
}: Props) => {
    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);

    return (
        <BouncyCheckbox
            size={RFPercentage(size)}
            isChecked={isChecked}
            fillColor={theme.colors.GREENPRIMARY}
            unfillColor={theme.colors.BACKGROUND_1}
            style={styles.checkbox}
            textStyle={styles.text}
            text={text}
            onPress={(isChecked: boolean) => {
                if (onPress) {
                    onPress(isChecked);
                }
            }}
            disableBuiltInState={true}
            iconImageStyle={styles.iconImageStyle}
            iconStyle={styles.iconStyle}
        />
    );
};

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
            width: RFPercentage(2.5), 
            height: RFPercentage(2.5) 
        },
        iconStyle: { 
            margin: 0, 
            padding: 0 
        },
    });
    return styles;
};
