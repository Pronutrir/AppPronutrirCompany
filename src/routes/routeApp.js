import * as React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Home from '../pages/home/home';
import Teste from '../pages/teste';
import ConsultaCpf from '../pages/consultaCPF/consultaCpf';
import MyHeader from '../componentes/MyHeader';
import ValidacaoSmsEmail from '../pages/validacaoSmsEmail/validacaoSmsEmail';
import Login from '../pages/login/login';
import Cadastro from '../pages/cadastro/cadastro';
import ConsultaNome from '../pages/consultarNome/consultarNome';
import consultarNascimento from '../pages/consultarNascimento/consultaNascimento';
import ConsultaEmail from '../pages/consultarEmail/consultaEmail';
import ConsultaConfimarEmail from '../pages/consultarConfimarEmail/consultaConfirmarEmail';
import ConsultaCelular from '../pages/consultarCelular/consultaCelular';
import ConsultarSenha from '../pages/consultarSenha/consultarSenha';
import ConsultarConfirmarSenha from '../pages/consultarConfimarSenha/consultarConfimarSenha';
import RecuperarSenha from '../pages/recuperarSenha/recuperarSenha';

import { TransitionPresets } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function routeApp() {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerStatusBarHeight : 0,
                //cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                ...TransitionPresets.SlideFromRightIOS,
                headerShown:false,
                header: ({ navigation, scene }) => {
                    let routeName = scene.route.name;
                    return (
                        <MyHeader
                            transparent={true}
                            onPress={() => navigation.goBack()}
                        />
                    )
                }
            }}
        >
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='ConsultaCpf'
                component={ConsultaCpf}
            />
            <Stack.Screen
                name='ValidacaoSmsEmail'
                component={ValidacaoSmsEmail}
            />
            <Stack.Screen
                name='Teste'
                component={Teste}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Login'
                component={Login}
            />
            <Stack.Screen
                name='Cadastro'
                component={Cadastro}
            />
            <Stack.Screen
                name='ConsultaNome'
                component={ConsultaNome}
            />
             <Stack.Screen
                name='consultarNascimento'
                component={consultarNascimento}
            />
            <Stack.Screen
                name='ConsultaEmail'
                component={ConsultaEmail}
            />
            <Stack.Screen
                name='ConsultaConfimarEmail'
                component={ConsultaConfimarEmail}
            />
             <Stack.Screen
                name='ConsultaCelular'
                component={ConsultaCelular}
            />
            <Stack.Screen
                name='ConsultarSenha'
                component={ConsultarSenha}
            />
             <Stack.Screen
                name='ConsultarConfirmarSenha'
                component={ConsultarConfirmarSenha}
            />
            <Stack.Screen
                name='RecuperarSenha'
                component={RecuperarSenha}
            />
        </Stack.Navigator>
    )
}
