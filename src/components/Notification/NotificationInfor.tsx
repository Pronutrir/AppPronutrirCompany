import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';
import { RFPercentage } from 'react-native-responsive-fontsize';
import InformationSvg from '../../assets/svg/information.svg';
import ModalBottomInfor, { ModalHandles } from '../Modais/ModalBottomInfor';
import Credencial from '../../assets/svg/carteira-de-identidade.svg';
import { SvgProps } from 'react-native-svg';

interface Props {
  msn?: string;
  iconeTop?: React.FC<SvgProps>;
}

const NotificationInfor: React.FC<Props> = ({
  msn = 'teste',
  iconeTop = Credencial,
}: Props) => {
  const styles = useThemeAwareObject(createStyles);
  const modalInforRef = useRef<ModalHandles>(null);
  return (
    <>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => modalInforRef.current?.openModal()}>
        <InformationSvg width={20} height={20} fill="red" />
      </TouchableOpacity>
      <ModalBottomInfor ref={modalInforRef} message={msn} IconeTop={iconeTop} />
    </>
  );
};

export default NotificationInfor;

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    circle: {
      position: 'absolute',
      height: RFPercentage(2.5),
      width: RFPercentage(2.5),
      backgroundColor: theme.colors.BACKGROUND_1,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: theme.colors.GREENDARK,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_SECONDARY,
      fontSize: theme.typography.SIZE.fontysize14,
      textAlignVertical: 'center',
    },
  });
  return styles;
};
