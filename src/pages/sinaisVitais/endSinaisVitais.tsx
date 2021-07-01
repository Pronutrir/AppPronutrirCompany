import React, { useState, useEffect, memo, useContext } from 'react';
import { View, FlatList, Platform, Text, StyleSheet } from 'react-native';
import { sinaisVitais } from './historySinaisVitais/historySinaisVitais';
import HistorySvg from '../../assets/svg/historico.svg';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import CardSimples from '../../components/Cards/CardSimples';
import LoadingBall from '../../components/Loading/LoadingBall';
import moment from 'moment';
import Api from '../../services/api';
import ErrorContext from '../../contexts/errorNotification';

const EndSinaisVitais: React.FC = ({ }) => {

    const { addNotification } = useContext(ErrorContext);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [listSinaisVitais, setListSinaisVitais] = useState<sinaisVitais[] | null>(null);

    const GetSinaisVitais = async () => {
        try {
            const sinaisVitais: sinaisVitais[] = await Api.get(`SinaisVitaisMonitoracaoGeral/FiltrarDadosSVMGPacientePorAtendimentoPessoaFisica/${"WILLIAME CORREIA DE LIMA"}`).then(response => {
                const { result } = response.data;
                if (result) {
                    const order_result = result.sort(function (a: sinaisVitais, b: sinaisVitais) {
                        return a.nR_SEQUENCIA > b.nR_SEQUENCIA ? -1 : a.nR_SEQUENCIA < b.nR_SEQUENCIA ? 1 : 0
                    })
                    return result;
                }
            });
            setListSinaisVitais(sinaisVitais);
            setRefreshing(false);
        } catch (error) {
            setRefreshing(false);
            addNotification({ message: "Não foi possivel realizar a consulta, tente mais tarde!", status: 'error' });
        }
    }

    const Item = ({ item, index }: { item: sinaisVitais, index: number }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.box}>
                    <HistorySvg width={RFPercentage(5)} height={RFPercentage(5)}>Botão</HistorySvg>
                </View>
                <View style={styles.box}>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Paciente: </Text>
                        <Text style={styles.text}>{`${item.nM_PESSOA_FISICA.toUpperCase()}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Data: </Text>
                        <Text style={styles.text}>{`${moment(item.dT_SINAL_VITAL).format('DD-MM-YYYY')}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Altura: </Text>
                            <Text style={styles.text}>{`${item?.qT_ALTURA_CM ?? 0}`}</Text>
                        </View>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Peso: </Text>
                            <Text style={styles.text}>{`${item?.qT_PESO ?? 0}`}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Oxigenação: </Text>
                            <Text style={styles.text}>{`${item?.qT_SATURACAO_O2 ?? 0}`}</Text>
                        </View>
                        <View style={styles.SubItem}>
                            <Text style={styles.textLabel}>Temperatura: </Text>
                            <Text style={styles.text}>{`${item?.qT_TEMP ?? 0}`}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    const renderItem = ({ item, index }: { item: sinaisVitais, index: number }) => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Item key={item.nR_SEQUENCIA} item={item} index={index} />
        </CardSimples>
    );

    const renderItemEmpty = () => (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Text style={styles.text}>Nenhum sinal vital encontrado</Text>
        </CardSimples>
    );

    useEffect(() => {
        GetSinaisVitais();
    }, [])

    return (
        <View style={styles.container}>
            {
                listSinaisVitais ?
                    <>
                        <Text style={[styles.textLabel, { alignSelf: 'flex-start', paddingLeft: 10, }]}>Ultimos sinais vitais adicionados!</Text>
                        <FlatList
                            data={listSinaisVitais}
                            renderItem={({ item, index }) => (renderItem({ item, index }))}
                            keyExtractor={(item, index) => index.toString()}
                            refreshing={refreshing}
                            onRefresh={() => {
                                setRefreshing(true);
                                GetSinaisVitais();
                            }}
                            ListEmptyComponent={renderItemEmpty}
                        />
                    </>
                    :
                    <LoadingBall active={true} />                
            }
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    cardStyle: {
        flex: 1
    },
    textLabel: {
        color: '#1E707D',
        fontSize: RFValue(16, 680),
        fontWeight: 'bold'
    },
    text: {
        color: '#666666',
        fontSize: RFValue(16, 680)
    },
    item: {
        flex: 1,
        flexDirection: 'row'
    },
    SubItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    btn: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 30,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            }
        })
    }
})

export default memo(EndSinaisVitais);