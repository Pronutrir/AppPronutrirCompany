import React, { useContext } from 'react';
import RouteApp from './routeApp';
import { Platform, StatusBar } from 'react-native';
import AuthContext from '../contexts/auth';
import RouteDrawer from './routeDrawer';
import Inicial from '../pages/inicial/inicial';
import { SinaisVitaisProvider } from '../contexts/sinaisVitaisContext';
import useTheme from '../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index: React.FC = () => {
    const theme = useTheme();
    const { signed, loading } = useContext(AuthContext);

    return loading ? (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.colors.BACKGROUND_2 }}
            edges={['left']}>
            <StatusBar
                backgroundColor={theme.colors.BACKGROUND_1}
                barStyle="dark-content"
                translucent={true}
            />
            <Inicial />
        </SafeAreaView>
    ) : signed ? (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.colors.BACKGROUND_2,
            }}
            edges={['top']}>
            <StatusBar
                backgroundColor={theme.colors.BACKGROUND_2}
                barStyle="dark-content"
                translucent={true}
            />
            <SinaisVitaisProvider>
                <RouteDrawer />
            </SinaisVitaisProvider>
        </SafeAreaView>
    ) : (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.colors.BACKGROUND_1 }}
            edges={Platform.OS == 'android' ? ['top'] : ['bottom', 'top']}>
            <StatusBar
                backgroundColor={'white'}
                barStyle="dark-content"
                translucent={false}
            />
            <RouteApp />
        </SafeAreaView>
    );
};

export default Index;
