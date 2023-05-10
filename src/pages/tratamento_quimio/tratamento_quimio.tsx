import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import createStyles from './style';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import SearchBarPerson from '../../components/seachBar/searchBarPerson';
import { IAgendaQT, useGetAgendasQt } from '../../hooks/useAgendaQt';
import CardConsultasQTComponent from '../sinaisVitais/components/cardConsultasQTComponent/cardConsultasQTComponent';
import ListaTratamentoAptos from './components/listaTratamentoAptos';

interface Consulta {
  query: string;
  isLoading: boolean;
  refreshing: boolean;
  dataSource: IAgendaQT[] | undefined;
  spinnerVisibility: boolean;
  page: number;
  loadingScrow: boolean;
  continue: boolean;
}

const Tratamento_quimio = () => {
  const styles = useThemeAwareObject(createStyles);

  const { data: agendasQt } = useGetAgendasQt();

  const [state, setState] = useState<Consulta>({
    query: '',
    isLoading: true,
    refreshing: false,
    dataSource: undefined,
    spinnerVisibility: false,
    page: 1,
    loadingScrow: false,
    continue: true,
  });

  useEffect(() => {
    setState(prevState => {
      return {
        ...prevState,
        spinnerVisibility: false,
        dataSource: agendasQt,
        query: '',
      };
    });
  }, [agendasQt]);

  return (
    <View style={styles.container}>
      <SearchBarPerson
        value={'Nome paciente'}
        onChangeText={text => console.log(text)}
        onClean={() => console.log('Clear')}
        btnOptions={true}
        placeholder={'digite o nome do paciente'}
        //spinnerVisibility={isFetching}
      />
      <ListaTratamentoAptos />
    </View>
  );
};

export default Tratamento_quimio;
