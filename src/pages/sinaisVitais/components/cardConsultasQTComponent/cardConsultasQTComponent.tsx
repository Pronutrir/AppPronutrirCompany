import React, { memo, useCallback, useContext, useRef } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import HistorySvg from '../../../../assets/svg/historico.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CardSimples from '../../../../components/Cards/CardSimples';
import ShimerPlaceHolderCardSNVTs from '../../../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import SinaisVitaisContext from '../../../../contexts/sinaisVitaisContext';
import CheckSinaisVitaisComponent from '../checkSinaisVitaisComponent/checkSinaisVitaisComponent';
import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
import { ThemeContextData } from '../../../../contexts/themeContext';
import { IAgendaQT } from '../../../../hooks/useAgendaQt';
import Loading, { LoadHandles } from '../../../../components/Loading/Loading';
import PressableRipple from '../../../../components/ripple/PressableRipple';
import MenuPopUp, {
  ModalHandlesMenu,
} from '../../../../components/menuPopUp/menuPopUp';
import { useGerarSenhaPainel } from '../../../../hooks/usePainelSenha';
import PrintBluetoothContext from '../../../../contexts/printBluetoothContext';
import AuthContext from '../../../../contexts/auth';
import { StackNavigation } from '../../../../routes/routeDashboard';
interface Props {
  dataSourceQT?: IAgendaQT[] | null | undefined;
}

const CardConsultasQTComponent: React.FC<Props> = ({ dataSourceQT }: Props) => {
  const styles = useThemeAwareObject(createStyles);
  const navigation = useNavigation<StackNavigation>();
  const loadingRef = useRef<LoadHandles>(null);

  const { ValidationAutorizeTriagem } = useContext(SinaisVitaisContext);
  const { mutateAsync: mutateAsyncGerarSenha } = useGerarSenhaPainel();
  const { printSenha } = useContext(PrintBluetoothContext);
  const { stateAuth, stateAuth: { PerfilSelected } } = useContext(AuthContext);

  const autorizeTriagem = ValidationAutorizeTriagem();

  const redirectToUpdateSinais = useCallback((item: IAgendaQT) => {
    navigation.navigate('UpdateSinais', {
      PessoaFisica: item,
      GeraAtendimento: autorizeTriagem,
      Origin: autorizeTriagem ? 'Tratamento' : 'Tratamento_enfermagem',
    });
  }, [autorizeTriagem, navigation]);

  const handleGerarSenha = useCallback(async (item: IAgendaQT) => {
    try {
      loadingRef.current?.openModal();
      const result = await mutateAsyncGerarSenha({
        cD_ESTABELECIMENTO_P: item.cD_ESTABELECIMENTO,
        cD_PESSOA_FISICA_P: item.cD_PESSOA_FISICA,
        iE_SENHA_PRIORITARIA_P: 'N',
        nR_SEQ_FILA_P: item.nR_SEQ_FILA_SENHA,
        nM_USUARIO_P: PerfilSelected?.nM_USUARIO ?? 'appMobile',
      });
      loadingRef.current?.closeModal();
      await printSenha(result, item.nM_PESSOA_FISICA);
    } catch (error) {
      loadingRef.current?.closeModal();
    }
  }, [mutateAsyncGerarSenha, printSenha, stateAuth]);

  const Item = useCallback(
    ({ item }: { item: IAgendaQT }) => {
      const MenuPopUpRef = useRef<ModalHandlesMenu>(null);
      return (
        <PressableRipple
          onLongPress={() => MenuPopUpRef.current?.showMenu()}
          onPress={() => redirectToUpdateSinais(item)}
          style={styles.pressableContainer}>
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <HistorySvg width={RFPercentage(5)} height={RFPercentage(5)} />
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.itemRow}>
                <Text style={styles.textLabel}>Paciente: </Text>
                <Text
                  style={
                    styles.text
                  }>{`${item.nM_PESSOA_FISICA.toUpperCase()}`}</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.textLabel}>Data Nascimento: </Text>
                <Text style={styles.text}>
                  {moment(item.dT_NASCIMENTO).format('DD-MM-YYYY')}
                </Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.textLabel}>Hora da agenda: </Text>
                <Text style={styles.text}>
                  {moment(item.dT_REAL).format('HH:mm')}
                </Text>
              </View>
              <CheckSinaisVitaisComponent Item={item.cD_PESSOA_FISICA} />
            </View>
            <MenuPopUp
              containerStyle={styles.menuPopUpStyle}
              ref={MenuPopUpRef}
              btnVisible={false}
              btnLabels={['Gerar senha']}
              onpress={() => handleGerarSenha(item)}
            />
          </View>
        </PressableRipple>
      );
    },
    [redirectToUpdateSinais],
  );

  const renderItem = useCallback(
    ({ item }: { item: IAgendaQT; }) => (
      <CardSimples key={item.nR_ATENDIMENTO} styleCardContainer={styles.cardStyle}>
        <Item item={item} />
      </CardSimples>
    ),
    [dataSourceQT],
  );

  const renderItemEmpty = () => (
    <CardSimples styleCardContainer={styles.cardStyle}>
      <Text style={styles.text}>Nenhum sinal vital encontrado</Text>
    </CardSimples>
  );

  return (
    <View style={styles.container}>
      {dataSourceQT ? (
        <FlatList
          data={dataSourceQT}
          renderItem={({ item }) => renderItem({ item })}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={renderItemEmpty}
        />
      ) : (
        Array(4).fill(<ShimerPlaceHolderCardSNVTs />)
      )}
      <Loading ref={loadingRef} />
    </View>
  );
};
const createStyles = (theme: ThemeContextData) => {
  return StyleSheet.create({
    container: {
      flex: 1
    },
    cardStyle: {
      flex: 1
    },
    pressableContainer: {
      flex: 1,
      borderRadius: 10
    },
    itemContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: RFPercentage(3),
    },
    iconContainer: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 3,
    },
    infoContainer: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'flex-start',
      margin: 3,
    },
    itemRow: {
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
    menuPopUpStyle: {
      position: 'absolute',
      right: 0,
    },
  });
};

export default memo(CardConsultasQTComponent);
