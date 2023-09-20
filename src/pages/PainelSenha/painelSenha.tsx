import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';
import CardSimples from '../../components/Cards/CardSimples';
import {
  PropsFilaEsperaAtendimentos,
  useGerarSenhaPainel,
  useGetFilas,
} from '../../hooks/usePainelSenha';
import { RFPercentage } from 'react-native-responsive-fontsize';
import PressableRipple from '../../components/ripple/PressableRipple';
import ModalCentralizedOptions, {
  ModalHandles,
} from '../../components/Modais/ModalCentralizedOptions';
import Loading, { LoadHandles } from '../../components/Loading/Loading';
import AuthContext from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import BtnRadius from '../../components/buttons/BtnRadius';
import PrinterSvg from '../../assets/svg/printer.svg';
import PrintBluetoothContext from '../../contexts/printBluetoothContext';

const PainelSenha = () => {
  const {
    stateAuth: { PerfilSelected },
  } = useContext(AuthContext);

  const { bleOpend, validationBluetooth, printSenha } = useContext(
    PrintBluetoothContext,
  );

  const navigation = useNavigation();

  const styles = useThemeAwareObject(createStyles);
  const refModalOptionsSenhaPainel = useRef<ModalHandles>(null);
  const loadingRef = useRef<LoadHandles>(null);

  const [message, setMessage] = useState<string>('');
  const [itemSelected, setItemSelected] =
    useState<PropsFilaEsperaAtendimentos | null>(null);

  const { mutateAsync } = useGerarSenhaPainel();

  const { data } = useGetFilas(7, 'A');

  const gerarSenha = async () => {
    if (itemSelected) {
      loadingRef.current?.openModal();
      try {
        const result = await mutateAsync({
          cD_ESTABELECIMENTO_P: itemSelected.cD_ESTABELECIMENTO,
          nM_USUARIO_P: PerfilSelected?.nM_USUARIO ?? 'appMobile',
          nR_SEQ_FILA_P: itemSelected.nR_SEQUENCIA,
          iE_SENHA_PRIORITARIA_P: 'N',
        });
        await printSenha(result);
      } catch (error) {
        console.log(error);
        loadingRef.current?.closeModal();
      }
      loadingRef.current?.closeModal();
    }
  };

  /*  const createPDF = async () => {
    const options = {
      html: '<html><h1 style="text-align:center;color:#000000;font-size: 22px">PDF TEST</h1><html>',
      fileName: 'test',
      directory: 'Documents',
      base64: true,
    };

    const file = await RNHTMLtoPDF.convert(options);
    console.log(file);
    return file.base64;
  }; */

  const onClickCard = async (item: PropsFilaEsperaAtendimentos) => {
    const validation = await validationBluetooth();
    if (validation) {
      setItemSelected(item);
      refModalOptionsSenhaPainel.current?.openModal();
      setMessage(`Deseja gerar senha para ${item.dS_CURTO.toLowerCase()} ?`);
    }
  };

  const renderItem: ListRenderItem<PropsFilaEsperaAtendimentos> = ({
    item,
  }) => (
    <CardSimples styleCardContainer={styles.card}>
      <PressableRipple
        onPress={() => onClickCard(item)}
        onLongPress={() => navigation.navigate('PrintBluetooth')}
        style={styles.PressableRippleStyle}>
        <Text style={styles.text}>{item.dS_CURTO}</Text>
      </PressableRipple>
    </CardSimples>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <BtnRadius
          onPress={() => navigation.navigate('PrintBluetooth')}
          containerStyles={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: bleOpend ? 'green' : 'red',
          }}
          ImageSvg={PrinterSvg}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={data?.filter(
          item => item.iE_PERMITE_CHAMADA === 'S' && item.dS_CURTO != 'teste',
        )}
        renderItem={renderItem}
      />
      <ModalCentralizedOptions
        ref={refModalOptionsSenhaPainel}
        message={message}
        onpress={gerarSenha}
      />
      <Loading ref={loadingRef} />
    </View>
  );
};

export default PainelSenha;

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.BACKGROUND_2,
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    card: {
      flex: 1,
      width: RFPercentage(40),
      height: RFPercentage(20),
      marginVertical: RFPercentage(3),
      alignItems: 'stretch',
    },
    PressableRippleStyle: {
      flex: 1,
      justifyContent: 'center',
      borderRadius: 10,
    },
    text: {
      fontFamily: theme.typography.FONTES.Bold,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_PRIMARY,
      fontSize: theme.typography.SIZE.fontysize18,
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });
  return styles;
};
