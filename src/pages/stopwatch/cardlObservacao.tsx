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
import { Formik } from 'formik';
import * as Yup from 'yup';

export interface IMotivoAtraso {
  motivo: string;
  observacao: string;
}

interface Props {
  item: IMotivoAtraso;
  setor: string;
  disable: boolean;
  onpress(item: IMotivoAtraso): void;
}

const CardObservacao: React.FC<Props> = ({
  item,
  setor,
  disable,
  onpress,
}: Props) => {
  const styles = useThemeAwareObject(createStyle);

  const { data: motivosPadroes } = useListStopwatchDefaultMsn(setor);

  const FormSchema = Yup.object().shape({
    motivo: Yup.string().required('Informar motivo do atraso!'),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={
        Platform.OS === 'ios'
          ? Dimensions.get('screen').height / 5
          : Dimensions.get('screen').height / 8
      }>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerReacao}>
          <Formik
            initialValues={item}
            onSubmit={values => {
              console.log(values);
              onpress(values);
            }}
            validationSchema={FormSchema}>
            {({ handleChange, handleSubmit, values, errors, setValues }) => (
              <>
                {disable && (
                  <View style={{ alignItems: 'center' }}>
                    {motivosPadroes ? (
                      <SelectedDropdownOptions
                        defaultButtonText="Motivos padrões"
                        data={motivosPadroes?.map((item, index) => {
                          return {
                            index: index,
                            label: item.title,
                            value: item,
                          };
                        })}
                        onChange={item =>
                          setValues({
                            motivo: item.value.body,
                            observacao: item.label,
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
                    value={values.motivo}
                    onChangeText={handleChange('motivo')}
                    keyboardType={'default'}
                    editable={true}
                  />
                  {errors.motivo && (
                    <Text style={styles.Error}>{errors.motivo}</Text>
                  )}
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
                    value={values.observacao}
                    onChangeText={handleChange('observacao')}
                    keyboardType={'default'}
                    editable={true}
                  />
                </View>
                {disable && (
                  <View
                    style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <BtnCentered
                      SizeText={18}
                      labelBtn={'Ok'}
                      onPress={handleSubmit}
                    />
                  </View>
                )}
              </>
            )}
          </Formik>
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
    Error: {
      color: 'red',
      fontSize: theme.typography.SIZE.fontysize14,
    },
  });
  return styles;
};
