import React, { useCallback } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    ListRenderItem,
    Text,
    TouchableOpacity,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { IFilterConsultas } from '../../../../contexts/sinaisVitaisContext';
import { ThemeContextData } from '../../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
import { IMedico } from '../../../../reducers/ConsultasReducer';
interface Props {
    onPress(item: IFilterConsultas | null): void;
    selectedFilter?: IFilterConsultas;
    listMedicos: IMedico[] | null | undefined;
}

const EspecialidadeConsultasComponent: React.FC<Props> = ({
    onPress,
    selectedFilter,
    listMedicos,
}: Props) => {
    const styles = useThemeAwareObject(createStyles);

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

    const refactoryEspecialidades = useCallback(() => {
        const medicosDuplicates = listMedicos?.filter(
            (item, index, array) =>
                array.findIndex(
                    (t) => t.cD_ESPECIALIDADE === item.cD_ESPECIALIDADE,
                ) === index,
        )
        const medicosOrderBy = medicosDuplicates?.sort((a, b) => {
            return a.dS_ESPECIALIDADE < b.dS_ESPECIALIDADE
                ? -1
                : a.dS_ESPECIALIDADE > b.dS_ESPECIALIDADE
                ? 1
                : 0;
        })

        return medicosOrderBy;
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={refactoryEspecialidades()}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

export default EspecialidadeConsultasComponent;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            marginTop: RFPercentage(1),
            marginHorizontal: RFPercentage(1),
        },
        selectTextStyle: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            fontSize: theme.typography.SIZE.fontysize18,
            textAlign: 'center',
        },
        selectTextStyleActive: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_TERTIARY,
            fontSize: theme.typography.SIZE.fontysize18,
            textAlign: 'center',
        },
        optionContainerStyle: {
            backgroundColor: theme.colors.BACKGROUND_1,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        optionContainerStyleActive: {
            backgroundColor: theme.colors.BUTTON_SECUNDARY,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
        },
    });
    return styles;
}

