import { StyleSheet, View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import SlideRanger from '../../../../components/Slider/SlideRanger';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ToggleSwitch from '../../../../components/Switch/ToggleSwitch';

interface PropsMonitorizacaoGeral {
  Oxigigenacao: number;
  setOxigigenacao: React.Dispatch<React.SetStateAction<number>>;
}

const OptionMonitorizacaoGeral = ({
  Oxigigenacao,
  setOxigigenacao,
}: PropsMonitorizacaoGeral) => {

  const [toggleSwitch, setToggleSwitch] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.ToggleSwitch}>
        <ToggleSwitch
          onpress={() => setToggleSwitch(!toggleSwitch)}
          Enabled={!toggleSwitch}
        />
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    marginTop: RFPercentage(1),
  },
  ToggleSwitch:{
    margin: RFPercentage(2)
  }
});

export default React.memo(OptionMonitorizacaoGeral);
