import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import {
    useHistoryEvolucao,
    IEvolucaoHistory,
} from '../../../hooks/useEvolucao';
import AuthContext from '../../../contexts/auth';
import CardSimples from '../../../components/Cards/CardSimples';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import HistorySvg from '../../../assets/svg/historico.svg';
import moment from 'moment';
import ShimerPlaceHolderCardSNVTs from '../../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import { ThemeContextData } from '../../../contexts/themeContext';

const HistoryEvolucao: React.FC = () => {
    
    const styles = useThemeAwareObject(createStyles);

    const {
        stateAuth: {
            usertasy: { cD_PESSOA_FISICA },
        },
    } = useContext(AuthContext);
    const { data } = useHistoryEvolucao(cD_PESSOA_FISICA);

    const Item = ({ item }: { item: IEvolucaoHistory; index: number }) => {
        return (
            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                <View style={styles.box1}>
                    <HistorySvg
                        width={RFPercentage(5)}
                        height={RFPercentage(5)}>
                        Botão
                    </HistorySvg>
                </View>
                <View style={styles.box2}>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Paciente: </Text>
                        <Text
                            style={
                                styles.text
                            }>{`${item.nM_PACIENTE.toUpperCase()}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Data: </Text>
                        <Text style={styles.text}>{`${moment(
                            item.dT_EVOLUCAO,
                        ).format('DD-MM-YYYY [às] HH:mm')}`}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderItem = ({
        item,
        index,
    }: {
        item: IEvolucaoHistory;
        index: number;
    }) => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Item key={index} item={item} index={index} />
        </CardSimples>
    );

    return (
        <View style={styles.container}>
            {data ? (
                <FlatList
                    data={data}
                    renderItem={({ item, index }) =>
                        renderItem({ item, index })
                    }
                    keyExtractor={(item, index) => index.toString()}
                    /* refreshing={isFetching}
                    onRefresh={() => {
                        refetch;
                    }} */
                    //ListEmptyComponent={renderItemEmpty}
                    //ListFooterComponent={renderFooter}
                    //onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                />
            ) : (
                Array(4).fill(<ShimerPlaceHolderCardSNVTs />)
            )}
        </View>
    );
};

export default HistoryEvolucao;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: { 
            flex: 1, 
            width: Dimensions.get('screen').width 
        },
        box1: {
            flex: 0.5,
            margin: 3,
            justifyContent: 'center',
        },
        box2: {
            flex: 5,
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 3,
        },
        cardStyle: {
            flex: 1,
            padding: RFPercentage(1),
        },
        item: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginVertical: RFPercentage(0.5),
        },
        SubItem: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        textLabel: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlignVertical: 'center'
        },
        text: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlignVertical: 'center'
        },
    });
    return styles;
}

