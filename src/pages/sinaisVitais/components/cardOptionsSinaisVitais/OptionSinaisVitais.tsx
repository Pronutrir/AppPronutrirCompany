import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import SlideRanger from '../../../../components/Slider/SlideRanger';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ToggleSwitch from '../../../../components/Switch/ToggleSwitch';

interface PropSinaisVitais {
  Pas: number;
  setPas: React.Dispatch<React.SetStateAction<number>>;
  Pad: number;
  setPad: React.Dispatch<React.SetStateAction<number>>;
  //Pam: number;
  setPam: React.Dispatch<React.SetStateAction<number>>;
  Fc: number;
  setFc: React.Dispatch<React.SetStateAction<number>>;
  Fr: number;
  setFr: React.Dispatch<React.SetStateAction<number>>;
  Temperatura: number;
  setTemperatura: React.Dispatch<React.SetStateAction<number>>;
}
const OptionSinaisVitais = ({
  Pas,
  setPas,
  Pad,
  setPad,
  setPam,
  Fc,
  setFc,
  Fr,
  setFr,
  Temperatura,
  setTemperatura,
}: PropSinaisVitais) => {
  const [toggleSwitch, setToggleSwitch] = useState(true);

  const pressaoArterialMedia = (): number => {
    if (Pad !== 40 && Pad !== 40) {
      const pam: number = (Pas + Pad * 2) / 3;
      return parseInt(pam.toFixed());
    } else {
      return 0;
    }
  };

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
          label={'PAS(mmHG)'}
          medida={'mmHg'}
          step={1}
          valueMin={40}
          valueMax={280}
          valueRanger={Pas}
          setValueRanger={value => setPas(value)}
          disabled={toggleSwitch}
        />
        <SlideRanger
          label={'PAD(mmHg)'}
          medida={'mmHg'}
          step={1}
          valueMin={40}
          valueMax={150}
          valueRanger={Pad}
          setValueRanger={value => setPad(value)}
          disabled={toggleSwitch}
        />
        <SlideRanger
          label={'PAM(mmHg)'}
          medida={'mmHg'}
          step={1}
          valueMin={0}
          valueMax={200}
          valueRanger={pressaoArterialMedia()}
          setValueRanger={value => setPam(value)}
          disabled={true}
          disabledIncrement={true}
        />
        <SlideRanger
          label={'FC(bpm)'}
          medida={'bpm'}
          step={1}
          valueMin={0}
          valueMax={300}
          valueRanger={Fc}
          setValueRanger={value => setFc(value)}
          disabled={toggleSwitch}
        />
        <SlideRanger
          label={'FR(mm)'}
          medida={'mrm'}
          step={1}
          valueMin={12}
          valueMax={80}
          valueRanger={Fr}
          setValueRanger={value => setFr(value)}
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
    marginTop: RFPercentage(1),
  },
  ToggleSwitch: {
    margin: RFPercentage(2),
  },
});

export default React.memo(OptionSinaisVitais);
