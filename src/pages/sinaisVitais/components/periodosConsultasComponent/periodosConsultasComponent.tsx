import moment from 'moment';
import React, { useRef, useState, useEffect, memo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import BtnOptions from '../../../../components/buttons/BtnOptions';
import ModalCaledar, {
    ModalHandles,
    Date,
} from '../../../../components/calendar/modalCalendar';
import NotificationsSimples from '../../../../components/Notification/NotificationsSimples';
import { FilterExame } from '../../../../contexts/examesContext';
interface Props {
    onPressOK(item: FilterExame): void;
    onPressCancel(): void;
    onPressClear(): void;
    selectedFilter?: FilterExame;
}

const PeriodosExamesComponent: React.FC<Props> = ({
    onPressOK,
    onPressCancel,
    selectedFilter,
    onPressClear,
}) => {
    const RefModalCalendar = useRef<ModalHandles>(null);
    const [activeModal, setActiveModal] = useState(false);
    const [date, setDate] = useState<FilterExame>({
        dataInicio: null,
        dataFinal: null,
    });

    const selectedDay = (item: Date) => {
        item.tipo === 'Initial' && setDate({ ...date, dataInicio: item.date });
        item.tipo === 'Final' && setDate({ ...date, dataFinal: item.date });
    };

    const validation = () => {
        if (
            date.dataInicio &&
            date.dataFinal &&
            date.dataInicio <= date.dataFinal
        ) {
            onPressOK(date);
        } else {
            setActiveModal(true);
        }
    };

    useEffect(() => {
        setDate({
            dataInicio: selectedFilter?.dataInicio,
            dataFinal: selectedFilter?.dataFinal,
        });
    }, [selectedFilter]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.btnClear}
                onPress={() => onPressClear()}>
                <Text style={styles.textBtnClear}>Limpar</Text>
            </TouchableOpacity>
            <View style={styles.boxTitle}>
                <Text style={styles.text}>Outros Períodos</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>De</Text>
                <TouchableOpacity
                    style={styles.btnData}
                    onPress={() =>
                        RefModalCalendar.current?.openModal({
                            tipo: 'Initial',
                        })
                    }>
                    <Text style={styles.text}>
                        {date.dataInicio
                            ? moment(date.dataInicio).format('DD/MM/YYYY')
                            : 'DD/MM/AAAA'}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Até</Text>
                <TouchableOpacity
                    style={styles.btnData}
                    onPress={() =>
                        RefModalCalendar.current?.openModal({
                            tipo: 'Final',
                        })
                    }>
                    <Text style={styles.text}>
                        {date.dataFinal
                            ? moment(date.dataFinal).format('DD/MM/YYYY')
                            : 'DD/MM/AAAA'}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.boxBtn}>
                <BtnOptions
                    onPress={() => validation()}
                    valueText={'Ok'}
                    disable={!(date.dataFinal && date.dataInicio)}
                />
                <BtnOptions
                    onPress={() => onPressCancel()}
                    valueText={'Cancelar'}
                    arrayColors={['#cb2720', '#cb20c4']}
                />
            </View>
            <ModalCaledar
                ref={RefModalCalendar}
                selectedDay={(item) => selectedDay(item)}
            />
            <NotificationsSimples
                message={'A data inicial deve ser menor que a data final.'}
                activeModal={activeModal}
            />
        </View>
    );
};

export default memo(PeriodosExamesComponent);

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: 10,
        zIndex: 0,
    },
    boxTitle: {
        alignItems: 'center',
    },
    box: {
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'center',
    },
    boxBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        color: '#7C9292',
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnData: {
        backgroundColor: '#c3c0c35e',
        justifyContent: 'center',
        marginVertical: 10,
        height: 40,
        paddingLeft: 10,
    },
    btnDisable: {
        width: 200,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#08948A',
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
    },
    textBtn: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    btn: {
        width: 200,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#08948A',
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnClear: {
        position: 'absolute',
        right: 0,
        top: -20,
        padding: 10,
        //backgroundColor: '#20c4cb',
        //borderRadius: 30,
    },
    textBtnClear: {
        color: '#20c4cb',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
