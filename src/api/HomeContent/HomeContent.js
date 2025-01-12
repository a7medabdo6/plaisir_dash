import axiosInstance from "../axiosInstance";




// src/api/HomeContent/HomeContent.js
export const getSingleHomeContent = async () => {
  try {
    const response = await axiosInstance.get(`/home-content`);
    return response.data;  // Return the HomeContent data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/HomeContent/HomeContent.js
export const updateHomeContent = async ( HomeContentData) => {
  
  try {
    const response = await axiosInstance.patch(`/home-content/${HomeContentData.id}`, HomeContentData);
    return response.data;  // Return the updated HomeContent data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};
