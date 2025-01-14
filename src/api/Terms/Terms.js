import axiosInstance from "../axiosInstance";




// src/api/Terms/Terms.js
export const getSingleTerms = async () => {
  try {
    const response = await axiosInstance.get(`/pages/main/terms`);
    return response.data;  // Return the Terms data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/Terms/Terms.js
export const updateTerms = async ( TermsData) => {
  
  try {
    const response = await axiosInstance.patch(`/pages/main/terms`, TermsData);
    console.log(response);
    
    return response.data;  // Return the updated Terms data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};
