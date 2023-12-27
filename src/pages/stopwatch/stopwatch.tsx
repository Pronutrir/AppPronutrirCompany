import {
  Dimensions,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { useNavigation } from '@react-navigation/native';
import { useListStopwatch } from '../../hooks/useStopwatch';
import CardSimples from '../../components/Cards/CardSimples';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ShimerPlaceHolderMenuStopWacth from '../../components/shimmerPlaceHolder/shimerPlaceHolderMenuStopWacth';

const Stopwatch = () => {
  const styles = useThemeAwareObject(createStyles);
  const navigation = useNavigation();

  const { data } = useListStopwatch(7);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.box1}>
        {data ? (
          <CardSimples>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: RFPercentage(2),
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('StopwatchFilter', {
                    listFilter: data?.agendados.listAgendaQuimioterapia,
                    title: 'Check-in',
                  })
                }
                style={styles.btnItemMenu}>
                <Text style={styles.text_btnHorizontal}>Agenda</Text>
                <Text style={styles.textNum_btnHorizontal}>
                  {data?.agendados?.count}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('StopwatchFilter', {
                    listFilter: data?.agendados.listAgendaQuimioterapia,
                    title: 'Check-in',
                  })
                }
                style={styles.btnItemMenu}>
                <Text style={styles.text_btnHorizontal}>Check-in</Text>
                <Text style={styles.textNum_btnHorizontal}>
                  {data?.durationPatients?.count}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('StopwatchFilter', {
                    listFilter: data?.durationPatients.patients.filter(
                      item => item.dT_ALTA != null,
                    ),
                  })
                }
                style={styles.btnItemMenu}>
                <Text style={styles.text_btnHorizontal}>Altas</Text>
                <Text style={styles.textNum_btnHorizontal}>
                  {
                    data?.durationPatients?.patients.filter(
                      item => item.dT_ALTA != null,
                    ).length
                  }
                </Text>
              </TouchableOpacity>
            </View>
          </CardSimples>
        ) : (
          <CardSimples>
            <>{Array(2).fill(<ShimerPlaceHolderMenuStopWacth />)}</>
          </CardSimples>
        )}
      </View>

      {data ? (
        <View style={styles.box2}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('StopwatchFilter', {
                listFilter: data?.recepcao.patients,
                title: 'Recepção',
                filterParam: 'margeM_RE',
                setor: 'Recepcao',
              })
            }
            style={styles.btnItem}>
            <Text style={styles.text_btnHorizontal}>Recepção</Text>
            <Text style={styles.textNum_btnHorizontal}>
              {data?.recepcao?.count}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('StopwatchFilter', {
                listFilter: data?.triagem.patients,
                title: 'Triagem',
                filterParam: 'margeM_TR',
                setor: 'Triagem',
              })
            }
            style={styles.btnItem}>
            <Text style={styles.text_btnHorizontal}>Triagem</Text>
            <Text style={styles.textNum_btnHorizontal}>
              {data?.triagem?.count}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('StopwatchFilter', {
                listFilter: data?.farmacia.satelite.patients,
                title: 'Fámacia Satelite',
                filterParam: 'margeM_FA_SAT_TT',
                setor: 'FarmaciaSat',
              })
            }
            style={styles.btnItem}>
            <Text style={styles.text_btnHorizontal}>Fámacia Satelite</Text>
            <Text style={styles.textNum_btnHorizontal}>
              {data?.farmacia?.satelite?.count}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('StopwatchFilter', {
                listFilter: data?.farmacia.producao.patients,
                title: 'Farmácia Produção',
                filterParam: 'margeM_FA_TT',
                setor: 'Farmacia',
              })
            }
            style={styles.btnItem}>
            <Text style={styles.text_btnHorizontal}>Farmácia Produção</Text>
            <Text style={styles.textNum_btnHorizontal}>
              {data?.farmacia?.producao?.count}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('StopwatchFilter', {
                listFilter: data?.pre_Tratamento.patients,
                title: 'Pré Tratamento',
                filterParam: 'margeM_PRE_TT',
                setor: 'PreTratamento',
              })
            }
            style={styles.btnItem}>
            <Text style={styles.text_btnHorizontal}>Pré Tratamento</Text>
            <Text style={styles.textNum_btnHorizontal}>
              {data?.pre_Tratamento?.count}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('StopwatchFilter', {
                listFilter: data?.tratamento.patients,
                title: 'Tratamento',
                filterParam: 'margeM_TT',
                setor: 'Tratamento',
              })
            }
            style={styles.btnItem}>
            <Text style={styles.text_btnHorizontal}>Tratamento</Text>
            <Text style={styles.textNum_btnHorizontal}>
              {data?.tratamento?.count}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.box2}>
          {Array(6).fill(<ShimerPlaceHolderMenuStopWacth />)}
        </View>
      )}
    </ScrollView>
  );
};

export default Stopwatch;

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND_2,
    },
    box1: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
    box2: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
    btnItemMenu: {
      width: Dimensions.get('screen').width / 3.5,
      height: RFPercentage(13),
      backgroundColor: theme.colors.BUTTON_SECUNDARY,
      marginVertical: RFPercentage(1),
      padding: RFPercentage(0.5),
      borderRadius: 10,
      justifyContent: 'space-around',
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.2,
          shadowRadius: 6,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    btnItem: {
      width: Dimensions.get('screen').width / 2.3,
      height: RFPercentage(13),
      backgroundColor: theme.colors.BUTTON_SECUNDARY,
      marginVertical: RFPercentage(1),
      padding: PixelRatio.get() < 2 ? 10 : 15,
      borderRadius: 10,
      justifyContent: 'space-around',
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.2,
          shadowRadius: 6,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    text_btnHorizontal: {
      fontSize: theme.typography.SIZE.fontysize14,
      fontFamily: theme.typography.FONTES.Black,
      letterSpacing: theme.typography.LETTERSPACING.L,
      color: theme.colors.TEXT_TERTIARY,
      textAlign: 'center',
    },
    textNum_btnHorizontal: {
      fontSize: theme.typography.SIZE.fontysize16,
      fontFamily: theme.typography.FONTES.Black,
      letterSpacing: theme.typography.LETTERSPACING.L,
      color: theme.colors.TEXT_TERTIARY,
      textAlign: 'center',
    },
  });
  return styles;
};
