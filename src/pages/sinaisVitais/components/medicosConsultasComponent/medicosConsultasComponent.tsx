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

const MedicosExamesComponent: React.FC<Props> = ({
    onPress,
    selectedFilter,
}: Props) => {
    const {
        stateConsultas: { medicos },
    } = useContext(SinaisVitaisContext);

    const renderItem: ListRenderItem<IMedico> = ({ item }) => (
        <View
            style={[
                selectedFilter?.nM_GUERRA === item?.nM_GUERRA
                    ? styles.optionContainerStyleActive
                    : styles.optionContainerStyle,
            ]}>
            <TouchableOpacity
                onPress={() =>
                    onPress(
                        item.nM_GUERRA !== selectedFilter?.nM_GUERRA
                            ? {
                                  nM_GUERRA: item.nM_GUERRA,
                              }
                            : null,
                    )
                }>
                <Text
                    style={[
                        selectedFilter?.nM_GUERRA === item.nM_GUERRA
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
                data={medicos}
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
