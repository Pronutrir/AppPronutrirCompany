import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import VisaoSvg from '../assets/svg/visao.svg';
import PrivadoSvg from '../assets/svg/privado.svg';

export default function visaoPassword({ active, setActive }) {
  const widthScreen = Dimensions.get('screen').width / 20;

  return (
    <TouchableOpacity onPress={() => setActive(!active)}>
      {active ? (
        <PrivadoSvg fill={'#748080'} width={widthScreen} height={widthScreen} />
      ) : (
        <VisaoSvg fill={'#748080'} width={widthScreen} height={widthScreen} />
      )}
    </TouchableOpacity>
  );
}
