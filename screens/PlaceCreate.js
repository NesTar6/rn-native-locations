import React, {useState, useCallback} from 'react';
import {ScrollView,View, Button, Text, StyleSheet, TextInput} from 'react-native'
import Colors from '../constants/Colors'
import {useDispatch} from 'react-redux'
import * as placesActions from '../store/places-actions'
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const PlaceCreate = props => {
    
    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch()

    const titleChangeHandler = text => {
        setTitleValue(text)
    }

    const locationPickedHandler = useCallback(location => {
        setSelectedLocation(location)
    }, []);

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation))
        props.navigation.goBack()
    }

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    }

    return (
    <ScrollView>
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={titleChangeHandler}
                value={titleValue}
            />
        <ImagePicker onImageTaken={imageTakenHandler}/>
        <LocationPicker 
          navigation={props.navigation} 
          onLocationPicked={locationPickedHandler}/>
        <Button 
        title="Save Place" 
        color={Colors.primary}
        onPress={savePlaceHandler}
        />
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin:30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
})

PlaceCreate.navigationOptions = {
    headerTitle: "Add Place"
};

export default PlaceCreate