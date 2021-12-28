import React, { memo } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import BtnFiilter from '../../../../components/buttons/BtnFilter';
import { FilterConsultas } from '../../sinaisVitais';
interface Props {
    onpress(item: BtnExames): void;
    selectedFilter?: FilterConsultas;
}

interface BtnExames {
    name: string;
    prop: string;
}

const filterConsultasComponent: React.FC<Props> = ({
    onpress,
    selectedFilter,
}: Props) => {
    const ItensButton = [
        { name: 'Médico', prop: 'codMedico' },
        { name: 'Especialidade', prop: 'dataFinal' },
    ];

    const activeBtn = (item: string) => {
        if (selectedFilter?.codEspecialidade && item === 'Especialidade') {
            return true;
        }
        if (selectedFilter?.codMedico && item === 'Médico') {
            return true;
        }
        if (
            selectedFilter?.dataFinal &&
            selectedFilter.dataInicio &&
            item === 'Periodos'
        ) {
            return true;
        }
        return false;
    };

    return (
        <View style={styles.container}>
            {ItensButton.map((element) => {
                return (
                    <BtnFiilter
                        name={element.name}
                        onPress={() => {
                            onpress(element);
                        }}
                        active={activeBtn(element.name)}
                    />
                );
            })}
        </View>
    );
};

export default memo(filterConsultasComponent);

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: RFPercentage(6),
        flexDirection: 'row',
        marginTop: 5,
    },
});
