import React, { memo, useCallback, useContext, useRef, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import HistorySvg from '../../../../assets/svg/historico.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

import { IAgendaConsulta, useGetAgendaConsultas } from '../../../../hooks/useAgendaConsultas';
import { useGerarSenhaPainel } from '../../../../hooks/usePainelSenha';
import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';

import { ThemeContextData } from '../../../../contexts/themeContext';
import { IFilterConsultas } from '../../../../contexts/sinaisVitaisContext';
import PrintBluetoothContext from '../../../../contexts/printBluetoothContext';
import AuthContext from '../../../../contexts/auth';
import NotificationGlobalContext from '../../../../contexts/notificationGlobalContext';

import CardSimples from '../../../../components/Cards/CardSimples';
import ShimerPlaceHolderCardSNVTs from '../../../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import PressableRipple from '../../../../components/ripple/PressableRipple';
import Loading, { LoadHandles } from '../../../../components/Loading/Loading';
/* import ModalCentralize, { ModalHandles as ModalHandlesOptions } from '../../../../components/Modais/ModalCentralize';
import BtnCentered from '../../../../components/buttons/BtnCentered'; */

import CheckSinaisVitaisComponent from '../checkSinaisVitaisComponent/checkSinaisVitaisComponent';
import CheckPVSinaisVitaisComponent from '../checkPVSinaisVitaisComponent/checkPVSinaisVitaisComponent';
import MenuPopUp, { ModalHandlesMenu } from '../../../../components/menuPopUp/menuPopUp';
interface Props {
  dataSourceConsultas?: IAgendaConsulta[] | null;
  selectFilter: React.MutableRefObject<IFilterConsultas>;
  isFetching?: boolean;
  filterConsultas: (item?: IFilterConsultas) => IAgendaConsulta[] | undefined;
}

const CardConsultasComponent: React.FC<Props> = ({
  dataSourceConsultas,
  selectFilter,
  isFetching,
  filterConsultas,
}: Props) => {
  const styles = useThemeAwareObject(createStyles);
  const navigation = useNavigation();

  const { addNotification } = useContext(NotificationGlobalContext);
  const { printSenha } = useContext(PrintBluetoothContext);
  const { stateAuth: { PerfilSelected } } = useContext(AuthContext);

  const { refetch } = useGetAgendaConsultas();
  const { mutateAsync: mutateAsyncGerarSenha } = useGerarSenhaPainel();

  const loadingRef = useRef<LoadHandles>(null);
  /* const refModalCentralizeSenha = useRef<ModalHandlesOptions>(null); */
  /* const selectItem = useRef<IAgendaConsulta | null>(null); */

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleGerarSenha = async (item: IAgendaConsulta, nR_SEQ_FILA_P: number) => {
    try {
      if (nR_SEQ_FILA_P != 0) {
        loadingRef.current?.openModal();
        const result = await mutateAsyncGerarSenha({
          cD_ESTABELECIMENTO_P: item.cD_ESTABELECIMENTO,
          cD_PESSOA_FISICA_P: item.cD_PESSOA_FISICA,
          iE_SENHA_PRIORITARIA_P: 'N',
          nR_SEQ_FILA_P: nR_SEQ_FILA_P,
          nM_USUARIO_P: PerfilSelected?.nM_USUARIO ?? 'appMobile',
        });
        loadingRef.current?.closeModal();
        await printSenha(result, item.nM_PESSOA_FISICA);
      } else {
        addNotification({
          message:
            'Médico sem agenda vinculada a fila no painel de senhas!',
          status: 'error',
        });
      }
    } catch (error) {
      loadingRef.current?.closeModal();
    }
  };

  const handleGerarSenhaOptions = (item: IAgendaConsulta, option: string) => {
    switch (option) {
      case "Gerar senha normal": handleGerarSenha(item, item.seQ_FILAS_SENHA[0]);
        break;
      case "Gerar senha Prioridade": handleGerarSenha(item, item.seQ_FILAS_SENHA[1]);
        break;
    }
  }

  const Item = useCallback(({ item, index }: { item: IAgendaConsulta; index: number }) => {
    const MenuPopUpRef = useRef<ModalHandlesMenu>(null);
    return (
      <PressableRipple
        key={index.toString()}
        onLongPress={() => MenuPopUpRef.current?.showMenu()}
        onPress={() =>
          navigation.navigate('UpdateSinais', { PessoaFisica: item, GeraAtendimento: false, Origin: "Consulta" })
        }
        style={styles.cardStyle}>
        <View style={styles.consultaItemContainer}>
          <View style={styles.box1}>
            <CheckPVSinaisVitaisComponent Item={item.counT_SVMP} />
            <HistorySvg width={RFPercentage(5)} height={RFPercentage(5)}>
              Botão
            </HistorySvg>
          </View>
          <View style={styles.box2}>
            {renderConsultaInfo('Paciente', item?.nM_PESSOA_FISICA.toUpperCase())}
            {renderConsultaInfo('Data Nascimento', moment(item?.dT_NASCIMENTO).format('DD-MM-YYYY'))}
            {renderConsultaInfo('Médico', item?.nM_GUERRA)}
            {renderConsultaInfo('Especialidade', item?.dS_ESPECIALIDADE)}
            {renderConsultaInfo('Horário da Agenda', moment(item?.dT_AGENDA).format('HH:mm'))}
            <CheckSinaisVitaisComponent Item={item.cD_PESSOA_FISICA} />
          </View>
        </View>
        <MenuPopUp
          containerStyle={styles.menuPopUpStyle}
          ref={MenuPopUpRef}
          btnVisible={false}
          btnLabels={['Gerar senha normal', 'Gerar senha Prioridade']}
          onpress={(options) => handleGerarSenhaOptions(item, options)}
        />
      </PressableRipple>
    );
  }, [dataSourceConsultas]);

  const renderConsultaInfo = (label: string, value: string | undefined) => (
    <View style={styles.item}>
      <Text style={styles.textLabel}>{label}: </Text>
      <Text style={styles.text}>{value}</Text>
    </View>
  );


  const renderItem = useCallback(({ item, index }: { item: IAgendaConsulta; index: number }) => {
    return (
      <CardSimples styleCardContainer={styles.cardStyle}>
        <Item key={index.toString()} item={item} index={index} />
      </CardSimples>
    )
  }, [dataSourceConsultas]);

  const renderItemEmpty = () => (
    <CardSimples styleCardContainer={styles.cardStyle}>
      <Text style={styles.text}>Nenhum consulta encontrada!</Text>
    </CardSimples>
  );

  const handleRefresh = async () => {
    setRefreshing(true);

    if (selectFilter.current.nM_GUERRA || selectFilter.current.dS_ESPECIALIDADE) {
      filterConsultas({
        nM_GUERRA: selectFilter.current.nM_GUERRA
          ? selectFilter.current.nM_GUERRA
          : null,
        dS_ESPECIALIDADE: selectFilter.current.dS_ESPECIALIDADE
          ? selectFilter.current.dS_ESPECIALIDADE
          : null,
      });
    } else {
      await refetch();
    }
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {isFetching ? (
        Array(4).fill(<ShimerPlaceHolderCardSNVTs />)
      ) : (
        <FlatList
          data={dataSourceConsultas}
          renderItem={({ item, index }) => renderItem({ item, index })}
          keyExtractor={(item, index) => index.toString()}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={renderItemEmpty}
        />
      )}
      <Loading ref={loadingRef} />
      {/* <ModalCentralize style={{ width: RFPercentage(30), height: RFPercentage(30), justifyContent: 'space-around' }} ref={refModalCentralizeSenha}>
        <Text style={styles.textLabel}>Gerar senha</Text>
        <BtnCentered labelBtn='Normal' SizeText={18} onPress={() => selectItem.current && handleGerarSenha(selectItem.current, selectItem.current.seQ_FILAS_SENHA[0])} enabled={true} />
        <BtnCentered labelBtn='Prioridade' SizeText={18} onPress={() => selectItem.current && handleGerarSenha(selectItem.current, selectItem.current.seQ_FILAS_SENHA[1])} enabled={true} />
      </ModalCentralize> */}
    </View>
  );
};
const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
    },
    cardStyle: {
      flex: 1,
      borderRadius: 10
    },
    consultaItemContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: RFPercentage(3),
    },
    titleLabel: {
      alignSelf: 'flex-start',
      paddingLeft: 10,
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
    item: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    SubItem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    box1: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 3,
    },
    box2: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'flex-start',
      margin: 3,
    },
    menuPopUpStyle: {
      position: 'absolute',
      right: 0,
    },
  });
  return styles;
};

export default memo(CardConsultasComponent);
