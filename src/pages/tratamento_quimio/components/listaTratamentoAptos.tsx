import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import Loading, { LoadHandles } from '../../../components/Loading/Loading';
import ModalCentralizedOptions, {
  ModalHandles as ModalHandlesCentralizedOptions,
} from '../../../components/Modais/ModalCentralizedOptions';
import { ThemeContextData } from '../../../contexts/themeContext';
import ShimerPlaceHolderCardSNVTs from '../../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import CardSimples from '../../../components/Cards/CardSimples';
import { useQueryClient } from 'react-query';
import moment from 'moment';
import CardTratamentoAptos from './cardTratamentoAptos';
import {
  IAtendimentosAptosEnfermagem,
  useEndAtendimento,
  useGetAtendimentosAptosEnfermagem,
  useInitAtendimento,
} from '../../../hooks/useAtendimento';
import AuthContext from '../../../contexts/auth';
import NotificationGlobalContext from '../../../contexts/notificationGlobalContext';

const ListaTratamentoAptos = () => {
  const styles = useThemeAwareObject(createStyles);

  const { addAlert } = useContext(NotificationGlobalContext);

  const {
    stateAuth: { UnidadeSelected, PerfilSelected },
  } = useContext(AuthContext);

  const { mutateAsync: mutateAsyncInitAtendimento } = useInitAtendimento();
  const { mutateAsync: mutateAsyncEndAtendimento } = useEndAtendimento();

  const queryClient = useQueryClient();

  const loadingRef = useRef<LoadHandles>(null);

  const refModalInitTratamento = useRef<ModalHandlesCentralizedOptions>(null);

  const refModalEndTratamento = useRef<ModalHandlesCentralizedOptions>(null);

  const { data: AtendimentosAptos } = useGetAtendimentosAptosEnfermagem();

  const [selectedItem, setSelectedItem] =
    useState<IAtendimentosAptosEnfermagem | null>(null);

  const IniciarTratamento = async (
    item: IAtendimentosAptosEnfermagem | null,
  ) => {
    if (item) {
      try {
        loadingRef.current?.openModal();
        await mutateAsyncInitAtendimento({
          NR_ATENDIMENTO: item.nR_ATENDIMENTO,
          NM_USUARIO: PerfilSelected?.nM_USUARIO ?? 'AppPronutrir',
        });
        useUpdateCacheAgendaQT(item?.nR_ATENDIMENTO, 'dT_INICIO_ADM');
        loadingRef.current?.closeModal();
      } catch (error) {
        loadingRef.current?.closeModal();
      }
    }
  };

  const FinalizarTratamento = async (
    item: IAtendimentosAptosEnfermagem | null,
  ) => {
    if (item && UnidadeSelected && PerfilSelected) {
      try {
        loadingRef.current?.openModal();
        await mutateAsyncEndAtendimento({
          cD_ESTABELECIMENTO: UnidadeSelected?.cD_ESTABELECIMENTO,
          cD_PERFIL: PerfilSelected?.cD_PERFIL,
          nM_USUARIO: PerfilSelected.nM_USUARIO,
          nR_ATENDIMENTO: item?.nR_ATENDIMENTO,
          nR_PRESCRICAO: item?.nR_PRESCRICAO,
          nR_SEQ_ATENDIMENTO: item?.nR_SEQ_ATENDIMENTO,
        });
        useUpdateCacheAgendaQT(item?.nR_ATENDIMENTO, 'dT_FIM_ADM');
        loadingRef.current?.closeModal();
      } catch (error) {
        loadingRef.current?.closeModal();
      }
    } else {
      addAlert({
        message:
          'Error ao finalizar o tratamento selecione a unidade e o perfil do usuário!',
        status: 'error',
      });
    }
  };

  type options = 'dT_INICIO_ADM' | 'dT_FIM_ADM';

  const useUpdateCacheAgendaQT = (
    nR_ATENDIMENTO: number,
    update_props: options,
  ) => {
    queryClient.setQueryData<IAtendimentosAptosEnfermagem[] | undefined>(
      'agendaQuimio',
      itens => {
        const indexItem = itens?.findIndex(
          item => item.nR_ATENDIMENTO === nR_ATENDIMENTO,
        );

        if (itens && indexItem) {
          itens[indexItem][update_props] = moment().format('DD-MM-YYYY');
        }
        return itens;
      },
    );
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: IAtendimentosAptosEnfermagem;
    index: number;
  }) => (
    <CardSimples styleCardContainer={styles.cardStyle}>
      <CardTratamentoAptos
        key={index.toString()}
        item={item}
        index={index}
        setSelectedItem={setSelectedItem}
        refModalInitTratamento={refModalInitTratamento}
        refModalEndTratamento={refModalEndTratamento}
      />
    </CardSimples>
  );

  const renderItemEmpty = () => (
    <CardSimples styleCardContainer={styles.cardStyle}>
      <Text style={styles.text}>Nenhum sinal vital encontrado</Text>
    </CardSimples>
  );

  return (
    <View style={styles.container}>
      {AtendimentosAptos ? (
        <FlatList
          data={AtendimentosAptos}
          renderItem={({ item, index }) => renderItem({ item, index })}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={renderItemEmpty}
        />
      ) : (
        Array(4).fill(<ShimerPlaceHolderCardSNVTs />)
      )}
      <Loading ref={loadingRef} />
      <ModalCentralizedOptions
        ref={refModalInitTratamento}
        message={`Deseja iniciar tratamento do paciente ?`}
        onpress={() => IniciarTratamento(selectedItem)}
      />
      <ModalCentralizedOptions
        ref={refModalEndTratamento}
        message={`Deseja finalizar tratamento do paciente ?`}
        onpress={() => FinalizarTratamento(selectedItem)}
      />
    </View>
  );
};

export default ListaTratamentoAptos;

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
    },
    cardStyle: {
      flex: 1,
      padding: 10,
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
  });
  return styles;
};
