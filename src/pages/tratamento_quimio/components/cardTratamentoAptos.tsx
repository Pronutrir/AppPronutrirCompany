import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import HistorySvg from '../../../assets/svg/historico.svg';
import CheckMarkComponent from '../../../components/check/CheckMarkComponent';
import moment from 'moment';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import { ModalHandles as ModalHandlesCentralizedOptions } from '../../../components/Modais/ModalCentralizedOptions';
import MenuPopUp, {
  ModalHandlesMenu,
} from '../../../components/menuPopUp/menuPopUp';
import { IAtendimentosAptosEnfermagem } from '../../../hooks/useAtendimento';
import CheckMarkSvg from '../../../components/svgComponents/checkMarkSvg';
import CheckMarkSvgEnd from '../../../components/svgComponents/checkMarkSvgEnd';
import useTheme from '../../../hooks/useTheme';
import CheckMarkMedical from '../../../components/svgComponents/checkMarkMedical';
import ModalCentralize, {
  ModalHandles,
} from '../../../components/Modais/ModalCentralize';
import CardObservacao from './cardlObservacao';

type Props = {
  item: IAtendimentosAptosEnfermagem;
  index: number;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<IAtendimentosAptosEnfermagem | null>
  >;
  refModalInitTratamento: React.RefObject<ModalHandlesCentralizedOptions>;
  refModalEndTratamento: React.RefObject<ModalHandlesCentralizedOptions>;
  refModalEntregaMedicamento: React.RefObject<ModalHandlesCentralizedOptions>;
  refModalEntregaPreMedicamento: React.RefObject<ModalHandlesCentralizedOptions>;
  refModalInitPreMedicamento: React.RefObject<ModalHandlesCentralizedOptions>;
};

type IFilterSearch =
  | 'Sinais Vitais'
  | 'Inicio tratamento'
  | 'Fim tratamento'
  | 'Lib. medicação'
  | 'Lib. pre-medicação';

