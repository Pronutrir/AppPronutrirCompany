import React, {
    useRef,
    useState,
    useImperativeHandle,
    useCallback,
} from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import NextImg from '../../assets/svg/arrowRight.svg';
import BackImg from '../../assets/svg/arrowLeft.svg';
import moment from 'moment';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
interface Props {
    activeModal?: boolean;
    selectedDay?(date: Date): void;
}
export interface ModalHandles {
    openModal(type?: Type): void;
    closeModal(): void;
}
export interface Date {
    tipo?: string;
    date?: string;
}

type Type = 'valueInitial' | 'valueEnd';

const ModalCalendar = React.forwardRef<ModalHandles, Props>(
    ({ activeModal = false, selectedDay }: Props, ref) => {
        const styles = useThemeAwareObject(createStyles);
        const _view = useRef<any>(null);

        const [active, setActive] = useState(activeModal);
        const tipo = useRef<Type>();

        const cancel = () => {
            setActive(false);
        };

        const SelectedDate = (date: Date) => {
            if (selectedDay) {
                selectedDay(date);
            }
            setActive(false);
        };

        LocaleConfig.defaultLocale = 'br';

        LocaleConfig.locales.br = {
            monthNames: [
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
            ],
            monthNamesShort: [
                'Jan.',
                'Fev.',
                'Mar',
                'Abr',
                'Mai',
                'Jun',
                'Jul.',
                'Ago',
                'Set.',
                'Out.',
                'Nov.',
                'Dec.',
            ],
            dayNames: [
                'Domingo',
                'Segunda',
                'Terca',
                'Quarta',
                'Quinta',
                'Sexta',
                'Sabado',
            ],
            dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            //today: "Hoje'Hj",
        };

        const closeModal = useCallback(() => {
            setActive(false);
        }, []);

        const openModal = useCallback((type?: Type) => {
            setActive(true);
            if (type) {
                tipo.current = type;
            }
        }, []);

        useImperativeHandle(ref, () => {
            return {
                openModal,
                closeModal,
            };
        });

        return (
            <View>
                <Modal animationType="fade" transparent={true} visible={active}>
                    <View
                        style={styles.centeredView}
                        ref={_view}
                        onStartShouldSetResponder={(evt) => {
                            evt.persist();
                            if (
                                evt.nativeEvent.target ===
                                _view.current?._nativeTag
                            ) {
                                cancel();
                            }
                            return true;
                        }}>
                        <View style={styles.modalView}>
                            <Calendar
                                style={styles.calendario}
                                theme={{
                                    backgroundColor: '#08948A',
                                    calendarBackground: 'transparent',
                                    textSectionTitleColor: '#333B3B',
                                    textSectionTitleDisabledColor: '#d9e1e8',
                                    selectedDayBackgroundColor: 'black',
                                    selectedDayTextColor: '#ffffff',
                                    todayTextColor: '#00adf5',
                                    dayTextColor: '#08948A',
                                    textDisabledColor: '#d9e1e8',
                                    dotColor: '#00adf5',
                                    selectedDotColor: '#ffffff',
                                    arrowColor: '#08948A',
                                    disabledArrowColor: '#d9e1e8',
                                    monthTextColor: '#08948A',
                                    indicatorColor: 'blue',
                                    textDayFontWeight: '300',
                                    textMonthFontWeight: 'bold',
                                    textDayHeaderFontWeight: '300',
                                    textDayFontSize: 18,
                                    textMonthFontSize: 18,
                                    textDayHeaderFontSize: 18,
                                }}
                                current={moment().format('YYYY-MM-DD')}
                                //minDate={new Date().toDateString()}
                                onDayPress={(day: any) =>
                                    SelectedDate({
                                        tipo: tipo.current,
                                        date: day.dateString,
                                    })
                                }
                                enableSwipeMonths={true}
                                renderArrow={(item: any) =>
                                    (item === 'left' && (
                                        <BackImg
                                            fill={'#748080'}
                                            width={35}
                                            height={35}
                                        />
                                    )) ||
                                    (item === 'right' && (
                                        <NextImg
                                            fill={'#748080'}
                                            width={35}
                                            height={35}
                                        />
                                    ))
                                }
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    },
);

ModalCalendar.displayName = 'ModalCalendar';

export default ModalCalendar;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.BACKDROP,
        },
        modalView: {
            backgroundColor: 'white',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 5,
            width: '80%',
        },
        calendario: {
            height: 375,
            width: '100%',
            borderRadius: 10,
        },
        text: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            fontSize: theme.typography.SIZE.fontysize18,
        },
        btn: {
            margin: 5,
            marginHorizontal: 10,
            padding: 5,
        },
        boxBtn: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
        },
    });
    return styles;
};
