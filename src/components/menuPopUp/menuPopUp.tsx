import React, { useState, useCallback, useImperativeHandle } from 'react';
import { StyleSheet, View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../contexts/themeContext';
import useTheme from '../../hooks/useTheme';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import OptionsSvg from '../../assets/svg/options.svg';
interface Props {
    btnLabels?: string[];
    onpress?(item: string): void;
}
export interface ModalHandlesMenu {
    showMenu(): void;
    hideMenu(): void;
}

const MenuPopUp = React.forwardRef<ModalHandlesMenu, Props>(
    ({ btnLabels = ['menu item1', 'menu item2'], onpress }: Props, ref) => {
        const theme = useTheme();
        const styles = useThemeAwareObject(createStyles);

        const [visible, setVisible] = useState(false);

        const selectedItem = (item: string) => {
            setVisible(false);
            if (onpress) {
                onpress(item);
            }
        };

        const showMenu = useCallback(() => {
            setVisible(true);
        }, []);

        const hideMenu = useCallback(() => {
            setVisible(false);
        }, []);

        useImperativeHandle(ref, () => {
            return {
                showMenu,
                hideMenu,
            };
        });

        return (
            <View style={styles.container}>
                <Menu
                    visible={visible}
                    anchor={
                        <OptionsSvg
                            onPress={showMenu}
                            width={RFPercentage(4)}
                            height={RFPercentage(4)}
                            fill={theme.colors.TEXT_SECONDARY}
                        />
                    }
                    onRequestClose={hideMenu}>
                    {btnLabels.map((item) => (
                        <MenuItem
                            key={item}
                            style={styles.boxItem}
                            textStyle={styles.text}
                            onPress={() => selectedItem(item)}>
                            {item}
                        </MenuItem>
                    ))}
                </Menu>
            </View>
        );
    },
);

MenuPopUp.displayName = 'MenuPopUp';

export default MenuPopUp;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        boxItem: {
            marginVertical: RFPercentage(0.5),
            paddingVertical: RFPercentage(0.5),
        },
        text: {
            width: '100%',
            fontSize: theme.typography.SIZE.fontysize14,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
        },
    });
    return styles;
};
