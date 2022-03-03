import React, { useState } from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { ThemeContextData } from '../../contexts/themeContext';
import useTheme from '../../hooks/useTheme';
import useThemedStyles from '../../hooks/useThemedStyles';

type Props = {};

const ToggleSwitch: React.FC<Props> = (props: Props) => {

    const theme = useTheme();
    const styles = useThemedStyles(_styles);
     
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: theme.colors.BLACK, true: theme.colors.GREENDARK }}
                thumbColor={isEnabled ? theme.colors.WHITE : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{alignSelf: 'flex-end'}}
            />
        </View>
    );
};

export default ToggleSwitch;

const _styles = (theme: ThemeContextData) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
