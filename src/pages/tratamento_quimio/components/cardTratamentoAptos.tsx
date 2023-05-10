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

type Props = {
  item: IAtendimentosAptosEnfermagem;
  index: number;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<IAtendimentosAptosEnfermagem | null>
  >;
  refModalInitTratamento: React.RefObject<ModalHandlesCentralizedOptions>;
  refModalEndTratamento: React.RefObject<ModalHandlesCentralizedOptions>;
};

type IFilterSearch = 'Sinais Vitais' | 'Inicio tratamento' | 'Fim tratamento';

const CardTratamentoAptos = ({
  item,
  index,
  setSelectedItem,
  refModalInitTratamento,
  refModalEndTratamento,
}: Props) => {
  const styles = useThemeAwareObject(createStyles);
  const navigation = useNavigation();

  const [placeholder, setPlaceholder] = useState<IFilterSearch>();

  const refMenuBotom = useRef<ModalHandlesMenu>(null);

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
      default:
        break;
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
        <View style={styles.item}>
          <Text style={styles.textLabel}>Hora da agenda: </Text>
          <Text style={styles.text}>
            {moment(item.dT_NASCIMENTO).format('HH:mm')}
          </Text>
        </View>
      </View>
      <MenuPopUp
        ref={refMenuBotom}
        btnVisible={false}
        containerStyle={styles.menuPopUpStyleSearch}
        btnLabels={['Sinais vitais', 'Inicio tratamento', 'Fim tratamento']}
        showItemSelected={true}
        ItemSelected={placeholder}
        onpress={label => MenuPopUpOptions(label, item)}
      />
      <CheckMarkComponent
        Show={Boolean(item.dT_INICIO_ADM)}
        text={'Iniciado'}
      />
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
