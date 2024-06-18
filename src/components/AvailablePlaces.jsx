import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import fetchAvailablePlaces from '../http.js';

export default function AvailablePlaces({ onSelectPlace}) {

  // here we fetch the data from the backend 
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [fetching, setisFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      setisFetching(true);

      try {

        const places = await fetchAvailablePlaces();

        // we first calculate the location of the user 
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces)
          setisFetching(false);
        })
      } catch (error) {
        setError({
          message: error.message || "The places could not be fetched"
        });
        setisFetching(false);
      }
    }

    fetchPlaces();
  }, [])

  if (error) {
    return <Error title="An error occured" message={error.message}/>
  }


  return (
    <Places
      title="Available Places"
      isLoading={fetching}
      places={availablePlaces}
      loadingText="Fertching the places data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

