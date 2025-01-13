import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';

import { Colors } from '../../constants/colors';
import { Place } from '../../models/place.model';

const PlaceForm = ({ onCreatePlace }) => {
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  const titleChangeHandler = enteredValue => {
    setTitle(enteredValue);
  };

  const takeImageHandler = imageUrl => {
    setSelectedImage(imageUrl);
  };

  const pickLocationHandler = useCallback(location => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    const placeData = new Place(title, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  };
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={titleChangeHandler}
          value={title}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
    color: Colors.primary500
  },
  input: {
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary700,
    fontSize: 16,
    backgroundColor: Colors.primary100
  }
});

export default PlaceForm;
