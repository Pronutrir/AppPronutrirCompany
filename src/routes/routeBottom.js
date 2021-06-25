import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BuscaStackNavigator, UserStackNavigator, DashBoardNavigator } from '../routes/routeDashboard';
import DrawerOpen from '../componentes/DrawerOpen';
import HomeImg from '../assets/svg/Home.svg';
import LupaImg from '../assets/svg/Lupa.svg';
import UserImg from '../assets/svg/avatar.svg';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { Dimensions } from 'react-native';

const Tab = createBottomTabNavigator()

export default function routeBottom() {

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
                labelStyle:{fontSize: RFValue(12, 680), paddingBottom: 5},
                style:{height: RFPercentage(7, 680)}
            }}
             screenOptions={({ route }) => ({  
                tabBarIcon: ({ color }) => {
                    let size = RFPercentage(3, 680);
                    switch (route.name) {
                        case 'Inicio': return <HomeImg fill={color} width={size} height={size} />
                            break;
                        case 'Busca': return <LupaImg fill={color} width={size} height={size} />
                            break;
                        case 'Perfil': return <UserImg fill={color} width={size} height={size} />
                            break;
                    }
                }
            })}
        >
            <Tab.Screen
                name='Menu'
                component={DrawerOpen}
                options={() => ({
                    tabBarButton: props => (<DrawerOpen style={props}/>),
                })}
            />
            <Tab.Screen
                name='Inicio'
                component={DashBoardNavigator}
                /* options={({ route }) => ({
                    tabBarVisible: tabBarVisibility(route)
                })} */
            />
            <Tab.Screen
                name='Busca'
                component={BuscaStackNavigator}
            />
            <Tab.Screen
                name='Perfil'
                component={UserStackNavigator}
                //options={{ tabBarVisible: false }}
            />
        </Tab.Navigator>
    )
}