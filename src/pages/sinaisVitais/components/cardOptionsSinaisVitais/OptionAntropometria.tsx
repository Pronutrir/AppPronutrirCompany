import { StyleSheet, View, Dimensions } from 'react-native';
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
  EnviarAlertaPeso(msn: string | undefined): void;
  EnviarAlertaAltura(msn: string | undefined): void;
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
  EnviarAlertaPeso,
  EnviarAlertaAltura,
}: PropsAntropometria) => {
  const [toggleSwitch, setToggleSwitch] = useState(true);

  const { ValidationAutorizeEnfermagem } =
    useContext(SinaisVitaisContext);

  const queryClient = useQueryClient();

  const resultAltura = queryClient.getQueryData<IRegraSinaisVitais[]>('RegraSinaisVitais')?.filter(item => item.nM_ATRIBUTO == 'QT_ALTURA_CM');
  const resultPeso = queryClient.getQueryData<IRegraSinaisVitais[]>('RegraSinaisVitais')?.filter(item => item.nM_ATRIBUTO == 'QT_PESO');

  const [alturaMinima] = useState<number | undefined>(resultAltura?.filter(item => item.nM_ATRIBUTO == 'QT_ALTURA_CM')[0].qT_MINIMO);
  const [alturaMaxima] = useState<number | undefined>(resultAltura?.filter(item => item.nM_ATRIBUTO == 'QT_ALTURA_CM')[0].vL_MAXIMO);

  const [pesoMinima] = useState<number | undefined>(resultPeso?.filter(item => item.nM_ATRIBUTO == 'QT_PESO')[0].qT_MINIMO);
  const [pesoMaxima] = useState<number | undefined>(resultPeso?.filter(item => item.nM_ATRIBUTO == 'QT_PESO')[0].vL_MAXIMO);

  const ValidationAltura = (value: number) => {
    if (alturaMinima && alturaMaxima) {
      if ((value >= alturaMinima && value <= alturaMaxima)) {
        setAltura(value);
      } else {
        setAltura(value);
        EnviarAlertaPeso(resultAltura?.filter(item => item.nM_ATRIBUTO == 'QT_ALTURA_CM')[0].dS_MENSAGEM_ALERTA);
      }
    }
  }

  const ValidationPeso = (value: number) => {
    if (pesoMinima && pesoMaxima) {
      if ((value >= pesoMinima && value <= pesoMaxima)) {
        setPeso(value);
      } else {
        setPeso(value);
        EnviarAlertaAltura(resultAltura?.filter(item => item.nM_ATRIBUTO == 'QT_ALTURA_CM')[0].dS_MENSAGEM_ALERTA);
      }
    }
  }

  if (ValidationAutorizeEnfermagem()) {
    return (
      <View style={styles.container}>
        <View style={styles.ToggleSwitch}>
          {/* <ToggleSwitch
          onpress = {() => setToggleSwitch(!toggleSwitch)}
          Enabled = {!toggleSwitch}
        /> */}
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
          {/* <ToggleSwitch
            onpress = {() => setToggleSwitch(!toggleSwitch)}
            Enabled = {!toggleSwitch}
          /> */}
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
