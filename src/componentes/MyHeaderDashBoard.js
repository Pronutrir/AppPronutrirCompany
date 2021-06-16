import React from 'react';
import { StyleSheet, View, Dimensions, Text, Platform } from 'react-native';
import MyBackButton from '../componentes/MyBackButton';
import AgendarConsultaImg from '../assets/svg/AgendarConsulta.svg';
import ConsultasMarcadasImg from '../assets/svg/ConsultasMarcadas.svg';
import CruzVermelha from '../assets/svg/cruzVermelha.svg';
import PilulaCompromido from '../assets/svg/pilula-e-comprimido.svg';
import QuimioTerapia from '../assets/svg/quimioterapia.svg';
import Lembrete from '../assets/svg/lembrete.svg';
import Avatar from '../assets/svg/avatar.svg';
import Hospital from '../assets/svg/hospital.svg';
import Equipe from '../assets/svg/trabalho-em-equipe.svg';
import LupaImg from '../assets/svg/Lupa.svg';
import LembreteImg from '../assets/svg/lembrete.svg';
import HospitalLocationSvg from '../assets/svg/hospitalLocation.svg';
import FotoClick from '../assets/svg/foto.svg';
import PilulaComprimidoImg from '../assets/svg/pilula-e-comprimido.svg';
import { RFValue } from "react-native-responsive-fontsize";

export default function MyHeaderDashBoard({ onPress, title }) {

    const size = Dimensions.get('screen').width / 10

    const setIcone = () => {
        switch (title) {
            case 'Agendar Consulta':
                return <AgendarConsultaImg fill={'#748080'} width={size} height={size} />
                break;
            case 'Convênios':
                return <CruzVermelha fill={'#748080'} width={size} height={size} />
                break;
            case 'Minhas Consultas':
                return <ConsultasMarcadasImg fill={'#748080'} width={size} height={size} />
                break;
            case 'MedicamentosRotina':
                return <PilulaCompromido fill={'#748080'} width={size} height={size} />
                break;
            case 'Medicamentos':
                return <PilulaComprimidoImg fill={'#748080'} width={size} height={size} />
                break;
            case 'Medicamentos ativos':
                return <PilulaComprimidoImg fill={'#748080'} width={size} height={size} />
                break;
            case 'Adicionar Medicamentos':
                return <PilulaComprimidoImg fill={'#748080'} width={size} height={size} />
                break;
            case 'Editar medicamento':
                return <PilulaComprimidoImg fill={'#748080'} width={size} height={size} />
                break;
            case 'LembretesNotificacoes':
                return <Lembrete fill={'#748080'} width={size} height={size} />
                break;
            case 'Perfil':
                return <Avatar fill={'#748080'} width={size} height={size} />
                break;
            case 'Nossas Unidades':
                return <Hospital fill={'#748080'} width={size} height={size} />
                break;
            case 'Unidades':
                return <Hospital fill={'#748080'} width={size} height={size} />
                break;
            case 'Equipe Médica':
                return <Equipe fill={'#748080'} width={size} height={size} />
                break;
            case 'Busca':
                return <LupaImg fill={'#748080'} width={size - 10} height={size - 10} />
                break;
            case 'Lembrete e Notificações':
                return <LembreteImg fill={'#748080'} width={size} height={size} />
                break;
            case 'Unidades de Atendimento':
                return <HospitalLocationSvg fill={'#748080'} width={size} height={size} />
                break;
            case 'Informacoes Pessoais':
                return <Avatar fill={'#748080'} width={size} height={size} />
                break;
            case 'Dados de Contato':
                return <Avatar fill={'#748080'} width={size} height={size} />
                break;
            case 'Credenciais':
                return <Avatar fill={'#748080'} width={size} height={size} />
                break;
            case 'Alterar senha':
                return <Avatar fill={'#748080'} width={size} height={size} />
                break;
            case 'Atualizar Email':
                return <Avatar fill={'#748080'} width={size} height={size} />
                break;
            case 'Atualizar Celular':
                return <Avatar fill={'#748080'} width={size} height={size} />
                break;
            case 'Foto perfil':
                return <FotoClick fill={'#748080'} width={size} height={size} />
                break;
            default:
                return <AgendarConsultaImg fill={'#748080'} width={size} height={size} />
                break;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.box1} />
            <View style={styles.box2}>
                <View style={styles.item1}>
                    <Text style={styles.title}>{title}</Text>
                    {setIcone()}
                </View>
                <View style={styles.item2}>
                    <MyBackButton onPress={onPress} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: (Dimensions.get('window').height / 100 * 9),
        backgroundColor: '#E6ECEC',
    },
    box1: {
        backgroundColor: 'green'
    },
    box2: {
        flex: 2,
        ...Platform.select({
            ios: {
                backgroundColor: '#fff',
            },
            android: {
                backgroundColor: '#fff',
            },
            default: {
                backgroundColor: '#fff',
            }
        }),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    item1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 5
    },
    item2: {
        flex: 0.5,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    title: {
        fontSize: RFValue(20, 680),
        color: '#666666',
        fontWeight: 'bold',
    },
    img: {
        width: 40,
        height: 40
    }
})
