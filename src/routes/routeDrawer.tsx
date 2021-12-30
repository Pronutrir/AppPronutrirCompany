import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyDrawerContent from '../componentes/MyDrawerContent';
import { InitialStackNavigator } from './routeDashboard';

const Drawer = createDrawerNavigator();

const RouteDrawer: React.FC = () => {
    return (
        <Drawer.Navigator
            drawerContent={({ navigation }) => (
                <MyDrawerContent navigation={navigation} />
            )}
            drawerStyle={{
                flex: 1,
            }}>
            <Drawer.Screen name="dashborad" component={InitialStackNavigator} />
        </Drawer.Navigator>
    );
};

export default RouteDrawer;
