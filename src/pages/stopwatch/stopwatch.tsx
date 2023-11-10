import {
  Dimensions,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import React from 'react';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { useNavigation } from '@react-navigation/native';
import { useListStopwatch } from '../../hooks/useStopwatch';
import CardSimples from '../../components/Cards/CardSimples';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Stopwatch = () => {
  const styles = useThemeAwareObject(createStyles);
  const navigation = useNavigation();

  const { data } = useListStopwatch();

  console.log(Object.getOwnPropertyNames(data?.result));

  const propsobject = Object.getOwnPropertyNames(data?.result).map(item => {
    if (data) {
      type ObjectKey = keyof typeof data.result;

      const myVar = item as ObjectKey;

      switch (item) {
        case 'agendados':
          return data.result.agendados;
        case 'agendado':
          return data.result.agendados;
        case 'agendad':
          return data.result.agendados;
        default:
          return data.result[myVar];
          break;
      }
    } else {
      return;
    }
  });

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.box1}>
          <CardSimples>
            <>
              {propsobject?.map(item => {
                <CardSimples styleCardContainer={styles.ItemMenu}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.text_btnHorizontal}>
                      Total de agendados
                    </Text>
                    <View>
                      <Text style={styles.text_btnHorizontal}>
                        {data?.result.agendados.length}
                      </Text>
                    </View>
                  </View>
                </CardSimples>;
              })}

              <CardSimples styleCardContainer={styles.ItemMenu}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.text_btnHorizontal}>
                    Total de Check-in
                  </Text>
                  <View>
                    <Text style={styles.text_btnHorizontal}>
                      {data?.result.total}
                    </Text>
                  </View>
                </View>
              </CardSimples>
              <CardSimples styleCardContainer={styles.ItemMenu}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.text_btnHorizontal}>Total de Altas</Text>
                  <View>
                    <Text style={styles.text_btnHorizontal}>
                      {
                        data?.result.durationPatients.values.filter(
                          item => item.duration != null,
                        ).length
                      }
                    </Text>
                  </View>
                </View>
              </CardSimples>
            </>
          </CardSimples>
          <CardSimples styleCardContainer={styles.btnItem}>
            <View>
              <Text style={styles.text_btnHorizontal}>Total Recepção</Text>
              <View>
                <Text style={styles.text_btnHorizontal}>
                  {data?.result.recepcao.count}
                </Text>
              </View>
            </View>
          </CardSimples>
          <CardSimples styleCardContainer={styles.btnItem}>
            <View>
              <Text style={styles.text_btnHorizontal}>Total Triagem</Text>
              <View>
                <Text style={styles.text_btnHorizontal}>
                  {data?.result.triagem.count}
                </Text>
              </View>
            </View>
          </CardSimples>
          <CardSimples styleCardContainer={styles.btnItem}>
            <View>
              <Text style={styles.text_btnHorizontal}>Total Satelite</Text>
              <View>
                <Text style={styles.text_btnHorizontal}>
                  {data?.result.farmacia.satelite.count}
                </Text>
              </View>
            </View>
          </CardSimples>
          <CardSimples styleCardContainer={styles.btnItem}>
            <View>
              <Text style={styles.text_btnHorizontal}>Total Produção</Text>
              <View>
                <Text style={styles.text_btnHorizontal}>
                  {data?.result.farmacia.producao.count}
                </Text>
              </View>
            </View>
          </CardSimples>
          <CardSimples styleCardContainer={styles.btnItem}>
            <View>
              <Text style={styles.text_btnHorizontal}>Total Acomodação</Text>
              <View>
                <Text style={styles.text_btnHorizontal}>
                  {data?.result.acomodacao.count}
                </Text>
              </View>
            </View>
          </CardSimples>
          <CardSimples styleCardContainer={styles.btnItem}>
            <View>
              <Text style={styles.text_btnHorizontal}>Total Tratamento</Text>
              <View>
                <Text style={styles.text_btnHorizontal}>
                  {data?.result.tratamento.count}
                </Text>
              </View>
            </View>
          </CardSimples>
        </View>
      </ScrollView>
    </View>
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
    btnItem: {
      width: Dimensions.get('screen').width / 3.4,
      height: RFPercentage(13),
      backgroundColor: theme.colors.BACKGROUND_1,
      marginVertical: 5,
      paddingVertical: PixelRatio.get() < 2 ? 10 : 15,
      borderRadius: 10,
      justifyContent: 'center',
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
    ItemMenu: {
      width: Dimensions.get('screen').width / 3.5,
      height: RFPercentage(13),
      backgroundColor: theme.colors.BACKGROUND_1,
      paddingVertical: PixelRatio.get() < 2 ? 10 : 15,
      borderRadius: 10,
      justifyContent: 'center',
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
      fontSize: theme.typography.SIZE.fontysize12,
      fontFamily: theme.typography.FONTES.Light,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_SECONDARY,
      textAlign: 'center',
    },
  });
  return styles;
};
