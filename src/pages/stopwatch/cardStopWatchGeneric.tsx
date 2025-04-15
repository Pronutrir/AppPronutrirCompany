import { StyleSheet, View } from 'react-native';
import React from 'react';
import CardSimples from '../../components/Cards/CardSimples';

type Props = {
    children: JSX.Element
}

const CardStopWatchGeneric = ({ children }: Props) => {
    return (
        <CardSimples>
            {children}
        </CardSimples>
    )
}

export default CardStopWatchGeneric;

const styles = StyleSheet.create({})