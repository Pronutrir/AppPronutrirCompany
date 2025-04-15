import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  PixelRatio,
} from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';
import useTheme from '../../../hooks/useTheme';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import { ThemeContextData } from '../../../contexts/themeContext';
import PressableRipple from '../../../components/ripple/PressableRipple';

type Props = {
  label: string;
  onPress?(): void;
  onLongPress?(): void;
  disabled: boolean;
  ImgSVG: React.FC<SvgProps>;
};

const BtnPainelComponent: React.FC<Props> = ({
  onPress = () => {
    'onPress clicked';
  },
  onLongPress = () => {
    'onLongPress clicked';
  },
  disabled,
  ImgSVG,
  label,
}: Props) => {
  const theme = useTheme();
  const styles = useThemeAwareObject(createStyles);

  return (
    <PressableRipple
      style={disabled ? styles.btnDisabled : styles.btn}
      disabled={disabled}
      onPress={() => onPress()}
      onLongPress={() => onLongPress()}>
      <View style={styles.img_btnHotrizontal}>
        <ImgSVG
          fill={theme.colors.FILL_ICONE}
          width={RFPercentage(5)}
          height={RFPercentage(5)}
        />
      </View>
      <View style={styles.box_btnHorizontal}>
        <Text style={styles.text_btnHorizontal}>{label}</Text>
      </View>
    </PressableRipple>
  );
};

export default BtnPainelComponent;

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    btn: {
      width: Dimensions.get('window').width / 2.2,
      height: RFPercentage(20),
      backgroundColor: theme.colors.BACKGROUND_1,
      marginVertical: 10,
      paddingVertical: PixelRatio.get() < 2 ? 10 : 15,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.2,
          shadowRadius: 6,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    btnDisabled: {
      width: Dimensions.get('window').width / 3.3,
      height: RFPercentage(13),
      backgroundColor: theme.colors.BACKGROUND_1,
      margin: 5,
      paddingVertical: PixelRatio.get() < 2 ? 10 : 15,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.2,
          shadowRadius: 6,
        },
        android: {
          elevation: 3,
        },
      }),
      opacity: 0.3,
    },
    img_btnHotrizontal: {
      padding: RFPercentage(1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    box_btnHorizontal: {
      padding: RFPercentage(1),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5,
    },
    text_btnHorizontal: {
      fontSize: theme.typography.SIZE.fontysize14,
      fontFamily: theme.typography.FONTES.Bold,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_PRIMARY,
      textAlign: 'center',
    },
  });
  return styles;
};
