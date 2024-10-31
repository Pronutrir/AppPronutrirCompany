import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useRef, memo } from 'react';
import { ThemeContextData } from '../../../contexts/themeContext';
import CardSimples from '../../../components/Cards/CardSimples';
import PressableRipple from '../../../components/ripple/PressableRipple';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import MenuPopUp, {
  ModalHandlesMenu,
} from '../../../components/menuPopUp/menuPopUp';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
  PropsPacientFilaEspera,
  useGetListPacientFilaEspera,
  useInutilizarSenha,
} from '../../../hooks/usePainelSenha';
import SenhaSvg from '../../../assets/svg/senha.svg';
import PrintBluetoothContext from '../../../contexts/printBluetoothContext';
import Loading, { LoadHandles } from '../../../components/Loading/Loading';
import moment from 'moment';
import AuthContext from '../../../contexts/auth';

type Props = {
  item: PropsPacientFilaEspera;
};

const CardPainelSenhaComponent = ({ item }: Props) => {
  const styles = useThemeAwareObject(createStyles);

  const refMenuBotom = useRef<ModalHandlesMenu>(null);
  const loadingRef = useRef<LoadHandles>(null);

  const { stateAuth } = useContext(AuthContext);
  const { printSenha } = useContext(PrintBluetoothContext);
  const { mutateAsync } = useInutilizarSenha();
  const { refetch } = useGetListPacientFilaEspera();

  const selectOptions = async (label: string) => {
    switch (label) {
      case 'Imprimir':
        loadingRef.current?.openModal();
        await printSenha(item);
        loadingRef.current?.closeModal();
        break;
      case 'Inutlizar':
        {
          loadingRef.current?.openModal();
          await mutateAsync({
            CD_ESTABELECIMENTO: item.cD_ESTABELECIMENTO,
            CD_FILA_P: item.nR_SEQ_FILA_SENHA,
            CD_SENHA_P: item.cD_SENHA_GERADA,
            NM_USUARIO_P:
              stateAuth.PerfilSelected?.nM_USUARIO ?? item.nM_USUARIO,
            NR_SEQ_MOTIVO_INUTILIZACAO_P: 1,
            NR_SEQ_SENHA_P: item.nR_SEQUENCIA,
          });
          loadingRef.current?.closeModal();
          await refetch();
        }
        break;
      default:
        break;
    }
  };

  return (
    <CardSimples styleCardContainer={{ flex: 1 }}>
      <PressableRipple
        onLongPress={() => refMenuBotom.current?.showMenu()}
        onPress={() => refMenuBotom.current?.showMenu()}
        style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', padding: RFPercentage(1) }}>
          <View style={styles.box1}>
            <SenhaSvg width={RFPercentage(3)} height={RFPercentage(3)}>
              Botão
            </SenhaSvg>
          </View>
          <View style={styles.box2}>
            <View style={styles.item}>
              <Text style={styles.textLabel}>Fila: </Text>
              <Text style={styles.text}>{item.dS_FILA}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.textLabel}>Paciente: </Text>
              <Text style={styles.text}>{item.nM_PESSOA_FISICA ?? "sem agenda"}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.textLabel}>Senha: </Text>
              <Text style={styles.text}>{item.cD_SENHA_GERADA}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.textLabel}>Data - hora: </Text>
              <Text style={styles.text}>
                {moment(item.dT_GERACAO_SENHA).format('DD/MM/YYYY - hh:mm')}
              </Text>
            </View>
          </View>
          <View style={styles.box3}>
            <MenuPopUp
              containerStyle={{
                backgroundColor: 'red',
                position: 'absolute',
                left: 0,
              }}
              ref={refMenuBotom}
              btnVisible={false}
              btnLabels={['Imprimir', 'Inutlizar']}
              onpress={selectOptions}
            />
          </View>
        </View>
        <Loading ref={loadingRef} />
      </PressableRipple>
    </CardSimples>
  );
};

export default memo(CardPainelSenhaComponent);

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    box1: {
      flex: 0.5,
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: 3,
    },
    box2: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'flex-start',
      margin: 3,
    },
    box3: {
      backgroundColor: 'red',
      position: 'absolute',
      right: 0,
    },
    item: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    textLabel: {
      fontFamily: theme.typography.FONTES.Bold,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_PRIMARY,
      fontSize: theme.typography.SIZE.fontysize16,
    },
    text: {
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_SECONDARY,
      fontSize: theme.typography.SIZE.fontysize16,
    },
  });
  return styles;
};
