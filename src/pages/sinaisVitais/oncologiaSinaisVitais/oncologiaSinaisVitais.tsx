import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import CardConsultasQTComponent from '../components/cardConsultasQTComponent/cardConsultasQTComponent';
import createStyles from './style';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import { IAgendaQT, useGetAgendasQt } from '../../../hooks/useAgendaQt';
import SearchBarPerson from '../../../components/seachBarPerson/searchBarPerson';
import MenuPopUp from '../../../components/menuPopUp/menuPopUp';
import { DateMask } from '../../../services/validacoes';
import moment from 'moment';
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

type PropsFilter = 'DATA DE NASCIMENTO' | 'NOME PACIENTE';
type PropsPlaceHolder = 'Data de nascimento' | 'Nome do paciente';
interface Ifilter {
  filter: PropsFilter;
  placeHolder: PropsPlaceHolder;
}

const filterDefault: Ifilter[] = [
  {
    filter: 'DATA DE NASCIMENTO',
    placeHolder: 'Data de nascimento',
  },
  { filter: 'NOME PACIENTE', placeHolder: 'Nome do paciente' },
];
const OncologiaSinaisVitais = () => {
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

  const clearSetTimeout = useRef<NodeJS.Timeout | null>(null);

  const [filterSelected, setFilterSelected] = useState<Ifilter>(
    filterDefault[0],
  );

  type Props_Search = 'nM_PESSOA_FISICA' | 'dT_NASCIMENTO';

  const validade_date = (value1: string, value2: string) => {
    const data1 = moment(value1).format('DD/MM/YYYY');
    const data2 = moment(value2, 'DD/MM/YYYY').format('DD/MM/YYYY');
    return data1 === data2;
  };

  const Search = (name: string, prop: Props_Search) => {
    if (prop === 'dT_NASCIMENTO') {
      const result = agendasQt?.filter(value =>
        validade_date(value[prop], name),
      );
      return result;
    } else {
      const result = agendasQt?.filter(item =>
        item[prop].toLocaleLowerCase().includes(name.toLocaleLowerCase()),
      );
      return result;
    }
  };

  const onChangeTextSearch = async (name: string) => {
    setState({ ...state, spinnerVisibility: true, query: name });

    if (clearSetTimeout.current) {
      clearTimeout(clearSetTimeout.current);
    }

    clearSetTimeout.current = setTimeout(() => {
      const seachResult = Search(name, 'nM_PESSOA_FISICA');
      setState(old => {
        return {
          ...old,
          query: name,
          dataSource:
            seachResult && seachResult.length > 0
              ? seachResult
              : old.dataSource,
          spinnerVisibility: false,
        };
      });
    }, 1000);
  };

  const onChangeDateSearch = (date: string) => {
    setState({ ...state, spinnerVisibility: true, query: date });

    const textDate = DateMask(date);

    if (textDate.length === 0) {
      setState(prevState => {
        return {
          ...prevState,
          spinnerVisibility: false,
          query: textDate,
          dataSource: agendasQt,
        };
      });
      return;
    }

    if (textDate.length === 10) {
      const seachResult = Search(textDate, 'dT_NASCIMENTO');
      setState(old => {
        return {
          ...old,
          query: textDate,
          dataSource: seachResult && seachResult.length > 0 ? seachResult : [],
          spinnerVisibility: false,
        };
      });
    }
  };

  const Onclean = () => {
    setState(prevState => {
      return {
        ...prevState,
        spinnerVisibility: false,
        dataSource: agendasQt,
        query: '',
      };
    });
  };

  const filter = (item: Ifilter) => {
    Onclean();
    setFilterSelected(item);
  };

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
      <View
        style={{
          flexDirection: 'row',
        }}>
        <SearchBarPerson
          placeholder={filterSelected.placeHolder}
          onChangeText={text =>
            filterSelected.filter === 'NOME PACIENTE'
              ? onChangeTextSearch(text)
              : onChangeDateSearch(text)
          }
          onClean={() => Onclean()}
          spinnerVisibility={state.spinnerVisibility}
          btnOptions={true}
          value={state.query}
          keyboardType={
            filterSelected.filter === 'NOME PACIENTE' ? 'default' : 'numeric'
          }
        />
        <MenuPopUp
          btnLabels={['Nome paciente', 'Data de nascimento']}
          containerStyle={{
            position: 'absolute',
            right: 0,
            alignSelf: 'center',
          }}
          onpress={label => {
            switch (label) {
              case 'Nome paciente':
                filter(filterDefault[1]);
                break;
              case 'Data de nascimento':
                filter(filterDefault[0]);
                break;
              default:
                break;
            }
          }}
        />
      </View>
      <CardConsultasQTComponent dataSourceQT={state.dataSource} />
    </View>
  );
};

export default OncologiaSinaisVitais;
