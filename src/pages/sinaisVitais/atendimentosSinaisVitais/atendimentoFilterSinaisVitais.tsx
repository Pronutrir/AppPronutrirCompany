import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useContext, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { IAgendaPaciente } from '../../../hooks/useAgendaConsultas';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, StackNavigation } from '../../../routes/routeDashboard';
import { ThemeContextData } from '../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import CardSimples from '../../../components/Cards/CardSimples';
import AtendimentoInfoCard from './atendimentoInfoCardSinaisVitais';
import PatientHeaderCard from './atendimentoHeaderSinaisVitais';

type ProfileScreenRouteProp = RouteProp<
    RootStackParamList,
    'AtendimentoFilterSinaisVitais'
>;
interface Props {
    route: ProfileScreenRouteProp;
}

const AtendimentoFilterSinaisVitais = ({ route: { params: { cd_pessoa_fisica } } }: Props) => {

    const styles = useThemeAwareObject(createStyles);

    const navigation = useNavigation<StackNavigation>();

    const queryClient = useQueryClient();

    const resultAgendasFull: IAgendaPaciente[] = queryClient.getQueryData<IAgendaPaciente[]>('agendasFullPaciente')?.filter(item => item.cD_PESSOA_FISICA === cd_pessoa_fisica) || [];

    const Item = useCallback(({ item, index }: { item: IAgendaPaciente; index: number }) => {
        return (
            <View
                key={index.toString()}
                style={styles.cardStyle}
            >
                <View style={styles.consultaItemContainer}>
                    <AtendimentoInfoCard
                        item={item}
                    />
                </View>
            </View>
        );
    }, [navigation]);

    const renderItem = useCallback(({ item, index }: { item: IAgendaPaciente; index: number }) => {
        return (
            <CardSimples styleCardContainer={styles.cardStyle}>
                <Item key={index.toString()} item={item} index={index} />
            </CardSimples>
        )
    }, []);

    const renderItemEmpty = () => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Text style={styles.text}>Nenhum consulta encontrada!</Text>
        </CardSimples>
    );

    return (
        <View style={styles.container}>
            <PatientHeaderCard agenda={resultAgendasFull[0]} gerarAtendimento={resultAgendasFull.some(item => item.origem === 'TRATAMENTO')} />
            <FlatList
                data={resultAgendasFull.sort((a, b) => a.dT_AGENDA < b.dT_AGENDA ? -1 : a.dT_AGENDA > b.dT_AGENDA ? 1 : 0)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => renderItem({ item, index })}
                ListEmptyComponent={renderItemEmpty}
            />
        </View>
    )
}

export default AtendimentoFilterSinaisVitais

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: Dimensions.get('screen').width
        },
        cardStyle: {
            flex: 1,
            borderRadius: 10,
        },
        text: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
        },
        consultaItemContainer: {
            flex: 1,
            flexDirection: 'row',
        },
        box1: {
            flex: 0.5,
            margin: 3,
        },
        box2: {
            flex: 5,
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 3,
        },
        item: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        textLabel: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            fontSize: theme.typography.SIZE.fontysize16,
        },
        menuPopUpStyle: {
            position: 'absolute',
            right: 0,
        },
    });
    return styles;
}