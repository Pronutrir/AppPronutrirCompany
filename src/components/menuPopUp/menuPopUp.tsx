import React, {
    useState,
    useCallback,
    useImperativeHandle,
    useEffect,
} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import OptionsSvg from '../../assets/svg/options.svg';
import { Color, NumberProp, SvgProps } from 'react-native-svg';
interface IStyleSvg {
    width: NumberProp | undefined;
    height: NumberProp | undefined;
    fill: Color | undefined;
}
interface Props {
    btnLabels?: string[];
    BtnOptionsSvg?: React.FC<SvgProps>;
    onpress?(item: string): void;
    styleSvg?: IStyleSvg;
    widthMenu?: number;
    btnVisible?: boolean;
    showItemSelected?: boolean;
    ItemSelected?: string;
}
export interface ModalHandlesMenu {
    showMenu(): void;
    hideMenu(): void;
}

const MenuPopUp = React.forwardRef<ModalHandlesMenu, Props>(
    (
        {
            btnLabels = ['menu item1', 'menu item2'],
            onpress,
            BtnOptionsSvg = OptionsSvg,
            styleSvg = {
                width: RFPercentage(1.5),
                height: RFPercentage(4),
                fill: '#737373',
            },
            btnVisible = true,
            widthMenu,
            showItemSelected = false,
            ItemSelected = '',
        }: Props,
        ref,
    ) => {
        const styles = useThemeAwareObject(createStyles);

        const [visible, setVisible] = useState(false);
        const [selected, setSelected] = useState('');

        const selectedItem = (item: string) => {
            if (showItemSelected) {
                setSelected(item);
            }
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

        useEffect(() => {
            setSelected(ItemSelected);
        }, []);

        return (
            <View style={styles.container}>
                <Menu
                    style={{
                        width: widthMenu && widthMenu,
                    }}
                    visible={visible}
                    anchor={
                        btnVisible ? (
                            <TouchableOpacity
                                onPress={showMenu}
                                style={{
                                    padding: RFPercentage(0.8),
                                }}>
                                <BtnOptionsSvg {...styleSvg} />
                            </TouchableOpacity>
                        ) : null
                    }
                    onRequestClose={hideMenu}>
                    {btnLabels.map((item) => (
                        <MenuItem
                            key={item.toString()}
                            style={
                                selected === item
                                    ? styles.boxItemSelected
                                    : styles.boxItem
                            }
                            textStyle={{
                                ...styles.text,
                                width: widthMenu && widthMenu,
                            }}
                            onPress={() => selectedItem(item)}>
                            <Text>{item}</Text>
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
            paddingHorizontal: RFPercentage(1),
        },
        boxItem: {
            marginVertical: RFPercentage(0.5),
            paddingVertical: RFPercentage(0.5),
        },
        boxItemSelected: {
            marginVertical: RFPercentage(0.5),
            paddingVertical: RFPercentage(0.5),
            backgroundColor: theme.colors.BUTTON_SECUNDARY,
        },
        text: {
            fontSize: theme.typography.SIZE.fontysize14,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
        },
    });
    return styles;
};
