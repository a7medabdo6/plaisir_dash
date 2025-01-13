import axiosInstance from "../axiosInstance";




// src/api/FooterContent/FooterContent.js
export const getSingleFooterContent = async () => {
  try {
    const response = await axiosInstance.get(`/footer`);
    return response.data;  // Return the FooterContent data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/FooterContent/FooterContent.js
export const updateFooterContent = async ( FooterContentData) => {
  
  try {
    const response = await axiosInstance.patch(`/footer/${FooterContentData.id}`, FooterContentData);
    return response.data;  // Return the updated FooterContent data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};
