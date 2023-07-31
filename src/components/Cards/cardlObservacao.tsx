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
import React, { useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import BtnCentered from '../buttons/BtnCentered';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';
interface Props {
  observacao: string;
  onpress(value: string): void;
}

const CardObservacao: React.FC<Props> = ({ observacao, onpress }: Props) => {
  const styles = useThemeAwareObject(createStyle);
  const [text, setText] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={
        Platform.OS === 'ios'
          ? Dimensions.get('screen').height / 4
          : Dimensions.get('screen').height / 4
      }>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerReacao}>
          <View>
            {/* <ReacoesSvg fill={'#A3ABAB'} width={40} height={40} /> */}
          </View>
          <View>
            <Text style={styles.textMsn}>
              Descreva aqui as suas observações!
            </Text>
            <TextInput
              //ref={refInput}
              style={styles.inputModal}
              placeholder={'Descreva suas observações'}
              textAlignVertical={'top'}
              multiline
              numberOfLines={6}
              maxLength={300}
              value={observacao}
              onChangeText={text => setText(text)}
              keyboardType={'default'}
              //autoFocus={true}
              editable={true}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <BtnCentered
              SizeText={18}
              labelBtn={'Ok'}
              onPress={() => onpress(text)}
            />
          </View>
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
      textAlign: 'center',
      margin: 10,
    },
    textTitulo: {
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_PRIMARY,
      fontSize: theme.typography.SIZE.fontysize16,
      margin: 10,
    },
    inputModal: {
      height: RFPercentage(20),
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
