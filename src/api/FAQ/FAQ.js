import axiosInstance from "../axiosInstance";

export const createFAQ = async (FAQData) => {
  const response = await axiosInstance.post('/faq', FAQData);
  return response.data;
};

// export const getFAQs = async (params) => {
//   try {
//     const response = await axiosInstance.get('/FAQs',{params});
//     return response.data;  // Return the list of FAQs
//   } catch (error) {
//     throw error;  // Throw error to handle in the component
//   }
// };

export const getFAQs = async ({
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

    const response = await axiosInstance.get('/faq', { params });
    return response.data;  // Return the list of FAQs
  } catch (error) {
    throw error;  // Throw error to handle in the component
  }
};


// Assuming you already have axiosInstance set up
export const deleteFAQ = async (FAQId) => {
  
  try {
    const response = await axiosInstance.delete(`/faq/${FAQId}`);
    return response.data;  // Return the response data after deletion
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/FAQ/FAQ.js
export const getSingleFAQ = async (FAQId) => {
  try {
    const response = await axiosInstance.get(`/faq/${FAQId}`);
    return response.data;  // Return the FAQ data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/FAQ/FAQ.js
export const updateFAQ = async ( FAQData) => {
  console.log(FAQData,'FAQData');
  
  try {
    const response = await axiosInstance.patch(`/faq/${FAQData.id}`, FAQData);
    return response.data;  // Return the updated FAQ data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};
