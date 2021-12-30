import React, { useContext } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    ListRenderItem,
    Text,
    TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import SinaisVitaisContext from '../../../../contexts/sinaisVitaisContext';
import { FilterConsultas } from '../../sinaisVitais';
import { Consultas } from '../../../../reducers/ConsultasReducer';
interface Props {
    onPress(item: FilterConsultas): void;
    selectedFilter?: FilterConsultas;
}

const MedicosExamesComponent: React.FC<Props> = ({
    onPress,
    selectedFilter,
}: Props) => {
    const { consultas } = useContext(SinaisVitaisContext);

    const FilterMedicos = () => {
        const filteredArr = consultas.filter(
            (item, index, array) =>
                array.findIndex(
                    (element) => element.nM_GUERRA === item.nM_GUERRA,
                ) === index,
        );
        return filteredArr;
    };

    const renderItem: ListRenderItem<Consultas> = ({ item }) => (
        <View
            style={[
                selectedFilter?.codMedico === item.nR_SEQUENCIA
                    ? styles.optionContainerStyleActive
                    : styles.optionContainerStyle,
            ]}>
            <TouchableOpacity
                onPress={() =>
                    onPress({
                        codMedico:
                            selectedFilter?.codMedico === item.nR_SEQUENCIA
                                ? null
                                : item.nR_SEQUENCIA,
                    })
                }>
                <Text
                    style={[
                        selectedFilter?.codMedico === item.nR_SEQUENCIA
                            ? styles.selectTextStyleActive
                            : styles.selectTextStyle,
                    ]}>
                    {item.nM_GUERRA}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={FilterMedicos()}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

export default MedicosExamesComponent;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: 10,
    },
    selectTextStyle: {
        color: '#08948A',
        textAlign: 'center',
        fontSize: RFValue(18, 680),
    },
    selectTextStyleActive: {
        color: '#ffff',
        textAlign: 'center',
        fontSize: RFValue(18, 680),
    },
    optionContainerStyle: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionContainerStyleActive: {
        backgroundColor: '#20cbc1',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
});
