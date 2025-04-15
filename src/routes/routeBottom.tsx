import React from 'react';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
    BuscaStackNavigator,
    UserStackNavigator,
} from './routeDashboard';

import MyTabBar from '../components/tabBar/MyTabBar';
import DashBoard from '../pages/dashBoard/dashBoard';


const Tab = createBottomTabNavigator();

export default function RouteBottom() {
    return (
        <Tab.Navigator initialRouteName='inicio' tabBar={(props: BottomTabBarProps) => <MyTabBar {...props} />}>
            <Tab.Screen
                name="menu"
                component={DashBoard}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="inicio"
                component={DashBoard}
                options={{
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="busca"
                component={BuscaStackNavigator}
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tab.Screen
                name="perfil"
                component={UserStackNavigator}
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            />
        </Tab.Navigator>
    )
}
