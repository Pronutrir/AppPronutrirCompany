import React from 'react';
import SearchBar from 'react-native-dynamic-search-bar';
import { ThemeContextData } from '../../contexts/themeContext';
import { Dimensions, StyleSheet, View } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import MenuPopUp from '../menuPopUp/menuPopUp';

export interface IParamConsulta<T> {
    query: string | undefined;
    isLoading: boolean;
    refreshing: boolean;
    dataSource: T[] | undefined;
    spinnerVisibility: boolean;
    page: number;
    loadingScrow: boolean;
    continue: boolean;
    showRequest: boolean;
}

/**
 * @param item
 */

interface Props<T> {
    item: IParamConsulta<T>;
    onChangeText: (text: string) => void;
    onClean: () => void;
    btnOptions?: boolean;
}

const SearchBarPerson = <T extends Record<keyof T, unknown>>({
    item,
    onChangeText,
    onClean,
    btnOptions = false,
}: Props<T>) => {
    const styles = useThemeAwareObject(createStyles);

    return (
        <View style={styles.container}>
            <SearchBar
                darkMode={true}
                placeholder={'Nome do paciente'}
                spinnerVisibility={item.isLoading}
                style={styles.SearchBarStyle}
                textInputStyle={styles.textInputStyle}
                spinnerSize={RFValue(20, 680)}
                clearIconImageStyle={styles.clearIconImageStyle}
                searchIconImageStyle={styles.searchIconImageStyle}
                onChangeText={(text) => onChangeText(text)}
                onClearPress={() => onClean()}
                selectionColor="#fff"
                value={item.query}
                /* keyboardType={
                        filterSelected.filter === 'DATA DE NASCIMENTO'
                            ? 'number-pad'
                            : 'default'
                    } */
                returnKeyType={'next'}
            />
            <View
                style={{
                    position: 'absolute',
                    right: 0,
                    alignSelf: 'center',
                }}>
                {btnOptions && (
                    <MenuPopUp
                        btnLabels={['Nome paciente', 'Data de nascimento']}
                        onpress={(label) => {
                            switch (label) {
                                case 'Nome paciente':
                                    /* filter(filterDefault[1]); */
                                    break;
                                case 'Data de nascimento':
                                    /* filter(filterDefault[0]); */
                                    break;
                                default:
                                    break;
                            }
                        }}
                    />
                )}
            </View>
        </View>
    );
};

export default SearchBarPerson;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            paddingVertical: RFPercentage(2),
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        SearchBarStyle: {
            height: Dimensions.get('screen').height / 16,
            backgroundColor: theme.colors.BUTTON_TERTIARY,
        },
        textInputStyle: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_TERTIARY,
            fontSize: theme.typography.SIZE.fontysize16,
        },
        clearIconImageStyle: {
            width: RFPercentage(2),
            height: RFPercentage(2),
        },
        searchIconImageStyle: {
            width: RFPercentage(2),
            height: RFPercentage(2),
        },
        loading: {
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
    });
    return styles;
};
