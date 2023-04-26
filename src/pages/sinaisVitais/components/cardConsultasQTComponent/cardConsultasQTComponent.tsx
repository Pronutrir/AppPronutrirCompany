import React, { memo, useContext, useRef, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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
import {
  IAgendaQT,
  useGetAgendasQt,
  useInitAtendimento,
} from '../../../../hooks/useAgendaQt';
import ModalCentralizedOptions, {
  ModalHandles as ModalHandlesCentralizedOptions,
} from '../../../../components/Modais/ModalCentralizedOptions';
import Loading, { LoadHandles } from '../../../../components/Loading/Loading';
import CheckMarkComponent from '../../../../components/check/CheckMarkComponent';
import { useQueryClient } from 'react-query';
import { boolean } from 'yup';
interface Props {
  dataSourceQT?: IAgendaQT[] | null | undefined;
}

const CardConsultasQTComponent: React.FC<Props> = ({ dataSourceQT }: Props) => {
  const styles = useThemeAwareObject(createStyles);

  const { refetch } = useGetAgendasQt();

  const { mutateAsync } = useInitAtendimento();

  const { ValidationAutorizeEnfermagem } = useContext(SinaisVitaisContext);

  const autorizeEnfermagem = ValidationAutorizeEnfermagem();

  const [selectedItem, setSelectedItem] = useState<IAgendaQT | null>(null);

  const refModalCentralizedOptions =
    useRef<ModalHandlesCentralizedOptions>(null);

  const loadingRef = useRef<LoadHandles>(null);

  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const useUpdateCacheAgendaQT = (nR_ATENDIMENTO: number) => {
    queryClient.setQueryData<IAgendaQT[] | undefined>(
      'agendaQuimio',
      (itens) => {
        const indexItem = itens?.findIndex(
          (item) => item.nR_ATENDIMENTO === nR_ATENDIMENTO,
        );

        if (itens && indexItem) {
          itens[indexItem].dT_INICIO_ADM = moment().format('DD-MM-YYYY');
        }
        return itens;
      },
    );
  };

  const IniciarTratamento = async (item: IAgendaQT | null) => {
    if (item) {
      try {
        loadingRef.current?.openModal();
        await mutateAsync({
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

  const Item = ({ item, index }: { item: IAgendaQT; index: number }) => {
    return (
      <TouchableOpacity
        key={index.toString()}
        onLongPress={() => {
          if (autorizeEnfermagem && Boolean(!item.dT_INICIO_ADM)) {
            setSelectedItem(item);
            refModalCentralizedOptions.current?.openModal();
          }
        }}
        onPress={() => {
          if (autorizeEnfermagem) {
            navigation.navigate('UpdateSinaisVitaisEnfermagem', {
              PessoaFisica: item,
            });
          } else {
            navigation.navigate('UpdateSinais', {
              PessoaFisica: item,
              GeraSenhaOncologia: true,
            });
          }
        }}
        style={{ flexDirection: 'row', paddingVertical: 10 }}>
        <View style={styles.box1}>
          <HistorySvg width={RFPercentage(5)} height={RFPercentage(5)} />
        </View>
        <View style={styles.box2}>
          <View style={styles.item}>
            <Text style={styles.textLabel}>Paciente: </Text>
            <Text
              style={
                styles.text
              }>{`${item.nM_PESSOA_FISICA.toUpperCase()}`}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.textLabel}>Data Nascimento: </Text>
            <Text style={styles.text}>
              {moment(item.dT_NASCIMENTO).format('DD-MM-YYYY')}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.textLabel}>Hora da agenda: </Text>
            <Text style={styles.text}>
              {moment(item.dT_REAL).format('HH:mm')}
            </Text>
          </View>
        </View>
        {autorizeEnfermagem ? (
          <CheckMarkComponent
            Show={Boolean(item.dT_INICIO_ADM)}
            text={'Iniciado'}
          />
        ) : (
          <CheckSinaisVitaisComponent Item={item.cD_PESSOA_FISICA} />
        )}
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item, index }: { item: IAgendaQT; index: number }) => (
    <CardSimples styleCardContainer={styles.cardStyle}>
      <Item key={index.toString()} item={item} index={index} />
    </CardSimples>
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
          renderItem={({ item, index }) => renderItem({ item, index })}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={renderItemEmpty}
        />
      ) : (
        Array(4).fill(<ShimerPlaceHolderCardSNVTs />)
      )}
      <Loading ref={loadingRef} />
      <ModalCentralizedOptions
        ref={refModalCentralizedOptions}
        message={`Deseja iniciar tratamento do paciente ?`}
        onpress={() => IniciarTratamento(selectedItem)}
      />
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

export default memo(CardConsultasQTComponent);
