import axiosInstance from "../axiosInstance";

export const createUser = async (UserData) => {
  const response = await axiosInstance.post('/users', UserData);
  return response.data;
};

export const getUsers = async ({
  orderBy = 'id',
  order = 'desc',
  limit = 10,
  page = 1,
  filterOptions = {}
}) => {
  try {
    const params = {
      orderBy,
      order,
      limit,
      page,
    };
    const response = await axiosInstance.get(`/v1/users?filterOptions={searchKey:${filterOptions.searchKey},searchValue:${filterOptions.searchValue}}`,{params});
    return response.data;  // Return the list of Users
  } catch (error) {
    throw error;  // Throw error to handle in the component
  }
};

// Assuming you already have axiosInstance set up
export const deleteUser = async (UserId) => {
  try {
    const response = await axiosInstance.delete(`/users/${UserId}`);
    return response.data;  // Return the response data after deletion
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/User/User.js
export const getSingleUser = async (UserId) => {
  try {
    const response = await axiosInstance.get(`/v1/users/${UserId}`);
    return response.data;  // Return the User data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/User/User.js
export const updateUser = async ( UserData) => {
  
  try {
    const response = await axiosInstance.patch(`/users/${UserData.id}`, UserData);
    return response.data;  // Return the updated User data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};
