import React, { useEffect } from 'react';
import Routes from './routes/index';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/auth';
import { NotificationGlobalProvider } from './contexts/notificationGlobalContext';
import NotificationAlert from './components/Notification/NotificationAlert';
import NotificationCentralized from './components/Notification/NotificationCentralized';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from './contexts/themeContext';
import CodePush from 'react-native-code-push';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PrintBluetoothProvider } from './contexts/printBluetoothContext';

// Create a client
const queryClient = new QueryClient();

const CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    appendReleaseDescription: true,
    title: 'Uma nova atualização está disponível!',
  },
};

const Index: React.FC = () => {

  useEffect(() => {
    // @ts-expect-error: Unreachable code error
    Text.defaultProps = Text.defaultProps || {};
    // Ignore dynamic type scaling on iOS
    // @ts-expect-error: Unreachable code error
    Text.defaultProps.allowFontScaling = false;

  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* contexto disponível para toda aplicação */}
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <NotificationGlobalProvider>
              <AuthProvider>
                <PrintBluetoothProvider>
                  <Routes />
                </PrintBluetoothProvider>
                <NotificationCentralized />
                <NotificationAlert />
              </AuthProvider>
            </NotificationGlobalProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default CodePush(CodePushOptions)(Index);
