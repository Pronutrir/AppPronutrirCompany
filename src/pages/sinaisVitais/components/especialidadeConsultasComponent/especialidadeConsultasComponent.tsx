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
import SinaisVitaisContext, {
    Consultas,
} from '../../../../contexts/sinaisVitaisContext';
import { FilterConsultas } from '../../sinaisVitais';

interface Props {
    onPress(item: FilterConsultas): void;
    selectedFilter?: FilterConsultas;
}

const EspecialidadeConsultasComponent: React.FC<Props> = ({
    onPress,
    selectedFilter,
}: Props) => {
    const { consultas } = useContext(SinaisVitaisContext);

    const renderItem: ListRenderItem<Consultas> = ({ item }) => (
        <View
            style={[
                selectedFilter?.codEspecialidade === item.cD_ESPECIALIDADE
                    ? styles.optionContainerStyleActive
                    : styles.optionContainerStyle,
            ]}>
            <TouchableOpacity
                onPress={() =>
                    onPress({
                        codEspecialidade:
                            selectedFilter?.codEspecialidade ===
                            item.cD_ESPECIALIDADE
                                ? null
                                : item.cD_ESPECIALIDADE,
                    })
                }>
                <Text
                    style={[
                        selectedFilter?.codEspecialidade ===
                        item.cD_ESPECIALIDADE
                            ? styles.selectTextStyleActive
                            : styles.selectTextStyle,
                    ]}>
                    {item.dS_ESPECIALIDADE}
                </Text>
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={consultas.filter(
                    (item, index, array) =>
                        array.findIndex(
                            (t) => t.cD_ESPECIALIDADE === item.cD_ESPECIALIDADE,
                        ) === index,
                )}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

export default EspecialidadeConsultasComponent;

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
