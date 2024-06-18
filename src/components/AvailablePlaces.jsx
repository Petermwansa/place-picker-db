import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace}) {

  // here we fetch the data from the backend 
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [fetching, setisFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      setisFetching(true);

      try {
        const response = await fetch("http://localhost:3000/placess")
        const resData = await response.json()
  
        if (!response.ok) {
          throw new Error('failed to fetch the places')
        }

        setAvailablePlaces(resData.places)
      } catch (error) {
        setError({
          message: error.message || "The places could not be fetched"
        });
      }


      setisFetching(false);
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

