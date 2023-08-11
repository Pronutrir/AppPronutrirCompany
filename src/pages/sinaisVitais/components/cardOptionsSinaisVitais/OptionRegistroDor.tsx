import { StyleSheet, View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import SlideRanger from '../../../../components/Slider/SlideRanger';
import { RFPercentage } from 'react-native-responsive-fontsize';
import EscalaDorComponent from '../escalaDorComponent/escalaDorComponent';
import ToggleSwitch from '../../../../components/Switch/ToggleSwitch';

interface PropsRegistroDor {
  Dor: number;
  setDor: React.Dispatch<React.SetStateAction<number>>;
}

const OptionRegistroDor = ({ Dor, setDor }: PropsRegistroDor) => {
  
  const [toggleSwitch, setToggleSwitch] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.ToggleSwitch}>
        <ToggleSwitch
          onpress={() => setToggleSwitch(!toggleSwitch)}
          Enabled={!toggleSwitch}
        />
      </View>
      <EscalaDorComponent
        onpress={item => {
          setDor(item);
        }}
        disabled={toggleSwitch}
      />
      <SlideRanger
        label={'Escala de dor'}
        medida={'nº'}
        step={1}
        valueMin={0}
        valueMax={10}
        valueRanger={Dor}
        setValueRanger={value => setDor(value)}
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
  ToggleSwitch: {
    margin: RFPercentage(2),
  },
});

export default React.memo(OptionRegistroDor);
