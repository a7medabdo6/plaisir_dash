import axiosInstance from "../axiosInstance";

export const createTrip = async (TripData) => {
  const response = await axiosInstance.post('/trips', TripData);
  return response.data;
};

// export const getTrips = async (params) => {
//   try {
//     const response = await axiosInstance.get('/Trips',{params});
//     return response.data;  // Return the list of Trips
//   } catch (error) {
//     throw error;  // Throw error to handle in the component
//   }
// };

export const getTrips = async ({
  orderBy = 'id',
  order = 'desc',
  limit = 10,
  page = 1,
  filterOptions = {}
}) => {
  try {
    // Constructing the query parameters
    const params = {
      orderBy,
      order,
      limit,
      page,
      filterOptions: JSON.stringify(filterOptions) // Convert filterOptions to a string format
    };

    const response = await axiosInstance.get('/trips', { params });
    return response.data;  // Return the list of Trips
  } catch (error) {
    throw error;  // Throw error to handle in the component
  }
};


// Assuming you already have axiosInstance set up
export const deleteTrip = async (TripId) => {
  
  try {
    const response = await axiosInstance.delete(`/trips/${TripId}`);
    return response.data;  // Return the response data after deletion
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/Trip/Trip.js
export const getSingleTrip = async (TripId) => {
  try {
    const response = await axiosInstance.get(`/trips/${TripId}`);
    return response.data;  // Return the Trip data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/Trip/Trip.js
export const updateTrip = async ( TripData) => {
  console.log(TripData,'TripData');
  
  try {
    const response = await axiosInstance.patch(`/trips/${TripData.id}`, TripData);
    return response.data;  // Return the updated Trip data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};
