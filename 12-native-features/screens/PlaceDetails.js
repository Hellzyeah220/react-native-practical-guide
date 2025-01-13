import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import OutlinedButton from '../components/UI/OutlinedButton';

import { Colors } from '../constants/colors';
import { fetchPlace } from '../util/database';

const PlaceDetails = ({ navigation, route }) => {
  const { placeId } = route.params ?? {};

  const [fetchedPlace, setFetchedPlace] = useState();

  const showOnMapHandler = () => {
    navigation.push('Map', {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng
    });
  };

  console.log('FETCHED: ', fetchedPlace);

  useEffect(() => {
    const loadPlace = async () => {
      const placeData = await fetchPlace(placeId);
      console.log('RESULT: ', placeData);

      setFetchedPlace(placeData);
      navigation.setOptions({
        title: placeData.title
      });
    };
    loadPlace();
  }, [placeId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUrl }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon='map' onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%'
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressContainer: {
    padding: 20
  },
  address: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.primary500
  }
});

export default PlaceDetails;
