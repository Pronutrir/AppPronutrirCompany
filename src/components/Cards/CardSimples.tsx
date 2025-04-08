import React from 'react';
import { StyleSheet, View, Platform, ViewStyle, Dimensions } from 'react-native';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';

interface Props {
  styleCardContainer?: ViewStyle;
  children: JSX.Element;
}

const CardSimples: React.FC<Props> = ({
  children,
  styleCardContainer,
}: Props) => {
  const styles = useThemeAwareObject(createStyles);
  return <View style={[styles.card, styleCardContainer]}>{children}</View>;
};

const createStyles = (theme: ThemeContextData) => {
  // Obtenção das dimensões da tela
  const { width } = Dimensions.get('window');

  // Categorização de dispositivos por tamanho de tela
  const isVerySmallDevice = width < 320;
  const isSmallDevice = width < 360;
  const isMediumDevice = width < 400;

  // Cálculo da largura segura do card com margens adaptativas
  const horizontalMargin = isVerySmallDevice ? 8 : isSmallDevice ? 10 : 12;
  const safeWidth = width - (horizontalMargin * 2);

  // Ajuste das bordas e margens com base no tamanho da tela
  const borderRadius = isVerySmallDevice ? 8 : 10;
  const cardMargin = isVerySmallDevice ? 6 : isSmallDevice ? 8 : 10;

  // Ajuste da elevação/sombra com base no tamanho da tela
  const elevation = isVerySmallDevice ? 2 : 3;
  const shadowRadius = isVerySmallDevice ? 4 : 6;

  const styles = StyleSheet.create({
    card: {
      width: safeWidth,
      maxWidth: '98%', // Garantia adicional para não extrapolar a largura
      borderRadius: borderRadius,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: theme.colors.BACKGROUND_1,
      margin: cardMargin,
      overflow: 'hidden', // Impede que o conteúdo ultrapasse as bordas arredondadas
      ...Platform.select({
        ios: {
          shadowOffset: {
            width: 0,
            height: isVerySmallDevice ? 3 : 5,
          },
          shadowOpacity: 0.2,
          shadowRadius: shadowRadius,
          shadowColor: theme.colors.DARKLIGHT,
        },
        android: {
          elevation: elevation,
        },
      }),
    },
  });
  return styles;
};

export default CardSimples;
