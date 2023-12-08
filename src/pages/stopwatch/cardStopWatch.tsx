import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import HistorySvg from '../../assets/svg/historico.svg';
import CheckMarkComponent from '../../components/check/CheckMarkComponent';
import QuestionSvg from '../../assets/svg/question.svg';
import moment from 'moment';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import MenuPopUp, {
  ModalHandlesMenu,
} from '../../components/menuPopUp/menuPopUp';
import useTheme from '../../hooks/useTheme';
import {
  IPostMotivoAtraso,
  IQuimioterapiaStopwatchH,
  useStopWatchMotivoAtraso,
} from '../../hooks/useStopwatch';
import CardObservacao from './cardlObservacao';
import ModalCentralize, {
  ModalHandles,
} from '../../components/Modais/ModalCentralize';
import Loading, { LoadHandles } from '../../components/Loading/Loading';
import { useQueryClient } from 'react-query';
import AuthContext from '../../contexts/auth';

type Props = {
  item: IQuimioterapiaStopwatchH;
  index: number;
  setor: string;
};

type IFilterSearch =
  | 'Sinais Vitais'
  | 'Inicio tratamento'
  | 'Fim tratamento'
  | 'Lib. medicação'
  | 'Lib. pre-medicação';

const CardStopWatch = ({ item, index, setor }: Props) => {
  const {
    stateAuth: { usertasy },
  } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const resultListAtraso = queryClient.getQueryData<IPostMotivoAtraso[]>(
    setor ?? 'teste',
  );

  const styles = useThemeAwareObject(createStyles);

  const theme = useTheme();

  const [placeholder] = useState<IFilterSearch>();

  const refMenuBotom = useRef<ModalHandlesMenu>(null);
  const refmodalObservacoes = useRef<ModalHandles>(null);
  const loadingRef = useRef<LoadHandles>(null);

  const { mutateAsync } = useStopWatchMotivoAtraso();

  const AddMotivoAtraso = async (item: IPostMotivoAtraso) => {
    loadingRef.current?.openModal();
    await mutateAsync(item);
    refmodalObservacoes.current?.closeModal();
    loadingRef.current?.closeModal();
  };

  const result = resultListAtraso?.filter(
    select => select.nr_sequencia == item.nR_SEQ_PACIENTE,
  )[0];

  const ActionsCheck = () => {
    switch (true) {
      case Boolean(result):
        return (
          <CheckMarkComponent
            Show={true}
            IconText={'Motivo atraso'}
            TextColor={theme.colors.GREENLIGHT}
            Icon={<QuestionSvg fill={theme.colors.GREENLIGHT} />}
          />
        );

      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      key={index.toString()}
      onPress={() => {
        refMenuBotom.current?.showMenu();
      }}
      style={{ flexDirection: 'row', paddingVertical: 10 }}>
      <View style={styles.box1}>
        <HistorySvg width={RFPercentage(5)} height={RFPercentage(5)} />
      </View>
      <View style={styles.box2}>
        <View style={styles.item}>
          <Text style={styles.textLabel}>Paciente: </Text>
          <Text style={styles.text}>{`${item.paciente.toUpperCase()}`}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.textLabel}>Data Nascimento: </Text>
          <Text style={styles.text}>
            {moment(item.dT_ACOLHIMENTO).format('DD-MM-YYYY')}
          </Text>
        </View>
        <View style={[styles.item, { marginRight: RFPercentage(1) }]}>
          <Text style={styles.textLabel}>Hora da agenda: </Text>
          <Text style={styles.text}>
            {moment(item.dT_REAL).format('HH:mm')}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.textLabel}>Acomodação: </Text>
          <Text style={styles.text}>{item.dS_LOCAL ?? '- -'}</Text>
        </View>
        <View style={styles.item_protocolo}>
          <Text style={styles.textLabel}>Protocolo: </Text>
          <Text style={styles.text_protocolo}>{item.protocolo}</Text>
        </View>
      </View>
      <MenuPopUp
        ref={refMenuBotom}
        btnVisible={false}
        containerStyle={styles.menuPopUpStyleSearch}
        btnLabels={['Motivo de atraso']}
        showItemSelected={true}
        ItemSelected={placeholder}
        onpress={() => refmodalObservacoes.current?.openModal()}
      />
      <ActionsCheck />
      <ModalCentralize ref={refmodalObservacoes}>
        <CardObservacao
          item={{ motivo: result?.title ?? '', observacao: result?.body ?? '' }}
          setor={'Nursing'}
          disable={Boolean(!result)}
          onpress={selected =>
            AddMotivoAtraso({
              title: selected.motivo,
              body: selected.observacao,
              cod_PF: parseInt(usertasy.cD_PESSOA_FISICA),
              nomePF: usertasy.usuariO_FUNCIONARIO_PERFIL[0].nM_USUARIO,
              nr_sequencia: item.nR_SEQ_PACIENTE,
              tt: true,
            })
          }
        />
      </ModalCentralize>
      <Loading ref={loadingRef} />
    </TouchableOpacity>
  );
};

export default CardStopWatch;

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
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
    text_protocolo: {
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_SECONDARY,
      fontSize: theme.typography.SIZE.fontysize10,
      textAlign: 'justify',
      textAlignVertical: 'center',
    },
    item_protocolo: {
      width: '80%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    item: {
      flexDirection: 'row',
      flexWrap: 'wrap',
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
    menuPopUpStyleSearch: {
      position: 'absolute',
      alignSelf: 'auto',
      right: 0,
    },
  });
  return styles;
};
