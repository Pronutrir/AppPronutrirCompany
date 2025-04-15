import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { InputStandard } from 'react-native-input-outline';
import { RFPercentage } from 'react-native-responsive-fontsize';
import useTheme from '../../hooks/useTheme';
import { cpfMask } from '../../services/validacoes';
import Checkbox from '../../components/checkbox/checkbox';
import BtnCentered from '../../components/buttons/BtnCentered';
import SearchBarPerson from '../../components/seachBar/searchBarPerson';
import MenuPopUp, {
  ModalHandlesMenu,
} from '../../components/menuPopUp/menuPopUp';
import CardSimples from '../../components/Cards/CardSimples';
import { useSetores } from '../../hooks/useEstabelecimentos';
import SelectedDropdown from '../../components/selectedDropdown/SelectedDropdown';
import {
  IPropsCirculacaoInterna,
  useAddCirculacaoInterna,
  useCirculacaoInternaFilter,
} from '../../hooks/useCirculacaoInterna';
import { valicacaoCPF } from '../../services/validacaoCpf';
import Loading, { LoadHandles } from '../../components/Loading/Loading';
import AuthContext from '../../contexts/auth';

interface Query {
  query: string;
  isLoading: boolean;
  refreshing: boolean;
  dataSource: IPropsCirculacaoInterna[] | undefined;
  spinnerVisibility: boolean;
  page: number;
  loadingScrow: boolean;
  continue: boolean;
}

