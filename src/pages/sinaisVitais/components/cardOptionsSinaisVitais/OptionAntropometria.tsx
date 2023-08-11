import { StyleSheet, View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import SlideRanger from '../../../../components/Slider/SlideRanger';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ToggleSwitch from '../../../../components/Switch/ToggleSwitch';

interface PropsAntropometria {
  Altura: number;
  setAltura(qT_ALTURA_CM: number): void;
  Peso: number;
  setPeso(item: number): void;
}
const OptionAntropometria = ({
  Altura,
  setAltura,
  Peso,
  setPeso,
}: PropsAntropometria) => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    //paddingHorizontal: RFPercentage(2),
    marginTop: RFPercentage(1),
  },
  ToggleSwitch:{
    margin: RFPercentage(2)
  }
});

export default React.memo(OptionAntropometria);
