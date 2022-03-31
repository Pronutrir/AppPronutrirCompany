import { StyleSheet, View } from 'react-native';
import React from 'react';
import SelectedDropdown, { Idata } from '../../../../components/selectedDropdown/SelectedDropdown';
import { useQuery } from 'react-query';
import Api from '../../../../services/api';
import { RFPercentage } from 'react-native-responsive-fontsize';

interface ITextDefault {
    nR_SEQUENCIA: number;
    dS_TITULO: string;
}

interface ItipoNotas {
    cD_TIPO_EVOLUCAO: string;
    iE_ATEND_FECHADO: string;
    dT_ATUALIZACAO: string;
    dS_TIPO_EVOLUCAO: string;
    iE_SITUACAO: string;
    nM_USUARIO: string;
    iE_REGRA_ALTA: string;
    iE_EVOLUCAO_SUSCDS: string;
    iE_NOTACAO_CLINICA_AGEND_GRUPO: string;
    dT_ATUALIZACAO_NREC: string;
    nM_USUARIO_NREC: string;
    dS_LEGENDA: string;
    iE_GERA_LANCTO_AUTO: string;
}

interface ItextPadraoResponse {
    result: ITextDefault[];
}

interface ItipoNotasResponse {
    result: ItipoNotas[];
}

interface Props {
    onPress(value: Idata): void;
}

const SelectedNotaText: React.FC<Props> = ({ onPress }: Props) => {
    const { data: listTipoNota } = useQuery('tiposNotas', async () => {
        const {
            data: { result },
        } = await Api.get<ItipoNotasResponse>(
            `TipoEvolucao/ListarTiposEvolucoes`,
        );
        return result.map((item) => {
            return { label: item.dS_TIPO_EVOLUCAO, value: item };
        });
    });

    const { data: listTextDefault } = useQuery('defaltText', async () => {
        const {
            data: { result },
        } = await Api.get<ItextPadraoResponse>(
            `TextoPadrao/ListarTextosPadroesInstituicaoReduzidos?pagina=1&rows=100`,
        );
        return result.map((item) => {
            return { label: item.dS_TITULO, value: item };
        });
    });

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <SelectedDropdown
                    placeholder="Tipo de nota"
                    data={listTipoNota}
                    onChange={(value) => onPress(value)}
                />
            </View>
            <View style={styles.box}>
                <SelectedDropdown
                    placeholder="Texto padrão"
                    data={listTextDefault}
                    onChange={(value) => onPress(value)}
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
