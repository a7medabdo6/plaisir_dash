import axiosInstance from "../axiosInstance";




// src/api/HomeContent/HomeContent.js
export const getSingleHomeContent = async () => {
  try {
    const response = await axiosInstance.get(`/pages/main`);
    return response.data;  // Return the HomeContent data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/HomeContent/HomeContent.js
export const updateHomeContent = async ( HomeContentData) => {
  
  try {
    const response = await axiosInstance.patch('/pages/main/1', HomeContentData);
    console.log(response);
    
    return response.data;  // Return the updated HomeContent data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};
