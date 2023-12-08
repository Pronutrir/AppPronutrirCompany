import { View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import createStyles from './style';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import SearchBarPerson from '../../components/seachBar/searchBarPerson';
import ListaTratamentoAptos from './components/listaTratamentoAptos';
import {
  IAtendimentosAptosEnfermagem,
  useGetAtendimentosAptosEnfermagem,
} from '../../hooks/useAtendimento';
import MenuPopUp, {
  ModalHandlesMenu,
} from '../../components/menuPopUp/menuPopUp';
interface Query {
  query: string;
  isLoading: boolean;
  refreshing: boolean;
  dataSource: IAtendimentosAptosEnfermagem[] | undefined;
  spinnerVisibility: boolean;
  page: number;
  loadingScrow: boolean;
  continue: boolean;
}

const Tratamento_quimio = () => {
  const styles = useThemeAwareObject(createStyles);

  const { data: AtendimentosAptos } = useGetAtendimentosAptosEnfermagem();

  const refMenuBotom = useRef<ModalHandlesMenu>(null);

  const [popUpOption, SetPopUpOption] = useState<string>('Todos');

  const [state, setState] = useState<Query>({
    query: '',
    isLoading: true,
    refreshing: false,
    dataSource: undefined,
    spinnerVisibility: false,
    page: 1,
    loadingScrow: false,
    continue: true,
  });

  const clearSetTimeout = useRef<NodeJS.Timeout | null>(null);

  const Search = async (name: string) => {
    setState({ ...state, spinnerVisibility: true, query: name });

    if (clearSetTimeout.current) {
      clearTimeout(clearSetTimeout.current);
    }
    if (AtendimentosAptos) {
      clearSetTimeout.current = setTimeout(() => {
        const SeachResult = AtendimentosAptos.filter(item =>
          item.nM_PESSOA_FISICA
            .toLocaleLowerCase()
            .includes(name.toLocaleLowerCase()),
        );
        if (SeachResult.length > 0) {
          setState(old => {
            return {
              ...old,
              query: name,
              dataSource: SeachResult,
              spinnerVisibility: false,
            };
          });
        } else {
          setState(old => {
            return {
              ...old,
              query: name,
              spinnerVisibility: false,
            };
          });
        }
      }, 1000);
    }
  };

  const Onclean = () => {
    setState(prevState => {
      return {
        ...prevState,
        spinnerVisibility: false,
        dataSource: AtendimentosAptos,
        query: '',
      };
    });
  };

  const PopUpFilter = (item: string) => {
    switch (item) {
      case 'Todos':
        return state.dataSource;
      case 'Pendentes':
        return state.dataSource?.filter(
          item =>
            !item.dT_RECEBIMENTO_PRE_MEDIC &&
            !item.dT_INICIO_PRE_TRATAMENTO &&
            !item.dT_ENTREGA_MEDICACAO &&
            !item.dT_INICIO_ADM &&
            !item.dT_FIM_ADM,
        );
      case 'Pré-entregue':
        return state.dataSource?.filter(
          item =>
            item.dT_RECEBIMENTO_PRE_MEDIC &&
            !item.dT_INICIO_PRE_TRATAMENTO &&
            !item.dT_ENTREGA_MEDICACAO &&
            !item.dT_INICIO_ADM &&
            !item.dT_FIM_ADM,
        );
      case 'Medicação-entregue':
        return state.dataSource?.filter(
          item =>
            item.dT_ENTREGA_MEDICACAO &&
            !item.dT_INICIO_ADM &&
            !item.dT_FIM_ADM,
        );
      case 'Inicio pré-tratamento':
        return state.dataSource?.filter(
          item =>
            item.dT_RECEBIMENTO_PRE_MEDIC &&
            item.dT_INICIO_PRE_TRATAMENTO &&
            !item.dT_ENTREGA_MEDICACAO &&
            !item.dT_INICIO_ADM &&
            !item.dT_FIM_ADM,
        );
      case 'Inicio tratamento':
        return state.dataSource?.filter(
          item =>
            item.dT_ENTREGA_MEDICACAO &&
            Boolean(item.dT_INICIO_ADM) &&
            Boolean(!item.dT_FIM_ADM),
        );
      case 'Fim tratamento':
        return state.dataSource?.filter(
          item => Boolean(item.dT_INICIO_ADM) && Boolean(item.dT_FIM_ADM),
        );
      default:
        return state.dataSource;
    }
  };

  useEffect(() => {
    setState(prevState => {
      return {
        ...prevState,
        spinnerVisibility: false,
        dataSource: AtendimentosAptos,
        query: '',
      };
    });
  }, [AtendimentosAptos]);

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center' }}>
        <SearchBarPerson
          value={state.query}
          onChangeText={text => Search(text)}
          onClean={() => Onclean()}
          btnOptions={true}
          placeholder={'Digite o nome do paciente'}
          spinnerVisibility={state.spinnerVisibility}
        />
        <MenuPopUp
          ref={refMenuBotom}
          btnVisible={true}
          containerStyle={styles.menuPopUpStyleSearch}
          btnLabels={[
            'Todos',
            'Pendentes',
            'Pré-entregue',
            'Medicação-entregue',
            'Inicio pré-tratamento',
            'Inicio tratamento',
            'Fim tratamento',
          ]}
          showItemSelected={true}
          ItemSelected={popUpOption}
          onpress={label => SetPopUpOption(label)}
        />
      </View>
      <ListaTratamentoAptos AtendimentosAptos={PopUpFilter(popUpOption)} />
    </View>
  );
};

export default Tratamento_quimio;
