import { useCallback } from 'react';
import { useQuery } from 'react-query';
import firestore from '@react-native-firebase/firestore';
import { LoginState } from '../reducers/UserReducer';

export interface IPerfisLiberados {
    cD_PERFIL: number;
    dS_PERFIL: string;
}

const getPerfilAutorizeEvolocao = async () => {
    const useRef = firestore()
        .doc('FunctionsApp/SinaisVitaisTriagem')
        .collection('Perfis');

    const resultPerfis: IPerfisLiberados[] = [];

    await useRef.get().then((querySnapshot) => {
        return querySnapshot.forEach((item) => {
            resultPerfis.push({
                cD_PERFIL: item.get('cD_PERFIL'),
                dS_PERFIL: item.get('dS_PERFIL'),
            });
        });
    });

    return resultPerfis;
};

const { data: PerfisSinaisVitaisEvolução } = useQuery(
    'PerfisTriagem',
    getPerfilAutorizeEvolocao,
);

const ValidationAutorizeEvolucao = useCallback((stateAuth: LoginState) => {
    const result = PerfisSinaisVitaisEvolução?.some(
        (element: IPerfisLiberados) => {
            return (
                element.cD_PERFIL === stateAuth.PerfilSelected?.cD_PERFIL
            );
        },
    );

    if (result) {
        return result;
    } else {
        return false;
    }
}, [PerfisSinaisVitaisEvolução]);

export { ValidationAutorizeEvolucao }
