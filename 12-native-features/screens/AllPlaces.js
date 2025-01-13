import { useEffect, useState } from 'react';
import PlacesList from '../components/Places/PlacesList';
import { useIsFocused } from '@react-navigation/native';
import { fetchPlaces } from '../util/database';

const AllPlaces = ({ route }) => {
  const isFocused = useIsFocused();

  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const places = await fetchPlaces();
        console.log('PLACES: ', places);
        setLoadedPlaces(places);
      } catch (error) {
        console.log('ERROR: ', error);
      }
    };
    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces(prevState => [...prevState, route.params.place]);
    }
  }, [isFocused]);
  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
