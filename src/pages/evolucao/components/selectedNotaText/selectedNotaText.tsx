import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SelectedDropdown from '../../../../components/selectedDropdown/SelectedDropdown';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ItipoNotas, ITextDefault, useEvolucaoTextDefaultReduzidos, useNotasClinicas } from '../../../../hooks/useEvolucao';
import { QueryCache } from 'react-query';


interface Props {
    onPressTipoNota(value: ItipoNotas): void;
    onPressTextPadrao(value: ITextDefault): void;
}

const SelectedNotaText: React.FC<Props> = ({
    onPressTipoNota,
    onPressTextPadrao,
}: Props) => {

    const queryCache = new QueryCache();

    const [tipoNotasclinica, setTipoNotasClinica] = useState<string>();

    const { data: listTipoNotas, isFetching: isFetchingNotas } = useNotasClinicas();

    const { data: listTextDefault, isFetching: isFetchingText, refetch } = useEvolucaoTextDefaultReduzidos(tipoNotasclinica);

    const selectNotasClinicas = (itemEvolucao: ItipoNotas) => {
        if(itemEvolucao.cD_TIPO_EVOLUCAO){
            setTipoNotasClinica(itemEvolucao.cD_TIPO_EVOLUCAO);
            onPressTipoNota(itemEvolucao)
        }
    }

    useEffect(() => {
        refetch();
    }, [tipoNotasclinica]);

    useEffect(() => {
        return () => {
            queryCache.clear();
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <SelectedDropdown
                    placeholder="Tipo de nota"
                    data={listTipoNotas}
                    onChange={({ itemEvolucao }) => selectNotasClinicas(itemEvolucao)}
                    shimerPlaceHolder={isFetchingNotas}
                />
            </View>
            <View style={styles.box}>
                <SelectedDropdown
                    placeholder="Texto padrão"
                    data={listTextDefault}
                    onChange={({ value }) => onPressTextPadrao(value)}
                    shimerPlaceHolder={isFetchingText}
                />
            </View>
        </View>
    );
};

export default SelectedNotaText;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    box: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: RFPercentage(0.5),
    },
});
