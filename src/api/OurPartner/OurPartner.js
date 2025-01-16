import axiosInstance from "../axiosInstance";




// src/api/OurPartner/OurPartner.js
export const getSingleOurPartner = async () => {
  try {
    const response = await axiosInstance.get(`/pages/main/our-partner`);
    return response.data;  // Return the OurPartner data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/OurPartner/OurPartner.js
export const updateOurPartner = async ( OurPartnerData) => {
  
  try {
    const response = await axiosInstance.patch(`/pages/main/our-partner/`, OurPartnerData);
    return response.data;  // Return the updated OurPartner data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};
