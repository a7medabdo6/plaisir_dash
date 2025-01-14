import axiosInstance from "../axiosInstance";




// src/api/privacy/privacy.js
export const getSinglePrivacy = async () => {
  try {
    const response = await axiosInstance.get(`/pages/main/privacy`);
    return response.data;  // Return the privacy data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/privacy/privacy.js
export const updatePrivacy = async ( privacyData) => {
  
  try {
    const response = await axiosInstance.patch(`/pages/main/privacy`, privacyData);
    console.log(response);
    
    return response.data;  // Return the updated privacy data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};
