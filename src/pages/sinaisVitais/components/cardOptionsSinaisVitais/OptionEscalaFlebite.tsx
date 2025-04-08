import { StyleSheet, View, Dimensions, Text } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
import SelectedDropdownOptions from '../../../../components/selectedDropdown/SelectedDropdownOptions';
import BtnCentered from '../../../../components/buttons/BtnCentered';
import { useScalaFlebitePost } from '../../../../hooks/useSinaisVitais';
import AuthContext from '../../../../contexts/auth';
import { IPFSinaisVitais } from '../../../../contexts/sinaisVitaisContext';
import moment from 'moment';
import Loading, { LoadHandles } from '../../../../components/Loading/Loading';

interface IPropsFlebite {
  nR_ATENDIMENTO: number;
}

interface Props {
  index: number;
  label: string;
  value: string;
}

const options: Props[] = [
  {
    index: 0,
    label: '0',
    value: 'Ausência de reação. (0)',
  },
  {
    index: 1,
    label: '1+',
    value: 'Sensibilidade ao toque sobre a porção IV da cânula. (1+)',
  },
  {
    index: 2,
    label: '2+',
    value: 'Dor contínua sem eritema (2+)',
  },
  {
    index: 3,
    label: '3+',
    value:
      'Dor contínua, com eritema e edema, veia endurecida palpável a menos de 8 cm do local IV (cânula). (3+)',
  },
  {
    index: 4,
    label: '4+',
    value:
      'Dor contínua, com eritema e edema, veia endurecida palpável a mais de 8 cm do local IV (cânula). (4+)',
  },
  {
    index: 5,
    label: '5+',
    value:
      'Trombose venosa aparente. Todos os sinais de 4+, mais fluxo venoso = 0, pode ter sido interrompido devido a trombose. (5+)',
  },
];

const OptionEscalaFlebite = ({ nR_ATENDIMENTO }: IPropsFlebite) => {
  const {
    stateAuth: { usertasy, PerfilSelected },
  } = useContext(AuthContext);

  const styles = useThemeAwareObject(createStyle);

  const { mutateAsync } = useScalaFlebitePost();

  const [value, setValue] = useState<Props | null>(null);

  const loadingRef = useRef<LoadHandles>(null);

  const AddEscalaFlebite = async () => {
    loadingRef.current?.openModal();
    if (value) {
      try {
        await mutateAsync({
          cD_PROFISSIONAL: usertasy.cD_PESSOA_FISICA,
          dT_ATUALIZACAO: moment().format('YYYY-MM-DD'),
          dT_ATUALIZACAO_NREC: moment().format('YYYY-MM-DD'),
          dT_AVALIACAO: moment().format('YYYY-MM-DD'),
          iE_INTENSIDADE: value?.label,
          iE_SITUACAO: 'A',
          nM_USUARIO: PerfilSelected?.nM_USUARIO ?? 'AppMobile',
          nM_USUARIO_NREC: PerfilSelected?.nM_USUARIO ?? 'AppMobile',
          nR_ATENDIMENTO: nR_ATENDIMENTO,
        });
        setValue(null);
        loadingRef.current?.closeModal();
      } catch (error) {
        loadingRef.current?.closeModal();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <SelectedDropdownOptions
          data={options}
          onChange={item => setValue(item)}
          defaultButtonText="Sinais e Sintomas"
        />
        <Text style={styles.textstyle}>
          {value?.value ?? 'Nenhuma Opção selecionada!'}
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {value && (
          <BtnCentered
            SizeText={18}
            labelBtn={'Adicionar'}
            onPress={() => AddEscalaFlebite()}
            enabled={true}
          />
        )}
      </View>
      <Loading ref={loadingRef} />
    </View>
  );
};

const createStyle = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    container: {
      width: Dimensions.get('screen').width - RFPercentage(5),
      justifyContent: 'space-around',
      margin: RFPercentage(1),
    },
    textstyle: {
      alignSelf: 'center',
      padding: 10,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#6bbfb9',
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_SECONDARY,
      fontSize: theme.typography.SIZE.fontysize14,
      textAlign: 'justify',
    },
  });
  return styles;
};

export default React.memo(OptionEscalaFlebite);
