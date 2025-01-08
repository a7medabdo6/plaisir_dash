import axiosInstance from "../axiosInstance";

export const createCategory = async (categoryData) => {
  const response = await axiosInstance.post('/categories', categoryData);
  return response.data;
};

export const getCategories = async (params) => {
  try {
    const response = await axiosInstance.get('/categories',{params});
    return response.data;  // Return the list of categories
  } catch (error) {
    throw error;  // Throw error to handle in the component
  }
};

// Assuming you already have axiosInstance set up
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.delete(`/categories/${categoryId}`);
    return response.data;  // Return the response data after deletion
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/Category/Category.js
export const getSingleCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/categories/${categoryId}`);
    return response.data;  // Return the category data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/Category/Category.js
export const updateCategory = async ( categoryData) => {
  console.log(categoryData,'categoryData');
  
  try {
    const response = await axiosInstance.patch(`/categories/${categoryData.id}`, categoryData);
    return response.data;  // Return the updated category data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};
