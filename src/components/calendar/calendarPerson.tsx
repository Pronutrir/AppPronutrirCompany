import React from 'react';
import { StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import NextImg from '../../assets/svg/arrowRight.svg';
import BackImg from '../../assets/svg/arrowLeft.svg';
import moment from 'moment';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import useTheme from '../../hooks/useTheme';
interface Props {
    activeModal?: boolean;
    selectedDay?(date: DateOptions): void;
    type?: Type;
}
export interface DateOptions {
    tipo?: Type;
    date: string;
}

export type Type = 'valueInitial' | 'valueEnd';

const CalendarPerson: React.FC<Props> = ({ selectedDay, type }: Props) => {
    const styles = useThemeAwareObject(createStyles);
    const theme = useTheme();

    const SelectedDate = (date: DateOptions) => {
        if (selectedDay) {
            selectedDay(date);
        }
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

    return (
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
                textDayFontSize: theme.typography.SIZE.fontysize14,
                textMonthFontSize: theme.typography.SIZE.fontysize14,
                textDayHeaderFontSize: theme.typography.SIZE.fontysize14,
            }}
            current={moment().format('YYYY-MM-DD')}
            //minDate={new Date().toDateString()}
            onDayPress={(day: any) =>
                SelectedDate({
                    tipo: type,
                    date: day.dateString,
                })
            }
            enableSwipeMonths={true}
            renderArrow={(item: any) =>
                (item === 'left' && (
                    <BackImg fill={'#748080'} width={35} height={35} />
                )) ||
                (item === 'right' && (
                    <NextImg fill={'#748080'} width={35} height={35} />
                ))
            }
        />
    );
};

export default CalendarPerson;

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
