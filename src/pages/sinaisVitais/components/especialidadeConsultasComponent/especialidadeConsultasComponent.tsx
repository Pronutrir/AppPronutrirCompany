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
import { IFilterConsultas } from '../../../../contexts/sinaisVitaisContext';
import { IMedico } from '../../../../reducers/ConsultasReducer';
interface Props {
    onPress(item: IFilterConsultas | null): void;
    selectedFilter?: IFilterConsultas;
}

const EspecialidadeConsultasComponent: React.FC<Props> = ({
    onPress,
    selectedFilter,
}: Props) => {
    const {
        stateConsultas: { medicos },
    } = useContext(SinaisVitaisContext);

    const renderItem: ListRenderItem<IMedico> = ({ item }) => (
        <View
            style={[
                selectedFilter?.dS_ESPECIALIDADE === item.dS_ESPECIALIDADE
                    ? styles.optionContainerStyleActive
                    : styles.optionContainerStyle,
            ]}>
            <TouchableOpacity
                onPress={() =>
                    onPress(
                        item.dS_ESPECIALIDADE !==
                            selectedFilter?.dS_ESPECIALIDADE
                            ? {
                                  dS_ESPECIALIDADE: item?.dS_ESPECIALIDADE,
                              }
                            : null,
                    )
                }>
                <Text
                    style={[
                        selectedFilter?.dS_ESPECIALIDADE ===
                        item.dS_ESPECIALIDADE
                            ? styles.selectTextStyleActive
                            : styles.selectTextStyle,
                    ]}>
                    {item.dS_ESPECIALIDADE.toLocaleUpperCase()}
                </Text>
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={medicos?.filter(
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
