import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/drawerContent/DrawerContent';
import { InitialStackNavigator } from './routeDashboard';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Drawer = createDrawerNavigator();

const RouteDrawer: React.FC = () => {
    return (
        <Drawer.Navigator
            drawerContent={({ navigation }) => (
                <DrawerContent navigation={navigation} />
            )}
            drawerStyle={{ 
                flex: 1,
                width: RFPercentage(40),
            }}>
            <Drawer.Screen name="dashborad" component={InitialStackNavigator} />
        </Drawer.Navigator>
    );
};

export default RouteDrawer;
