import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    BuscaStackNavigator,
    UserStackNavigator,
    DashBoardNavigator,
} from './routeDashboard';
import DrawerOpen from '../componentes/DrawerOpen';
import HomeImg from '../assets/svg/Home.svg';
import LupaImg from '../assets/svg/Lupa.svg';
import UserImg from '../assets/svg/avatar.svg';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

const Tab = createBottomTabNavigator();

const RouteBottom: React.FC = () => {
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
                activeTintColor: '#08948A',
                labelPosition: 'below-icon',
                labelStyle: { fontSize: RFValue(12, 680), paddingBottom: 5 },
                style: { height: RFPercentage(7) },
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    const size = RFPercentage(3);
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
