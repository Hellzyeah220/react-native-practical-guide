import { StyleSheet } from 'react-native';

import PlaceForm from '../components/Places/PlaceForm';

import { insertPlace } from '../util/database';

const AddPlace = ({ navigation }) => {
  const createPlaceHandler = async place => {
    try {
      const result = await insertPlace(place);
      console.log('RESULT: ', result);

      navigation.popTo('AllPlaces');
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

const styles = StyleSheet.create({});

export default AddPlace;
