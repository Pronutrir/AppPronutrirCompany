import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import BtnCentered from '../../components/buttons/BtnCentered';
import SelectedDropdownOptions from '../../components/selectedDropdown/SelectedDropdownOptions';
import { useListStopwatchDefaultMsn } from '../../hooks/useStopwatch';
import ShimerPlaceHolderSelected from '../../components/shimmerPlaceHolder/shimerPlaceHolderSelected';

export interface IMotivoAtraso {
  title: string;
  observacao: string;
}

interface Props {
  Motivo: IMotivoAtraso | undefined;
  setMotivoAtraso: React.Dispatch<React.SetStateAction<IMotivoAtraso>>;
  setor: string;
  disable: boolean;
  onpress(): void;
}

const CardObservacao: React.FC<Props> = ({
  Motivo,
  setMotivoAtraso,
  setor,
  disable,
  onpress,
}: Props) => {
  const styles = useThemeAwareObject(createStyle);

  const { data: motivosPadroes } = useListStopwatchDefaultMsn(setor);

  console.log('Motivo', Motivo);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={
        Platform.OS === 'ios'
          ? Dimensions.get('screen').height / 5
          : Dimensions.get('screen').height / 5
      }>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerReacao}>
          {disable && (
            <View style={{ alignItems: 'center' }}>
              {motivosPadroes ? (
                <SelectedDropdownOptions
                  defaultButtonText="Motivos padrões"
                  data={motivosPadroes?.map((item, index) => {
                    return { index: index, label: item.title, value: item };
                  })}
                  onChange={item =>
                    setMotivoAtraso({
                      observacao: item.value.body,
                      title: item.label,
                    })
                  }
                />
              ) : (
                <ShimerPlaceHolderSelected />
              )}
            </View>
          )}

          <View>
            <Text style={styles.textMsn}>Motivo do atraso.</Text>
            <TextInput
              style={styles.inputModalTitle}
              placeholder={'Digite o Motivo do atraso.'}
              textAlignVertical={'top'}
              multiline
              numberOfLines={2}
              maxLength={50}
              value={Motivo?.title}
              onChangeText={text =>
                setMotivoAtraso(old => {
                  return { ...old, title: text };
                })
              }
              keyboardType={'default'}
              editable={true}
            />
          </View>
          <View>
            <Text style={styles.textMsn}>Observações!</Text>
            <TextInput
              style={styles.inputModal}
              placeholder={'Descrição do motivo do atraso'}
              textAlignVertical={'top'}
              multiline
              numberOfLines={6}
              maxLength={300}
              value={Motivo?.observacao}
              onChangeText={text =>
                setMotivoAtraso(old => {
                  return { ...old, observacao: text };
                })
              }
              keyboardType={'default'}
              editable={true}
            />
          </View>
          {disable && (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <BtnCentered
                SizeText={18}
                labelBtn={'Ok'}
                onPress={() => onpress()}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CardObservacao;

const createStyle = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    containerReacao: {
      width: (Dimensions.get('screen').width / 100) * 80,
      padding: 20,
    },
    textMsn: {
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_PRIMARY,
      fontSize: theme.typography.SIZE.fontysize16,
      textAlign: 'left',
      margin: 10,
    },
    textTitulo: {
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_PRIMARY,
      fontSize: theme.typography.SIZE.fontysize16,
      margin: 10,
    },
    inputModalTitle: {
      height: RFPercentage(5),
      padding: 10,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#6bbfb9',
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_SECONDARY,
      fontSize: theme.typography.SIZE.fontysize14,
      textAlign: 'left',
    },
    inputModal: {
      height: RFPercentage(8),
      padding: 10,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#6bbfb9',
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_SECONDARY,
      fontSize: theme.typography.SIZE.fontysize14,
      textAlign: 'left',
    },
  });
  return styles;
};
