import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    BuscaStackNavigator,
    UserStackNavigator,
    DashBoardNavigator,
} from './routeDashboard';
import DrawerOpen from '../components/drawerOpen/DrawerOpen';
import HomeImg from '../assets/svg/Home.svg';
import LupaImg from '../assets/svg/Lupa.svg';
import UserImg from '../assets/svg/avatar.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import useTheme from '../hooks/useTheme';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const RouteBottom: React.FC = () => {
    const theme = useTheme();
    /* const tabBarVisibility = ( route ) => {
        const routeName = route.state
        ? route.state.routes[route.state.index].name
        : '';

        if(routeName === 'AddMedicamentos'){
            return false
        }
        return true;
    }  */

    return (
        <Tab.Navigator
            initialRouteName={'Inicio'}
            tabBarOptions={{
                activeTintColor: theme.colors.GREENPRIMARY,
                labelPosition: 'below-icon',
                /* style: { height: RFPercentage(7) }, */
            }}
            screenOptions={({ route }) => ({
                tabBarLabel: ({ color }) => {
                    return (
                        <Text
                            style={{
                                color: color,
                                /* paddingBottom: 5, */
                                fontSize: theme.typography.SIZE.fontysize12,
                                fontFamily: theme.typography.FONTES.Regular,
                                letterSpacing: theme.typography.LETTERSPACING.S,
                            }}>
                            {route.name}
                        </Text>
                    );
                },
                tabBarIcon: ({ color }) => {
                    const size = RFPercentage(2);
                    switch (route.name) {
                        case 'Inicio':
                            return (
                                <HomeImg
                                    fill={color}
                                    width={size}
                                    height={size}
                                />
                            );

                        case 'Busca':
                            return (
                                <LupaImg
                                    fill={color}
                                    width={size}
                                    height={size}
                                />
                            );

                        case 'Perfil':
                            return (
                                <UserImg
                                    fill={color}
                                    width={size}
                                    height={size}
                                />
                            );
                    }
                },
            })}>
            <Tab.Screen
                name="Menu"
                component={DrawerOpen}
                options={() => ({
                    tabBarButton: () => <DrawerOpen />,
                })}
            />
            <Tab.Screen
                name="Inicio"
                component={DashBoardNavigator}
                /* options={({ route }) => ({
                    tabBarVisible: tabBarVisibility(route)
                })} */
            />
            <Tab.Screen name="Busca" component={BuscaStackNavigator} />
            <Tab.Screen
                name="Perfil"
                component={UserStackNavigator}
                //options={{ tabBarVisible: false }}
            />
        </Tab.Navigator>
    );
};

export default RouteBottom;
