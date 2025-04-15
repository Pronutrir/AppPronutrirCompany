import { StyleSheet, View, Dimensions, Switch } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import SlideRanger from '../../../../components/Slider/SlideRanger';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ToggleSwitch from '../../../../components/Switch/ToggleSwitch';
import { ScrollView } from 'react-native-gesture-handler';
import { IRegraSinaisVitais, useGetRegraSinaisVitais } from '../../../../hooks/useSinaisVitais';
import ModalCentralizedOptions, { ModalHandles as ModalHandlesOptions } from '../../../../components/Modais/ModalCentralizedOptions';
import { useQueryClient } from 'react-query';
import SinaisVitaisContext from '../../../../contexts/sinaisVitaisContext';

interface PropsAntropometria {
  Altura: number;
  setAltura(qT_ALTURA_CM: number): void;
  Peso: number;
  setPeso(item: number): void;
  Temperatura: number;
  setTemperatura(item: number): void;
  Oxigigenacao: number;
  setOxigigenacao(item: number): void;
  enviarAlertaAviso: (msn: string, tipo: 'Altura' | 'Peso') => void;
  enviarAlertaBloqueio: (msn: string, tipo: 'Altura' | 'Peso') => void;
}

const OptionAntropometria = ({
  Altura,
  setAltura,
  Peso,
  setPeso,
  Temperatura,
  setTemperatura,
  Oxigigenacao,
  setOxigigenacao,
  enviarAlertaAviso,
  enviarAlertaBloqueio,
}: PropsAntropometria) => {

  const [toggleSwitch, setToggleSwitch] = useState(true);

  const { ValidationAutorizeEnfermagem } =
    useContext(SinaisVitaisContext);

  const queryClient = useQueryClient();

  const resultAltura = queryClient.getQueryData<IRegraSinaisVitais[]>('RegraSinaisVitais')?.filter(item => item.nM_ATRIBUTO == 'QT_ALTURA_CM') ?? [];
  const resultPeso = queryClient.getQueryData<IRegraSinaisVitais[]>('RegraSinaisVitais')?.filter(item => item.nM_ATRIBUTO == 'QT_PESO') ?? [];

  const [alturaMinimaAviso] = useState<number>(resultAltura.length > 0 ? resultAltura?.filter(item => item.nM_ATRIBUTO == 'QT_ALTURA_CM')[0].qT_MIN_AVISO : 0);
  const [alturaMaximaAviso] = useState<number>(resultAltura.length > 0 ? resultAltura?.filter(item => item.nM_ATRIBUTO == 'QT_ALTURA_CM')[0].qT_MAX_AVISO : 0);
  const [alturaMimimaBloqueio] = useState<number>(resultAltura.length > 0 ? resultAltura?.filter(item => item.nM_ATRIBUTO == 'QT_ALTURA_CM')[0].qT_MINIMO : 0);
  const [alturaMaximaBloqueio] = useState<number>(resultAltura.length > 0 ? resultAltura?.filter(item => item.nM_ATRIBUTO == 'QT_ALTURA_CM')[0].vL_MAXIMO : 0);

  const [pesoMinimoAviso] = useState<number>(resultPeso.length > 0 ? resultPeso?.filter(item => item.nM_ATRIBUTO == 'QT_PESO')[0].qT_MIN_AVISO : 0);
  const [pesoMaximaAviso] = useState<number>(resultPeso.length > 0 ? resultPeso?.filter(item => item.nM_ATRIBUTO == 'QT_PESO')[0].qT_MAX_AVISO : 0);
  const [pesoMinimoBloqueio] = useState<number>(resultPeso.length > 0 ? resultPeso?.filter(item => item.nM_ATRIBUTO == 'QT_PESO')[0].qT_MINIMO : 0);
  const [pesoMaximaBloqueio] = useState<number>(resultPeso.length > 0 ? resultPeso?.filter(item => item.nM_ATRIBUTO == 'QT_PESO')[0].vL_MAXIMO : 0);

  const ValidationAltura = (value: number) => {
    setAltura(value);
    if (value < alturaMimimaBloqueio || value > alturaMaximaBloqueio) {
      enviarAlertaBloqueio(resultAltura?.filter(item => item.nM_ATRIBUTO == 'QT_ALTURA_CM')[0].dS_MENSAGEM_BLOQUEIO, 'Altura');
      return;
    }

    if (value < alturaMinimaAviso || value > alturaMaximaAviso) {
      enviarAlertaAviso(resultAltura?.filter(item => item.nM_ATRIBUTO == 'QT_ALTURA_CM')[0].dS_MENSAGEM_ALERTA, 'Altura');
      return;
    }
  }

  const ValidationPeso = (value: number) => {
    setPeso(value);
    if (value < pesoMinimoBloqueio || value > pesoMaximaBloqueio) {
      enviarAlertaBloqueio(resultPeso?.filter(item => item.nM_ATRIBUTO == 'QT_PESO')[0].dS_MENSAGEM_BLOQUEIO, 'Peso');
      return;
    }

    if (value < pesoMinimoAviso || value > pesoMaximaAviso) {
      enviarAlertaAviso(resultPeso?.filter(item => item.nM_ATRIBUTO == 'QT_PESO')[0].dS_MENSAGEM_ALERTA, 'Peso');
      return;
    }
  }

  if (ValidationAutorizeEnfermagem()) {
    return (
      <View style={styles.container}>
        <View style={styles.ToggleSwitch}>
        </View>
        <ScrollView>
          <SlideRanger
            label={'Temperatura'}
            medida={'°C'}
            step={0.1}
            valueMin={30}
            valueMax={42}
            valueRanger={Temperatura}
            setValueRanger={value => setTemperatura(value)}
            disabled={toggleSwitch}
          />
          <SlideRanger
            label={'Oximetria'}
            medida={'%'}
            step={1}
            valueMin={50}
            valueMax={100}
            valueRanger={Oxigigenacao}
            setValueRanger={value => setOxigigenacao(value)}
            disabled={toggleSwitch}
          />
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.ToggleSwitch}>
        </View>
        <ScrollView>
          <SlideRanger
            label={'Altura'}
            medida={'cm'}
            step={1}
            valueMin={0}
            valueMax={300}
            valueRanger={Altura}
            setValueRanger={value => ValidationAltura(value)}
            disabled={toggleSwitch}
          />
          <SlideRanger
            label={'Peso'}
            medida={'kg'}
            step={0.1}
            valueMin={0}
            valueMax={200}
            valueRanger={Peso}
            setValueRanger={value => ValidationPeso(value)}
            disabled={toggleSwitch}
          />
          <SlideRanger
            label={'Temperatura'}
            medida={'°C'}
            step={0.1}
            valueMin={30}
            valueMax={42}
            valueRanger={Temperatura}
            setValueRanger={value => setTemperatura(value)}
            disabled={toggleSwitch}
          />
          <SlideRanger
            label={'Oximetria'}
            medida={'%'}
            step={1}
            valueMin={50}
            valueMax={100}
            valueRanger={Oxigigenacao}
            setValueRanger={value => setOxigigenacao(value)}
            disabled={toggleSwitch}
          />
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
    //height: Dimensions.get('screen').height,
    //paddingHorizontal: RFPercentage(2),
    marginTop: RFPercentage(1),
  },
  ToggleSwitch: {
    marginVertical: RFPercentage(1),
    marginHorizontal: RFPercentage(2),
  },
});

export default React.memo(OptionAntropometria);
