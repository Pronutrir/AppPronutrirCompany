import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import { ThemeContextData } from '../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import ShimerPlaceHolderSelected from '../../../components/shimmerPlaceHolder/shimerPlaceHolderSelected';
import {
  IAtendimentosAptosEnfermagem,
  IPropsAcomodacao,
  UseListLocalAcomodacao,
  useDefinicaoAcomodacao,
  useGetAtendimentosAptosEnfermagem,
} from '../../../hooks/useAtendimento';
import SelectedDropdown from '../../../components/selectedDropdown/SelectedDropdown';
import ModalCentralizedOptions, {
  ModalHandles,
} from '../../../components/Modais/ModalCentralizedOptions';
import Loading, { LoadHandles } from '../../../components/Loading/Loading';
import AuthContext from '../../../contexts/auth';
import moment from 'moment';

export interface IMotivoAtraso {
  title: string;
  observacao: string;
}

interface Props {
  item: IAtendimentosAptosEnfermagem;
  refmodalObservacoes: React.RefObject<ModalHandles>;
}

const CardObservacao: React.FC<Props> = ({
  item,
  refmodalObservacoes,
}: Props) => {
  const styles = useThemeAwareObject(createStyle);

  const { stateAuth } = useContext(AuthContext);
  const { refetch } = useGetAtendimentosAptosEnfermagem();

  const refModalEntregaPreMedicamento = useRef<ModalHandles>(null);
  const loadingRef = useRef<LoadHandles>(null);

  const [selectedItem, setSelectedItem] = useState<IPropsAcomodacao>();

  const { data } = UseListLocalAcomodacao();

  const { mutateAsync } = useDefinicaoAcomodacao();

  const DefinirAcomodação = async () => {
    try {
      if (selectedItem && stateAuth.UnidadeSelected) {
        loadingRef.current?.openModal();
        await mutateAsync({
          CD_ACOMODACAO_P: selectedItem.nR_SEQUENCIA,
          CD_ESTABELECIMENTO_P: stateAuth.UnidadeSelected?.cD_ESTABELECIMENTO,
          NM_USUARIO_P: stateAuth.PerfilSelected?.nM_USUARIO ?? 'AppMobile',
          NR_SEQ_ATENDIMENTO_P: item.nR_SEQ_ATENDIMENTO,
          NR_SEQ_PACIENTE_P: item.nR_SEQ_PACIENTE,
          DT_ACOMODACAO_P:
            item.dT_ACOMODACAO_PACIENTE ??
            moment().format('YYYY-MM-DD HH:mm:ss'),
          DT_PREVISTA_P: item.dT_REAL,
          DT_REAL_P: item.dT_REAL,
        });
        loadingRef.current?.closeModal();
        refModalEntregaPreMedicamento.current?.closeModal();
        refmodalObservacoes.current?.closeModal();
        refetch();
      }
    } catch (error) {
      loadingRef.current?.closeModal();
      refModalEntregaPreMedicamento.current?.closeModal();
      refmodalObservacoes.current?.closeModal();
    }
  };

  return (
    <View style={styles.containerReacao}>
      {data ? (
        <SelectedDropdown
          placeholder="Acomodação"
          value={item.dS_ACOMODACAO}
          data={data?.map((item, index) => {
            return { index: index, label: item.dS_LOCAL, value: item };
          })}
          onChange={item => {
            setSelectedItem(item.value),
              refModalEntregaPreMedicamento.current?.openModal();
          }}
        />
      ) : (
        <View style={{ width: '90%' }}>
          <ShimerPlaceHolderSelected />
        </View>
      )}
      <ModalCentralizedOptions
        ref={refModalEntregaPreMedicamento}
        message={`Deseja alterar para a acomodação selecionada ?`}
        onpress={() => DefinirAcomodação()}
      />
      <Loading ref={loadingRef} />
    </View>
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
  });
  return styles;
};
