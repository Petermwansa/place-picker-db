// export default async function fetchAvailablePlaces() {
//     const response = await fetch("http://localhost:3000/places");
//     const resData = await response.json();

//     if (!response.ok) {
//       throw new Error('failed to fetch the places');
//     }
//     return resData.places;
// }

// // this function will be responsible for updating the UserActivation's places in the db 
// export async function updateUserPlaces() {
//     // we add the second arg {} to the fetch which allows you to config the outgoing req 
//     const response = await fetch('http://localhost:3000/user-places', {
//         method: 'PUT',
//         body: JSON.stringify({places: places}),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });

//     const resData = await response.json();

//     if (!response.ok) {
//         throw new Error('Failed to update the user data');
//     }

//     return resData.message;
// }


// // we put this code here so that we can use it in other places that potentially would need it 

















export default async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();
  
    if (!response.ok) {
      throw new Error('Failed to fetch places');
    }
  
    return resData.places;
  }
  
  export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places', {
      method: 'PUT',
      body: JSON.stringify({ places }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const resData = await response.json();
  
    if (!response.ok) {
      throw new Error('Failed to update user data.');
    }
  
    return resData.message;
  }














