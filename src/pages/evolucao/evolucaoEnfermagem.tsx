import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';

const EvolucaoEnfermagem = () => {
    const styles = useThemeAwareObject(createStyles);
  return (
    <View style={styles.container}>
      <Text>Evolução de Enfermagem</Text>
    </View>
  )
}

export default EvolucaoEnfermagem;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.BACKGROUND_2,
        },
    });
    return styles;
};
