import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button, Platform, FlatList} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import HeaderButton from '../components/HeaderButton'
import PlaceItem from '../components/PlaceItem'
import * as placesActions from '../store/places-actions';


const PlaceOverview = props => {
    const dispatch = useDispatch()
    const places = useSelector(state => state.places.places);

    useEffect(() => {
        dispatch(placesActions.loadPlaces())
    }, [dispatch]);

    return (
        <FlatList 
            data={places} 
            keyExtractor={item=>item.id} 
            renderItem={itemData => (
            <PlaceItem 
            image={itemData.item.imageUri} 
            title={itemData.item.title} 
            address={itemData.item.address} 
            onSelect={() => {
                props.navigation.navigate('Details', {
                    placeTitle: itemData.item.title, 
                    placeId: itemData.item.id
                })
            }}/>)}
        />
    )
}

PlaceOverview.navigationOptions = navData =>{
    return {
        headerTitle: 'All Places',
        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Add Place' iconName={Platform.OS === 'andriod' ? 'md-add' : 'ios-add'}
            onPress={() => {
                navData.navigation.navigate('Create')
            }}/>
        </HeaderButtons>)
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default PlaceOverview