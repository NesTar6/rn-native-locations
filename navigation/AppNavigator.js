import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'


import PlaceOverview from '../screens/PlaceOverview';
import PlaceDetails from '../screens/PlaceDetails';
import PlaceCreate from '../screens/PlaceCreate';
import MapScreen from '../screens/MapScreen';
import { Platform } from 'react-native';

import Colors from '../constants/Colors';
import { createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator({
    Overview: PlaceOverview,
    Details: PlaceDetails,
    Create: PlaceCreate,
    Map: MapScreen
    
}, 
{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'andriod' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'andriod' ? 'white' : Colors.primary
    }
});

export default createAppContainer(AppNavigator)