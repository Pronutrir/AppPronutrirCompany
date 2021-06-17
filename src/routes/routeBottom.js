import React from 'react';
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BuscaStackNavigator, UserStackNavigator, DashBoardNavigator } from '../routes/routeDashboard';
import DrawerOpen from '../componentes/DrawerOpen';
import HomeImg from '../assets/svg/Home.svg';
import LupaImg from '../assets/svg/Lupa.svg';
import UserImg from '../assets/svg/avatar.svg';
import { RFValue } from "react-native-responsive-fontsize";

const Tab = createBottomTabNavigator()

export default function routeBottom() {

    const size = Dimensions.get('screen').width / 20
    const sizeBottom = Dimensions.get('screen').height / 15

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
                labelStyle:{fontSize: RFValue(12, 680)}
            }}
             screenOptions={({ route }) => ({  
                tabBarIcon: ({ color }) => {
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