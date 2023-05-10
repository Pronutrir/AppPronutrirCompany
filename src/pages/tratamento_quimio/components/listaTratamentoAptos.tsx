import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
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

const ListaTratamentoAptos = () => {
  const styles = useThemeAwareObject(createStyles);

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
          NM_USUARIO: item.nM_PESSOA_FISICA,
        });
        useUpdateCacheAgendaQT(item?.nR_ATENDIMENTO);
        loadingRef.current?.closeModal();
      } catch (error) {
        loadingRef.current?.closeModal();
      }
    }
  };

  const FinalizarTratamento = async (
    item: IAtendimentosAptosEnfermagem | null,
  ) => {
    if (item) {
      try {
        loadingRef.current?.openModal();
        await mutateAsyncEndAtendimento({
          cD_ESTABELECIMENTO: 0,
          cD_PERFIL: 0,
          nM_USUARIO: '',
          nR_ATENDIMENTO: item?.nR_ATENDIMENTO,
          nR_PRESCRICAO: item?.nR_PRESCRICAO,
          nR_SEQ_ATENDIMENTO: item?.nR_SEQ_ATENDIMENTO,
        });
        loadingRef.current?.closeModal();
      } catch (error) {
        loadingRef.current?.closeModal();
      }
    }
  };

  const useUpdateCacheAgendaQT = (nR_ATENDIMENTO: number) => {
    queryClient.setQueryData<IAtendimentosAptosEnfermagem[] | undefined>(
      'agendaQuimio',
      itens => {
        const indexItem = itens?.findIndex(
          item => item.nR_ATENDIMENTO === nR_ATENDIMENTO,
        );

        if (itens && indexItem) {
          itens[indexItem].dT_INICIO_ADM = moment().format('DD-MM-YYYY');
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
