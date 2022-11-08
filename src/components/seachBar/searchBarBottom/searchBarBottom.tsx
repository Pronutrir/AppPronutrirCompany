import React, { useCallback, useImperativeHandle, useState } from 'react';
import { Platform, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import SearchBar from 'react-native-dynamic-search-bar';
import createStyles from './style';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import { useKeyboardHeight } from '../../../hooks/useKeyboardHeight';
import useTheme from '../../../hooks/useTheme';

interface Props {
    placeholder?: string;
    onChangeText?: (text: string) => void | undefined;
    onClearPress?: () => void | undefined;
    onBlur?: () => void | undefined;
    value: string;
}

export interface ModalHandles {
    openInput(): void;
    closeInput(): void;
}

const SearchBarBottom = React.forwardRef<ModalHandles, Props>(
    (
        {
            placeholder = 'digite seu texto',
            onChangeText,
            onClearPress,
            onBlur,
            value,
        }: Props,
        ref,
    ) => {
        const styles = useThemeAwareObject(createStyles);
        const theme = useTheme();

        const [inputShow, setInputShow] = useState(false);

        const keyboardHeight = useKeyboardHeight();

        const closeInput = useCallback(() => {
            setInputShow(false);
        }, []);

        const openInput = useCallback(() => {
            setInputShow(true);
        }, []);

        useImperativeHandle(ref, () => {
            return {
                openInput,
                closeInput,
            };
        });

        if (inputShow) {
            return (
                <SearchBar
                    darkMode
                    placeholder={placeholder}
                    spinnerVisibility={false}
                    style={styles.SearchBarStyle}
                    textInputStyle={styles.textInputStyle}
                    spinnerSize={RFValue(20, 680)}
                    clearIconImageStyle={styles.clearIconImageStyle}
                    searchIconImageStyle={styles.searchIconImageStyle}
                    onChangeText={onChangeText}
                    onClearPress={onClearPress}
                    selectionColor={theme.colors.BACKGROUND_1}
                    value={value}
                    keyboardType={'default'}
                    returnKeyType={'search'}
                    autoFocus={true}
                    onBlur={onBlur}
                />
            );
        } else {
            return null;
        }
    },
);

SearchBarBottom.displayName = 'SearchBarBottom';

export default SearchBarBottom;
