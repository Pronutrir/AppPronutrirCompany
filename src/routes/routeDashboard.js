import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import DashBoard from '../pages/dashBoard/dashBoard';
import AgendarConsultas01 from '../pages/agendarConsultas/agerdarConsulta01/agendarConsultas01';
import AgendarConsultas02 from '../pages/agendarConsultas/agendarConsulta02/agendarConsulta02';
import AgendarConsultas03 from '../pages/agendarConsultas/agendarconsulta03/agendarConsulta03';
import AgendarConsultas04 from '../pages/agendarConsultas/agendarconsulta04/agendarConsulta04';
import ConsultasMarcadas from '../pages/consultasMarcadas/consultasMarcadas';
import ConsultasRecentes from '../pages/consultasRecentes/consultasRecentes';
import FalarMedico from '../pages/falarMedico/falarMedico';
import LembretesNotificacoes from '../pages/LembretesNotificacoes/lembretesNotificacoes';
import MedicamentosRecente from '../pages/medicamentosRecentes/medicamentosRecentes';
import Medicamentos from '../pages/medicamentos/medicamentos';
import MyHeaderDashBoard from '../componentes/MyHeaderDashBoard';
import AddConvenio from '../pages/convenios/addConvenio/addConvenio';
import ListaConvenios from '../pages/convenios/listaConvenios/listaConvenios';
import Perfil from '../pages/perfil/perfil';
import Terapia from '../pages/Terapia/terapia';
import User from '../pages/perfil/perfil';
import Busca from '../pages/busca/busca';
import EquipeMedica from '../pages/equipeMedica/equipeMedica';
import Equipe from '../pages/equipeMedica/equipe/equipe';
import Unidades from '../pages/Unidades/unidades';
import InformacoesPessoais from '../pages/perfil/informacoesPessoais/informacoesPessoais';
import DadosContato from '../pages/perfil/dadosContato/dadosContato';
import Credenciais from '../pages/perfil/credenciais/credenciais';
import AlterarSenha from '../pages/perfil/alteracaoSenha/alterarSenha';
import AtualizarEmail from '../pages/perfil/dadosContato/atualizarEmail';
import AtualizarCelular from '../pages/perfil/dadosContato/atualizarCelular';
import RecuperarSenha from '../pages/recuperarSenha/recuperarSenha';
import menuUnidades from '../pages/Unidades/menuUnidades';
import { AgendaConsultasProvider } from '../contexts/agendaConsultas';
import { MedicamentosProvider } from '../contexts/medicamentos';
import CameraPerson from '../pages/cameraPerson/cameraPerson';
import AddMedicamentos from '../pages/medicamentos/addMedicamentos/addMedicamentos';
import MedicamentosAtivos from '../pages/medicamentos/MedicamentosAtivos/MedicamentosAtivos';
import updateMedicamento from '../pages/medicamentos/updateMedicamento/updateMedicamento';

import RouteBottom from '../routes/routeBottom';

const Stack = createStackNavigator();

const InitialStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={'DashBoard'}
            headerMode={'screen'}
            screenOptions={{
                header: ({ navigation, scene }) => {
                    const { options } = scene.descriptor;
                    const Title = options.title ? options.title : null
                    return (
                        <MyHeaderDashBoard onPress={() => navigation.goBack()} title={Title} />
                    )
                }
            }}
        >
            <Stack.Screen
                name='RouteBottom'
                component={RouteBottom}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='InformacoesPessoais'
                component={InformacoesPessoais}
                options={{ title: 'Informações Pessoais' }}
            />
            <Stack.Screen
                name='DadosContato'
                component={DadosContato}
                options={{ title: 'Dados de Contato' }}
            />
            <Stack.Screen
                name='Credenciais'
                component={Credenciais}
                options={{ title: 'Credenciais' }}
            />
            <Stack.Screen
                name='AlterarSenha'
                component={AlterarSenha}
                options={{ title: 'Alterar senha' }}
            />
            <Stack.Screen
                name='AtualizarEmail'
                component={AtualizarEmail}
                options={{ title: 'Atualizar Email' }}
            />
            <Stack.Screen
                name='AtualizarCelular'
                component={AtualizarCelular}
                options={{ title: 'Atualizar Celular' }}
            />
            <Stack.Screen
                name='RecuperarSenha'
                component={RecuperarSenha}
                options={{ title: 'Recuperar Senha', headerShown: false, }}
            />
            <Stack.Screen
                name='CameraPerson'
                component={CameraPerson}
                options={{ title: 'Foto perfil' }}
            />
        </Stack.Navigator>
    )
}

