import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CheckMark from '../../assets/svg/checkMark.svg';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';

interface Props {
  Show: boolean;
  text: string;
}
const CheckMarkComponent = ({ Show, text }: Props) => {
  const styles = useThemeAwareObject(createStyles);

  return Show ? (
    <View style={styles.container}>
      <CheckMark
        style={styles.img}
        width={RFPercentage(3.5)}
        height={RFPercentage(3.5)}
      />
      <Text style={styles.text}>{text}</Text>
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
