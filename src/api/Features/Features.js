import axiosInstance from "../axiosInstance";

export const createFeature = async (FeatureData) => {
  const response = await axiosInstance.post('/features', FeatureData);
  return response.data;
};

// export const getFeatures = async (params) => {
//   try {
//     const response = await axiosInstance.get('/features',{params});
//     return response.data;  // Return the list of Features
//   } catch (error) {
//     throw error;  // Throw error to handle in the component
//   }
// };

export const getFeatures = async ({
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

    const response = await axiosInstance.get('/features', { params });
    return response.data;  // Return the list of features
  } catch (error) {
    throw error;  // Throw error to handle in the component
  }
};


// Assuming you already have axiosInstance set up
export const deleteFeature = async (FeatureId) => {
  
  try {
    const response = await axiosInstance.delete(`/features/${FeatureId}`);
    return response.data;  // Return the response data after deletion
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/Feature/Feature.js
export const getSingleFeature = async (FeatureId) => {
  try {
    const response = await axiosInstance.get(`/features/${FeatureId}`);
    return response.data;  // Return the Feature data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/Feature/Feature.js
export const updateFeature = async ( FeatureData) => {
  console.log(FeatureData,'FeatureData');
  
  try {
    const response = await axiosInstance.patch(`/features/${FeatureData.id}`, FeatureData);
    return response.data;  // Return the updated Feature data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};