const DashBoardNavigator = () => {
    return (
        <AgendaConsultasProvider>
            <MedicamentosProvider>
                <Stack.Navigator
                    screenOptions={{
                        header: ({ navigation, scene }) => {
                            const { options } = scene.descriptor;
                            const Title = options.title ? options.title : null
                            return (
                                <MyHeaderDashBoard onPress={() => navigation.goBack()} title={Title} />
                            )
                        }
                    }}
                >
                    <Stack.Screen
                        name='DashBoard'
                        component={DashBoard}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='AgendarConsultas01'
                        component={AgendarConsultas01}
                        options={{ title: 'Agendar Consulta' }}
                    />
                    <Stack.Screen
                        name='AgendarConsultas02'
                        component={AgendarConsultas02}
                        options={{ title: 'Agendar Consulta', cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}
                    />
                    <Stack.Screen
                        name='AgendarConsultas03'
                        component={AgendarConsultas03}
                        options={{ title: 'Agendar Consulta', cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}
                    />
                    <Stack.Screen
                        name='AgendarConsultas04'
                        component={AgendarConsultas04}
                        options={{ title: 'Agendar Consulta', cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}
                    />
                    <Stack.Screen
                        name='ConsultasMarcadas'
                        component={ConsultasMarcadas}
                        options={{ title: 'Minhas Consultas' }}
                    />
                    <Stack.Screen
                        name='ConsultasRecentes'
                        component={ConsultasRecentes}
                        options={{ title: 'Consultas Recentes' }}
                    />
                    <Stack.Screen
                        name='FalarMedico'
                        component={FalarMedico}
                        options={{ title: 'Falar Medico' }}
                    />
                    <Stack.Screen
                        name='LembretesNotificacoes'
                        component={LembretesNotificacoes}
                        options={{ title: 'Lembrete e Notificações' }}
                    />
                    <Stack.Screen
                        name='MedicamentosRecente'
                        component={MedicamentosRecente}
                    />
                    <Stack.Screen
                        name='AddConvenio'
                        component={AddConvenio}
                        options={{ title: 'Convênios' }}
                    />
                    <Stack.Screen
                        name='ListaConvenios'
                        component={ListaConvenios}
                        options={{ title: 'Convênios' }}
                    />
                    <Stack.Screen
                        name='Perfil'
                        component={Perfil}
                        options={{ title: 'Perfil' }}
                    />
                    <Stack.Screen
                        name='Terapia'
                        component={Terapia}
                        options={{ title: 'Terapia' }}
                    />
                    <Stack.Screen
                        name='EquipeMedica'
                        component={EquipeMedica}
                        options={{ title: 'Unidades' }}
                    />
                    <Stack.Screen
                        name='Equipe'
                        component={Equipe}
                        options={{ title: 'Equipe Médica' }}
                    />
                    <Stack.Screen
                        name='Unidades'
                        component={Unidades}
                        options={{ title: 'Unidades de Atendimento' }}
                    />
                    <Stack.Screen
                        name='menuUnidades'
                        component={menuUnidades}
                        options={{ title: 'Unidades de Atendimento' }}
                    />
                    <Stack.Screen
                        name='Medicamentos'
                        component={Medicamentos}
                        options={{ title: 'Medicamentos' }}
                    />
                    <Stack.Screen
                        name='AddMedicamentos'
                        component={AddMedicamentos}
                        options={{ title: 'Adicionar Medicamentos' }}
                    />
                    <Stack.Screen
                        name='MedicamentosAtivos'
                        component={MedicamentosAtivos}
                        options={{ title: 'Medicamentos ativos' }}
                    />
                    <Stack.Screen
                        name='updateMedicamento'
                        component={updateMedicamento}
                        options={{ title: 'Editar medicamento' }}
                    />
                </Stack.Navigator>
            </MedicamentosProvider>
        </AgendaConsultasProvider>
    )
}

const BuscaStackNavigator = () => {
    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    header: ({ navigation, scene }) => {
                        const { options } = scene.descriptor;
                        const Title = options.title ? options.title : null
                        return (
                            <MyHeaderDashBoard onPress={() => navigation.goBack()} title={Title} />
                        )
                    }
                }}
            >
                <Stack.Screen
                    name='Busca'
                    component={Busca}
                    options={{ title: 'Busca' }}
                />
            </Stack.Navigator>
        </>
    )
}

const UserStackNavigator = () => {
    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    header: ({ navigation, scene }) => {
                        const { options } = scene.descriptor;
                        const Title = options.title ? options.title : null
                        return (
                            <MyHeaderDashBoard onPress={() => navigation.goBack()} title={Title} />
                        )
                    }
                }}
            >
                <Stack.Screen
                    name='Perfil'
                    component={User}
                    options={{ title: 'Perfil' }}
                />
            </Stack.Navigator>
        </>
    )
}

export {
    InitialStackNavigator,
    BuscaStackNavigator,
    UserStackNavigator,
    DashBoardNavigator
}
