import React, { memo } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import BtnFilter from '../../../../components/buttons/BtnFilter';
interface Props {
    onpress(item: BtnExames): void;
    selectedFilter: string;
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
        { name: 'Paciente', prop: 'paciente' },
    ];

    return (
        <View style={styles.container}>
            {ItensButton.map((element) => {
                return (
                    <BtnFilter
                        key={element.name}
                        name={element.name}
                        onPress={() => {
                            onpress(element);
                        }}
                        active={element.name === selectedFilter}
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
