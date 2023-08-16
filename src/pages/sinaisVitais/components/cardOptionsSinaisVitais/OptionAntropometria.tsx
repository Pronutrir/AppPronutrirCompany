import { StyleSheet, View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import SlideRanger from '../../../../components/Slider/SlideRanger';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ToggleSwitch from '../../../../components/Switch/ToggleSwitch';
import { ScrollView } from 'react-native-gesture-handler';

interface PropsAntropometria {
  Altura: number;
  setAltura(qT_ALTURA_CM: number): void;
  Peso: number;
  setPeso(item: number): void;
  Temperatura: number;
  setTemperatura(item: number): void;
  Oxigigenacao: number;
  setOxigigenacao(item: number): void;
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
}: PropsAntropometria) => {
  const [toggleSwitch, setToggleSwitch] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.ToggleSwitch}>
        <ToggleSwitch
          onpress={() => setToggleSwitch(!toggleSwitch)}
          Enabled={!toggleSwitch}
        />
      </View>
      <ScrollView>
        <SlideRanger
          label={'Altura'}
          medida={'cm'}
          step={1}
          valueMin={0}
          valueMax={300}
          valueRanger={Altura}
          setValueRanger={value => setAltura(value)}
          disabled={toggleSwitch}
        />
        <SlideRanger
          label={'Peso'}
          medida={'kg'}
          step={0.1}
          valueMin={0}
          valueMax={200}
          valueRanger={Peso}
          setValueRanger={value => setPeso(value)}
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