const CirculacaoInterna = () => {
  const styles = useThemeAwareObject(createStyle);
  const theme = useTheme();

  const {
    stateAuth: { UnidadeSelected }
  } = useContext(AuthContext);

  const refSelected = useRef<'CPF' | 'RG'>('CPF');
  const refMenuBotom = useRef<ModalHandlesMenu>(null);
  const refModalLoading = useRef<LoadHandles>(null);

  const [itemSelected, setItemSelected] = useState<'Documento' | 'Visitante'>(
    'Visitante',
  );

  const { data: setores } = useSetores(UnidadeSelected?.cD_ESTABELECIMENTO);

  const { mutateAsync } = useAddCirculacaoInterna();

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

  const {
    data: listFilter,
    isFetching,
    remove,
  } = useCirculacaoInternaFilter(state.query, UnidadeSelected?.cD_ESTABELECIMENTO);

  const RefactoryPerfisData = () => {
    if (setores && setores.length > 0) {
      const result = setores?.map(element => {
        return {
          index: element.cD_SETOR_ATENDIMENTO,
          label: element.dS_SETOR_ATENDIMENTO,
          value: element,
        };
      });
      return result?.sort((a, b) => {
        return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
      });
    } else {
      [];
    }
  };

  const AddCirculacaoInterna = async (
    item: IPropsCirculacaoInterna,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resetForm: any,
  ) => {
    try {
      refModalLoading.current?.openModal();
      await mutateAsync(item);
      refModalLoading.current?.closeModal();
      Onclean();
      resetForm();
    } catch (error) {
      refModalLoading.current?.closeModal();
    }
  };

  const SearchItemCallback = useCallback(() => {
    if (state.query) {
      return listFilter;
    } else {
      remove();
      return null;
    }
  }, [listFilter]);

  const Onclean = () => {
    remove();
    setState(prevState => {
      return {
        ...prevState,
        dataSource: undefined,
        query: '',
      };
    });
  };

  const FormSchema = Yup.object().shape({
    Prestador: Yup.string().required('Prestador é obrigatório!'),
    Cliente: Yup.string()
      .required('Nome é obrigatório!')
      .matches(/(\w.+\s).+/, 'Insira o nome e sobrenome'),
    Destino: Yup.object({
      dS_SETOR_ATENDIMENTO: Yup.string().defined(),
      cD_SETOR_ATENDIMENTO: Yup.string().defined(),
    }).required('Destino é obrigatório!'),
    Documento: Yup.string()
      .max(14, 'Verifique a quantidade de caracteres')
      .min(11, 'Verifique a quantidade de caracteres')
      .required('Documento é obrigatório!')
      .test(
        'is-james',
        () => 'CPF inválido',
        value => {
          if (refSelected.current == 'CPF' && value?.length == 11) {
            return valicacaoCPF(value?.replace(/[.-]/g, ''));
          } else {
            return true;
          }
        },
      ),
  });

  const RenderItem = ({ item }: { item: IPropsCirculacaoInterna }) => {
    const { setValues } = useFormikContext();
    return (
      <TouchableOpacity
        key={item?.id}
        style={styles.item}
        onPress={() => {
          setValues({
            Prestador: item.registro.prestador,
            Cliente: item.cliente,
            Documento: item.documento,
            tipo_documento: item.tipo_documento,
            Destino: {
              dS_SETOR_ATENDIMENTO: '',
              cD_SETOR_ATENDIMENTO: '',
            },
          });
          Onclean();
        }}>
        <Text style={styles.titleAutoComlete}>{item?.cliente}</Text>
        <View>
          <Text style={styles.descricao}>{item?.registro?.prestador}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          Prestador: '',
          Cliente: '',
          Documento: '',
          tipo_documento: refSelected.current,
          Destino: {
            dS_SETOR_ATENDIMENTO: '',
            cD_SETOR_ATENDIMENTO: '',
          },
        }}
        onSubmit={(values, { resetForm }) => {
          AddCirculacaoInterna(
            {
              cliente: values.Cliente.trim(),
              registro: {
                destino: values.Destino.dS_SETOR_ATENDIMENTO,
                prestador: values.Prestador.trim(),
              },
              documento: values.Documento.replace(/[.-]/g, ''),
              tipo_documento: values.tipo_documento,
              cd_estabelecimento: UnidadeSelected?.cD_ESTABELECIMENTO ?? 7
            },
            resetForm,
          );
        }}
        validationSchema={FormSchema}>
        {({
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          setTouched,
          resetForm,
        }) => (
          <View style={styles.containerForm}>
            <View style={styles.box1}>
              <View style={{ justifyContent: 'center' }}>
                <SearchBarPerson
                  value={state.query}
                  onChangeText={text =>
                    setState(old => {
                      return {
                        ...old,
                        query: text,
                      };
                    })
                  }
                  onClean={() => {
                    Onclean();
                    resetForm();
                  }}
                  btnOptions={true}
                  placeholder={
                    itemSelected === 'Visitante'
                      ? `Digite o nome do ${itemSelected}`
                      : `Digite o Número ${itemSelected}`
                  }
                  spinnerVisibility={isFetching}
                  keyboardType={
                    itemSelected == 'Visitante' ? 'default' : 'numeric'
                  }
                />
                <MenuPopUp
                  ref={refMenuBotom}
                  btnVisible={true}
                  containerStyle={styles.menuPopUpStyleSearch}
                  btnLabels={['Visitante', 'Documento']}
                  showItemSelected={true}
                  ItemSelected={itemSelected}
                  onpress={label =>
                    setItemSelected(
                      label === 'Visitante' ? 'Visitante' : 'Documento',
                    )
                  }
                />
              </View>
              {listFilter && listFilter.length > 0 && (
                <View style={{ top: RFPercentage(-3) }}>
                  <CardSimples
                    styleCardContainer={styles.containerAutoComplete}>
                    <FlatList
                      style={styles.AutoComplete}
                      data={SearchItemCallback()}
                      renderItem={({ item }) => <RenderItem item={item} />}
                      keyExtractor={(item, index) => index.toString()}
                    //ListEmptyComponent={renderEmpty}
                    //ListFooterComponent={renderFooter}
                    //onEndReachedThreshold={0.1}
                    //onEndReached={() => searchMedicamentos(inputValue, true)}
                    />
                  </CardSimples>
                </View>
              )}
            </View>

            <View style={[styles.box2, state.dataSource && { opacity: 0.5 }]}>
              <View>
                <Text style={styles.title}>Dados Pessoais</Text>
                <InputStandard
                  error={
                    errors.Cliente && touched.Cliente
                      ? errors.Cliente
                      : undefined
                  }
                  placeholder={'Nome completo'}
                  style={styles.inputText}
                  activeColor={theme.colors.TEXT_PRIMARY}
                  fontSize={theme.typography.SIZE.fontysize16}
                  fontColor={theme.colors.TEXT_SECONDARY}
                  onChangeText={item => {
                    setFieldValue('Cliente', item);
                  }}
                  onEndEditing={() => {
                    setTouched({ ...touched, ['Cliente']: true });
                  }}
                  value={values.Cliente}
                />
              </View>

              <View style={styles.boxInput}>
                <InputStandard
                  error={
                    errors.Prestador && touched.Prestador
                      ? errors.Prestador
                      : undefined
                  }
                  placeholder={'Prestador'}
                  style={styles.inputText}
                  activeColor={theme.colors.TEXT_PRIMARY}
                  fontSize={theme.typography.SIZE.fontysize16}
                  fontColor={theme.colors.TEXT_SECONDARY}
                  keyboardType={'name-phone-pad'}
                  onChangeText={item => {
                    setFieldValue('Prestador', item);
                  }}
                  onEndEditing={() => {
                    setTouched({
                      ...touched,
                      ['Prestador']: true,
                    });
                  }}
                  value={values.Prestador}
                />
              </View>

              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <Checkbox
                    isChecked={refSelected.current === 'CPF'}
                    text="CPF"
                    onPress={(isChecked, text) => {
                      setFieldValue('tipo_documento', text);
                      if (text === 'CPF' || text === 'RG') {
                        refSelected.current = text;
                      }
                    }}
                  />
                  <Checkbox
                    isChecked={refSelected.current === 'RG'}
                    text="RG"
                    onPress={(isChecked, text) => {
                      setFieldValue('tipo_documento', text);
                      if (text === 'CPF' || text === 'RG') {
                        refSelected.current = text;
                      }
                    }}
                  />
                </View>
                {refSelected.current === 'CPF' && (
                  <InputStandard
                    error={
                      errors.Documento && touched.Documento
                        ? errors.Documento
                        : undefined
                    }
                    placeholder={'Digite o CPF'}
                    style={styles.inputText}
                    activeColor={theme.colors.TEXT_PRIMARY}
                    fontSize={theme.typography.SIZE.fontysize16}
                    fontColor={theme.colors.TEXT_SECONDARY}
                    onChangeText={e => {
                      setFieldValue('Documento', cpfMask(e), true);
                      //setFieldValue('RG', '');
                    }}
                    keyboardType={'numeric'}
                    onEndEditing={() => {
                      setTouched({
                        ...touched,
                        ['Documento']: true,
                      });
                    }}
                    value={values?.Documento}
                  />
                )}
                {refSelected.current === 'RG' && (
                  <InputStandard
                    error={
                      errors.Documento && touched.Documento
                        ? errors.Documento
                        : undefined
                    }
                    placeholder={'Digite o RG'}
                    style={styles.inputText}
                    activeColor={theme.colors.TEXT_PRIMARY}
                    fontSize={theme.typography.SIZE.fontysize16}
                    fontColor={theme.colors.TEXT_SECONDARY}
                    onChangeText={e => {
                      setFieldValue('Documento', e, true);
                      //setFieldValue('CPF', '');
                    }}
                    keyboardType={'numeric'}
                    onEndEditing={() => {
                      setTouched({
                        ...touched,
                        ['Documento']: false,
                      });
                    }}
                    value={values?.Documento}
                  />
                )}
              </View>

              <View style={{ margin: RFPercentage(2) }}>
                <SelectedDropdown
                  data={RefactoryPerfisData()}
                  onChange={({ value }) => setFieldValue('Destino', value)}
                  value={{
                    index: values.Destino.cD_SETOR_ATENDIMENTO,
                    label: values.Destino.dS_SETOR_ATENDIMENTO,
                    value: values.Destino,
                  }}
                  placeholder={'Selecione o destino'}
                />
                {errors.Destino && (
                  <Text style={styles.error}>Destino é obrigratório!</Text>
                )}
              </View>

              <View style={styles.btnContainer}>
                <BtnCentered
                  SizeText={18}
                  labelBtn={'Adicionar'}
                  onPress={() => handleSubmit()}
                  enabled={true}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
      <Loading ref={refModalLoading} />
    </View>
  );
};

export default CirculacaoInterna;

const createStyle = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND_2,
    },
    containerForm: {
      flex: 1,
      margin: RFPercentage(1),
      padding: RFPercentage(2),
      backgroundColor: theme.colors.BACKGROUND_1,
      borderRadius: 10,
    },
    box1: {
      // flex: 1,
      // width: Dimensions.get('screen').width,
      // paddingVertical: 10,
      // backgroundColor: theme.colors.BACKGROUND_2,
    },
    box2: {},
    containerAutoComplete: {
      //flex: 1,
      flexDirection: 'row',
      alignSelf: 'center',
      backgroundColor: theme.colors.BACKGROUND_1,
      borderRadius: 2,
      position: 'absolute',
      width: '85%',
      zIndex: 1,
      maxHeight: RFPercentage(60),
    },
    AutoComplete: {
      padding: 10,
    },
    item: {
      flex: 1,
      marginBottom: 10,
    },
    titleAutoComlete: {
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_PRIMARY,
      fontSize: theme.typography.SIZE.fontysize14,
    },
    descricao: {
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_SECONDARY,
      fontSize: theme.typography.SIZE.fontysize12,
    },
    title: {
      fontFamily: theme.typography.FONTES.Bold,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_SECONDARY,
      fontSize: theme.typography.SIZE.fontysize16,
      textAlign: 'center',
    },
    inputText: {
      marginVertical: RFPercentage(2),
      fontFamily: theme.typography.FONTES.Bold,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_SECONDARY,
      fontSize: theme.typography.SIZE.fontysize18,
    },
    boxInput: {
      //flex: 1,
      //flexDirection: 'row',
      //justifyContent: 'space-between',
    },
    inputTextRow: {
      width: (Dimensions.get('screen').width / 100) * 40,
      paddingHorizontal: RFPercentage(1),
      marginVertical: RFPercentage(2),
      fontFamily: theme.typography.FONTES.Bold,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_SECONDARY,
      fontSize: theme.typography.SIZE.fontysize16,
    },
    SelectedDropdown: {
      width: (Dimensions.get('screen').width / 10) * 4,
      backgroundColor: theme.colors.BACKGROUND_1,
    },
    btnContainer: {
      width: '100%',
      marginTop: RFPercentage(2),
      alignSelf: 'flex-end',
      height: RFPercentage(10),
    },
    boxSelect: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    menuPopUpStyleSearch: {
      position: 'absolute',
      alignSelf: 'auto',
      right: 0,
    },
    error: {
      color: 'red',
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      fontSize: theme.typography.SIZE.fontysize10,
    },
  });
  return styles;
};
