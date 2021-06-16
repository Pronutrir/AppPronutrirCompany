import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RouteBottom from '../routes/routeBottom';
import MyDrawerContent from '../componentes/MyDrawerContent';
import { InitialStackNavigator } from '../routes/routeDashboard';

const Drawer = createDrawerNavigator();

export default function routeDrawer() {

    return (
        <Drawer.Navigator
            drawerContent={({ navigation }) => <MyDrawerContent navigation={navigation} />}
            drawerStyle={{
                flex: 1
            }}
        >
            <Drawer.Screen
                name='dashborad'
                component={InitialStackNavigator}
            />
        </Drawer.Navigator>
    )
}
