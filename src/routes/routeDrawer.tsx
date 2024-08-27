import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DrawerContent from '../components/drawerContent/DrawerContent';
import { CirculacaoInternaStackNavigation, EvolucaoStackNavigation, InitialStackNavigator, PainelSenhaStackNavigation, SinaisVitaisStackNavigation, StopwatchStackNavigation, TratamentoQuimioStackNavigation } from './routeDashboard';

const Drawer = createDrawerNavigator();

const RouteDrawer: React.FC = () => {
    return (
        <Drawer.Navigator
            initialRouteName='Tab'
            drawerContent={(props: DrawerContentComponentProps) => <DrawerContent {...props} />}
            screenOptions={{ drawerStyle: { flex: 1, width: RFPercentage(40) } }}
        >
            <Drawer.Screen name="Home" component={InitialStackNavigator} options={{ headerShown: false }} />
            <Drawer.Screen name="SinaisVitais" component={SinaisVitaisStackNavigation} options={{ headerShown: false }} />
            <Drawer.Screen name="Evolucao" component={EvolucaoStackNavigation} options={{ headerShown: false }} />
            <Drawer.Screen name="CirculacaoInterna" component={CirculacaoInternaStackNavigation} options={{ headerShown: false }} />
            <Drawer.Screen name="Tratamento_quimio" component={TratamentoQuimioStackNavigation} options={{ headerShown: false }} />
            <Drawer.Screen name="PainelSenha" component={PainelSenhaStackNavigation} options={{ headerShown: false }} />
            <Drawer.Screen name="Stopwatch" component={StopwatchStackNavigation} options={{ headerShown: false }} />
            <Drawer.Screen name="EvolucaoEnfermagem" component={EvolucaoStackNavigation} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};

export default RouteDrawer;
