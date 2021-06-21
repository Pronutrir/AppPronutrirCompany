import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BuscaStackNavigator, UserStackNavigator, DashBoardNavigator } from '../routes/routeDashboard';
import DrawerOpen from '../componentes/DrawerOpen';
import HomeImg from '../assets/svg/Home.svg';
import LupaImg from '../assets/svg/Lupa.svg';
import UserImg from '../assets/svg/avatar.svg';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

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
                labelStyle:{fontSize: RFValue(14, 680)},
                style:{height: RFPercentage(8, 680)}
            }}
             screenOptions={({ route }) => ({  
                tabBarIcon: ({ color }) => {
                    switch (route.name) {
                        case 'Inicio': return <HomeImg fill={color} width={RFPercentage(4, 680)} height={RFPercentage(4, 680)} />
                            break;
                        case 'Busca': return <LupaImg fill={color} width={RFPercentage(4, 680)} height={RFPercentage(4, 680)} />
                            break;
                        case 'Perfil': return <UserImg fill={color} width={RFPercentage(4, 680)} height={RFPercentage(4, 680)} />
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