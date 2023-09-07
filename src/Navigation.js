import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Demo1 from "./Demo1";
import Welcome from "./Welcome";
import Demo2 from "./Demo2";

const Stack = createStackNavigator();

const Navigation = () =>
{
    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName='Welcome'
                screenOptions={{
                    headerShown: false,
                }}>
                
                <Stack.Screen
                    name='Welcome'
                    component={Welcome}
                    options={{ title: 'Welcome' }}
                />

                <Stack.Screen
                    name='Demo1'
                    component={Demo1}
                    options={{ title: 'Demo1' }}
                />

                <Stack.Screen
                    name='Demo2'
                    component={Demo2}
                    options={{ title: 'Demo2' }}
                />


            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigation;