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
      <SearchBarPerson
        value={state.query}
        onChangeText={text => Search(text)}
        onClean={() => Onclean()}
        btnOptions={true}
        placeholder={'Digite o nome do paciente'}
        spinnerVisibility={state.spinnerVisibility}
      />
      <ListaTratamentoAptos AtendimentosAptos={state.dataSource} />
    </View>
  );
};

export default Tratamento_quimio;
