import axiosInstance from "../axiosInstance";

export const createCompany = async (CompanyData) => {
  const response = await axiosInstance.post('/company', CompanyData);
  return response.data;
};

// export const getCompanys = async (params) => {
//   try {
//     const response = await axiosInstance.get('/Companys',{params});
//     return response.data;  // Return the list of Companys
//   } catch (error) {
//     throw error;  // Throw error to handle in the component
//   }
// };

export const getCompanys = async ({
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

    const response = await axiosInstance.get('/company', { params });
    return response.data;  // Return the list of Companys
  } catch (error) {
    throw error;  // Throw error to handle in the component
  }
};


// Assuming you already have axiosInstance set up
export const deleteCompany = async (CompanyId) => {
  
  try {
    const response = await axiosInstance.delete(`/company/${CompanyId}`);
    return response.data;  // Return the response data after deletion
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/Company/Company.js
export const getSingleCompany = async (CompanyId) => {
  try {
    const response = await axiosInstance.get(`/company/${CompanyId}`);
    return response.data;  // Return the Company data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/Company/Company.js
export const updateCompany = async ( CompanyData) => {
  console.log(CompanyData,'CompanyData');
  
  try {
    const response = await axiosInstance.patch(`/company/${CompanyData.id}`, CompanyData);
    return response.data;  // Return the updated Company data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};
