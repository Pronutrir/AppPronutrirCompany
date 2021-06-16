import React, { useContext } from 'react';
import RouteApp from './routeApp';
import { StatusBar } from 'react-native';

import AuthContext from '../contexts/auth';
import RouteDrawer from '../routes/routeDrawer';
import Inicial from '../pages/inicial/inicial';
import { AgendaConsultasProvider } from '../contexts/agendaConsultas';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function index() {

    const { signed, loading } = useContext(AuthContext);

    return (
        loading ?
            <>
                <SafeAreaView style={{ flex: 0, backgroundColor: 'transparent' }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: '#797979' }}>
                    <StatusBar backgroundColor={'#fff'} barStyle='dark-content' translucent={true} />
                    <Inicial />
                </SafeAreaView>
            </>
            : signed ?
                <>
                    <AgendaConsultasProvider>
                        <SafeAreaView style={{ flex: 0, backgroundColor: '#E6ECEC' }} />
                        <SafeAreaView style={{ flex: 1, backgroundColor: '#797979' }}>
                            <StatusBar backgroundColor={'#E6ECEC'} barStyle='dark-content' translucent={true} />
                            <RouteDrawer />
                        </SafeAreaView>
                    </AgendaConsultasProvider>
                </>
                :
                <>
                    <SafeAreaView style={{ flex: 0, backgroundColor: 'transparent' }} />
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#797979' }}>
                        <StatusBar backgroundColor={'#fff'} barStyle='dark-content' translucent={true} />
                        <RouteApp />
                    </SafeAreaView>
                </>
    )
}
