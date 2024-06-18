import { useEffect, useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace}) {

  // here we fetch the data from the backend 
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [fetching, setisFetching] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      setisFetching(true);
      const response = await fetch("http://localhost:3000/places")
      const resData = await response.json()
      setAvailablePlaces(resData.places)
      setisFetching(false);
    }
    
    fetchPlaces();
  }, [])


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
