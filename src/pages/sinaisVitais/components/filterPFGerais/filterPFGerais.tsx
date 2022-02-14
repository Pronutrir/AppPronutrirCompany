import React, { memo } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import BtnFiilter from '../../../../components/buttons/BtnFilter';
interface Props {
    onpress(item: BtnExames): void;
    selectedFilter?: string;
}

interface BtnExames {
    name: string;
    prop: string;
}

const FilterPFGerais: React.FC<Props> = ({
    onpress,
    selectedFilter,
}: Props) => {
    const ItensButton = [
        { name: 'Data de Nascimento', prop: 'nascimento' },
        { name: 'Nome Paciente', prop: 'paciente' },
    ];

    const activeBtn = (item: string) => {
        if (selectedFilter === 'nascimento' && item === 'nascimento') {
            return true;
        }
        if (selectedFilter === 'paciente' && item === 'paciente') {
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
                        active={activeBtn(element.prop)}
                    />
                );
            })}
        </View>
    );
};

export default memo(FilterPFGerais);

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: RFPercentage(6),
        flexDirection: 'row',
        marginVertical: 5,
    },
});
