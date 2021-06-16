import React, { useContext, useState, useRef, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    Image,
    Text,
    FlatList,
    useWindowDimensions,
    ScrollView,
} from 'react-native';
import styles from './style';
import MyCalendar from '../../componentes/MyCalendar';
import BtnCentered from '../../components/buttons/BtnCentered';
import moment from 'moment';
import CardMedicamentos from '../../componentes/CardMedicamentos';
import MyLoadingBall from '../../componentes/MyLoadingBall';
import MedicamentosContext from '../../contexts/medicamentos';
import ModalMedicamento from './ModalMedicamento/ModalMedicamento';

export default UpdateMedicamento = ({ navigation }) => {

    const { datasResult, datas, getCalendarioMedicamentos, indexInitial, stateMedicamentos } = useContext(MedicamentosContext);

    const deviceWidth = useWindowDimensions();
    const [selectedHorizontal, setSelectedHorizontal] = useState();
    const [medicamentoSelected, setMedicamentoSelected] = useState();
    const [activeModalCentered, setActiveModalCentered] = useState(false);

    const refFlatlist = useRef();

    const scrollToIndex = date => {
        var index = datas.findIndex((item) => {
            if (item.dia_semana == moment(date).format('YYYY-MM-DD')) {
                return item;
            }
        })
        refFlatlist.current.scrollToIndex({ animated: true, index: index })
    }

    const [inViewPort, setInViewPort] = useState(0)

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
        waitForInteraction: true,
        minimumViewTime: 5,
    })

    const onViewableItemsChanged = React.useRef(({ viewableItems, changed }) => {
        if (changed && changed.length > 0) {
            const item = changed[0].item;
            if (item) {
                setSelectedHorizontal(moment(item));
            }
        }
    })

    const getItemLayout = (data, index) => {
        return (
            { length: deviceWidth.width, offset: deviceWidth.width * index, index }
        )
    }

    const teste = (item) => {
        setMedicamentoSelected(item);
        setActiveModalCentered(true);
    }

    const orderByMed = (item) => {

        var horarios = [];

        item.map(element => {
            if (element.dS_HORARIOS) {
                let _element = element.dS_HORARIOS.replace(/\s/g, '');
                let array = _element.split(',');
                horarios.push(...array);
            }
        })

        var horaiosFilter = horarios.filter((elem, i, self) => self.indexOf(elem) === i);

        const order_result = horaiosFilter.sort(function (a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        })

        return order_result.map(element => {
            const medi_hora = item.filter((_elem) => {
                if (_elem.dS_HORARIOS) {
                    return _elem.dS_HORARIOS.includes(element)
                } else {
                    return false;
                }
            });
            return (
                <View>
                    <Text style={styles.labelHorario}>{element}</Text>
                    {
                        medi_hora.map(elem => (
                            <CardMedicamentos key={elem.nR_SEQUENCIA} medicamento={elem} onPress={teste} />
                        ))
                    }
                </View>
            )
        })
    }

    const MediEmpty = ({ item }) => (
        <View style={{
            width: deviceWidth.width,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image style={styles.imageMedicamento} source={require('../../assets/imagens/caledarioMedicamentos.jpg')} />
            <Text style={styles.textLabel}>
                Organize e controle seus remédios diariamente.
            </Text>
            <Text style={styles.text}>
                Acompanhe seus remédios diariamente e marque quando você tomar.
            </Text>
            <Text>
                {item.dia_semana}
            </Text>
        </View>
    )

    const Item = ({ item }) => {
        return (
            item.dados ?
                item.dados.length !== 0 ?
                    <ScrollView>
                        <View style={{
                            width: deviceWidth.width,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {orderByMed(item.dados)}
                        </View>
                    </ScrollView>
                    :
                    <MediEmpty item={item} />
                :
                <MediEmpty item={item} />
        );
    };

    useEffect(() => {
        getCalendarioMedicamentos();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {
                datasResult ?
                    <>
                        <View style={styles.box1}>
                            <MyCalendar scrollToIndex={scrollToIndex} selectedHorizontal={selectedHorizontal} medicamentos={stateMedicamentos} />
                        </View>
                        <View style={styles.box2}>
                            <FlatList
                                ref={refFlatlist}
                                data={datasResult}
                                keyExtractor={(item, key) => item.dia_semana}
                                renderItem={Item}
                                horizontal
                                pagingEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                //onViewableItemsChanged={onViewableItemsChanged.current}
                                //viewabilityConfig={viewabilityConfig.current}
                                initialScrollIndex={indexInitial}
                                getItemLayout={getItemLayout}
                                refreshing={true}
                                scrollEnabled={false}
                            />
                        </View>
                        <View style={styles.box3}>
                            <BtnCentered labelBtn={"Adicionar Medicamento"} fontSize={16} onPress={() => navigation.navigate('AddMedicamentos')} />
                        </View>
                    </>
                    :
                    <MyLoadingBall />
            }
            <ModalMedicamento activeModal={activeModalCentered} setActiveModal={setActiveModalCentered} item={medicamentoSelected} />
        </SafeAreaView>
    )
}

