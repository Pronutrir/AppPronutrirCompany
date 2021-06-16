import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import VisaoSvg from '../assets/svg/visao.svg';
import PrivadoSvg from '../assets/svg/privado.svg';

export default function visaoPassword({ active, setActive }) {

    return (
        <TouchableOpacity onPress={() => setActive(!active)}>
            {
                active ?
                <PrivadoSvg fill={'#748080'} width={20} height={20} />
                :
                <VisaoSvg fill={'#748080'} width={20} height={20} />
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})
