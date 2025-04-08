import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CheckMark from '../../../../assets/svg/checkMark.svg';
import { ThemeContextData } from '../../../../contexts/themeContext';
import { useSinaisVitaisAll } from '../../../../hooks/useSinaisVitais';
import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
interface Props {
  Item: string;
}

const CheckSinaisVitaisComponent: React.FC<Props> = ({ Item }: Props) => {
  const styles = useThemeAwareObject(createStyles);

  const { data: sinaisVitais } = useSinaisVitaisAll();

  if (sinaisVitais?.some((element) => element.cD_PACIENTE === Item)) {
    return (
      <View style={styles.container}>
        <CheckMark
          style={styles.img}
          width={RFPercentage(3)}
          height={RFPercentage(3)}
        />
        <Text style={styles.text}>Enviado</Text>
      </View>
    );
  } else {
    return null;
  }
};

export default CheckSinaisVitaisComponent;

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    container: {
      marginBottom: RFPercentage(3.5),
      position: 'absolute',
      right: 0,
      bottom: RFPercentage(-3),
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1
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
