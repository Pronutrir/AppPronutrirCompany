import React, { useState } from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import useTheme from '../../hooks/useTheme';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';

type Props = {
    onpress?(): void;
    Enabled?: boolean;
};

const ToggleSwitch: React.FC<Props> = ({ onpress, Enabled = false }: Props) => {
    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);

    const [isEnabled, setIsEnabled] = useState(Enabled);

    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState);
        if (onpress) {
            onpress();
        }
    };

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{
                    false: theme.colors.BROWNPRIMARY,
                    true: theme.colors.GREENDARK,
                }}
                thumbColor={isEnabled ? theme.colors.WHITE : theme.colors.BROWNLIGHT}
                ios_backgroundColor={theme.colors.BROWNPRIMARY}
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{ alignSelf: 'flex-end' }}
            />
        </View>
    );
};

export default ToggleSwitch;

const createStyles = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
    return styles;
};