const CardTratamentoAptos = ({
  item,
  index,
  setSelectedItem,
  refModalInitTratamento,
  refModalEndTratamento,
  refModalEntregaMedicamento,
  refModalEntregaPreMedicamento,
  refModalInitPreMedicamento,
}: Props) => {
  const styles = useThemeAwareObject(createStyles);
  const navigation = useNavigation();

  const theme = useTheme();

  const [placeholder] = useState<IFilterSearch>();

  const refMenuBotom = useRef<ModalHandlesMenu>(null);
  const refmodalObservacoes = useRef<ModalHandles>(null);

  const MenuPopUpOptions = async (
    itemSelected: string,
    item: IAtendimentosAptosEnfermagem,
  ) => {
    switch (itemSelected) {
      case 'Sinais Vitais':
        navigation.navigate('UpdateSinaisVitaisEnfermagem', {
          PessoaFisica: item,
        });
        break;
      case 'Inicio tratamento':
        {
          setTimeout(
            () => {
              setSelectedItem(item);
              refModalInitTratamento.current?.openModal();
            },
            Platform.OS === 'android' ? 0 : 500,
          );
        }
        break;
      case 'Fim tratamento':
        {
          setTimeout(
            () => {
              setSelectedItem(item);
              refModalEndTratamento.current?.openModal();
            },
            Platform.OS === 'android' ? 0 : 500,
          );
        }
        break;
      case 'Lib. medicação':
        {
          setTimeout(
            () => {
              setSelectedItem(item);
              refModalEntregaMedicamento.current?.openModal();
            },
            Platform.OS === 'android' ? 0 : 500,
          );
        }
        break;
      case 'Lib. pre-medicação':
        {
          setTimeout(
            () => {
              setSelectedItem(item);
              refModalEntregaPreMedicamento.current?.openModal();
            },
            Platform.OS === 'android' ? 0 : 500,
          );
        }
        break;
      case 'Inicio pre-medicação':
        {
          setTimeout(
            () => {
              setSelectedItem(item);
              refModalInitPreMedicamento.current?.openModal();
            },
            Platform.OS === 'android' ? 0 : 500,
          );
        }
        break;
      case 'Alterar Poltrona':
        {
          setTimeout(
            () => {
              setSelectedItem(item);
              refmodalObservacoes.current?.openModal();
            },
            Platform.OS === 'android' ? 0 : 500,
          );
        }
        break;
      default:
        break;
    }
  };

  const ActionsOptions = (item: IAtendimentosAptosEnfermagem) => {
    const options = [];
    const {
      iE_PRE_MEDICACAO,
      dT_RECEBIMENTO_PRE_MEDIC,
      dT_ENTREGA_MEDICACAO,
      dT_INICIO_ADM,
      dT_FIM_ADM,
      dT_INICIO_PRE_TRATAMENTO,
    } = item;

    if (
      iE_PRE_MEDICACAO > 0 &&
      !dT_ENTREGA_MEDICACAO &&
      !dT_RECEBIMENTO_PRE_MEDIC &&
      !dT_INICIO_ADM &&
      !dT_FIM_ADM
    ) {
      options.push('Lib. pre-medicação');
    } else if (
      iE_PRE_MEDICACAO > 0 &&
      !dT_INICIO_PRE_TRATAMENTO &&
      dT_RECEBIMENTO_PRE_MEDIC &&
      !dT_INICIO_ADM &&
      !dT_FIM_ADM
    ) {
      options.push('Inicio pre-medicação');
    } else if (!dT_ENTREGA_MEDICACAO && !dT_INICIO_ADM && !dT_FIM_ADM) {
      options.push('Lib. medicação');
    } else if (dT_INICIO_ADM && !dT_FIM_ADM) {
      options.push('Fim tratamento');
    } else if (!dT_INICIO_ADM) {
      options.push('Inicio tratamento');
    }

    if (!dT_FIM_ADM) {
      options.push('Sinais Vitais', 'Alterar Poltrona');
    }

    return options;
  };

  const ActionsCheck = () => {
    const {
      dT_RECEBIMENTO_PRE_MEDIC,
      dT_ENTREGA_MEDICACAO,
      dT_INICIO_ADM,
      dT_FIM_ADM,
      dT_INICIO_PRE_TRATAMENTO,
    } = item;

    switch (true) {
      case dT_RECEBIMENTO_PRE_MEDIC &&
        !dT_INICIO_PRE_TRATAMENTO &&
        !dT_ENTREGA_MEDICACAO &&
        !dT_INICIO_ADM &&
        !dT_FIM_ADM:
        return (
          <CheckMarkComponent
            Show={true}
            IconText={'Pré-Entregue'}
            TextColor={theme.colors.WARNING}
            Icon={<CheckMarkMedical fill={theme.colors.WARNING} />}
          />
        );
      case dT_RECEBIMENTO_PRE_MEDIC &&
        dT_INICIO_PRE_TRATAMENTO &&
        !dT_ENTREGA_MEDICACAO &&
        !dT_INICIO_ADM &&
        !dT_FIM_ADM:
        return (
          <CheckMarkComponent
            Show={true}
            IconText={'Pré-Iniciado'}
            TextColor={theme.colors.GREENPRIMARY}
            Icon={<CheckMarkMedical fill={theme.colors.GREENPRIMARY} />}
          />
        );
      case dT_ENTREGA_MEDICACAO && !dT_INICIO_ADM && !dT_FIM_ADM:
        return (
          <CheckMarkComponent
            Show={true}
            IconText={'Entregue'}
            TextColor={theme.colors.GREENPRIMARY}
            Icon={<CheckMarkMedical fill={theme.colors.GREENPRIMARY} />}
          />
        );
      case Boolean(dT_INICIO_ADM) && Boolean(dT_FIM_ADM):
        return (
          <CheckMarkComponent
            Show={Boolean(dT_INICIO_ADM)}
            IconText={'Finalizado'}
            TextColor={theme.colors.TEXT_SECONDARY}
            Icon={<CheckMarkSvgEnd fill={theme.colors.TEXT_SECONDARY} />}
          />
        );
      case dT_INICIO_ADM && !dT_FIM_ADM:
        return (
          <CheckMarkComponent
            Show={Boolean(dT_INICIO_ADM)}
            IconText={'Iniciado'}
            TextColor={theme.colors.TEXT_PRIMARY}
            Icon={<CheckMarkSvg />}
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
        <View style={[styles.item, { marginRight: RFPercentage(1) }]}>
          <Text style={styles.textLabel}>Hora da agenda: </Text>
          <Text style={styles.text}>
            {moment(item.dT_REAL).format('HH:mm')}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.textLabel}>Acomodação: </Text>
          <Text style={styles.text}>{item.dS_ACOMODACAO ?? '- -'}</Text>
        </View>
        <View style={styles.item_protocolo}>
          <Text style={styles.textLabel}>Protocolo: </Text>
          <Text style={styles.text_protocolo}>{item.dS_PROTOCOLO_ONCO}</Text>
        </View>
      </View>
      <MenuPopUp
        ref={refMenuBotom}
        btnVisible={false}
        containerStyle={styles.menuPopUpStyleSearch}
        btnLabels={ActionsOptions(item)}
        showItemSelected={true}
        ItemSelected={placeholder}
        onpress={label => MenuPopUpOptions(label, item)}
      />
      <ModalCentralize ref={refmodalObservacoes}>
        <CardObservacao item={item} refmodalObservacoes={refmodalObservacoes} />
      </ModalCentralize>
      <ActionsCheck />
    </TouchableOpacity>
  );
};

export default CardTratamentoAptos;

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
