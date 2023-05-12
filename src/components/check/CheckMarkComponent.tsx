import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
interface Props {
  Show: boolean;
  IconText: string;
  Icon: JSX.Element;
  TextColor?: string;
}
const CheckMarkComponent = ({ Show, IconText, Icon, TextColor }: Props) => {
  const styles = useThemeAwareObject(createStyles);

  return Show ? (
    <View style={styles.container}>
      {Icon}
      <Text style={[styles.text, { color: TextColor }]}>{IconText}</Text>
    </View>
  ) : null;
};

export default CheckMarkComponent;

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      right: 0,
      bottom: -10,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      alignSelf: 'center',
    },
    text: {
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_PRIMARY,
      fontSize: theme.typography.SIZE.fontysize10,
    },
  });
  return styles;
};
