import axiosInstance from "../axiosInstance";

export const createBlogTag = async (BlogTagData) => {
  const response = await axiosInstance.post('/blog-tag', BlogTagData);
  return response.data;
};

// export const getBlogTags = async (params) => {
//   try {
//     const response = await axiosInstance.get('/BlogTags',{params});
//     return response.data;  // Return the list of BlogTags
//   } catch (error) {
//     throw error;  // Throw error to handle in the component
//   }
// };

export const getBlogTags = async ({
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
    };

    const response = await axiosInstance.get(`/blog-tag?filterOptions={searchKey:${filterOptions.searchKey},searchValue:${filterOptions.searchValue}}`, { params });
    return response.data;  // Return the list of BlogTags
  } catch (error) {
    throw error;  // Throw error to handle in the component
  }
};


export const getBlogTagsWithOutSearch = async ({
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
    };

    const response = await axiosInstance.get(`/blog-tag`);
    return response.data;  // Return the list of BlogTags
  } catch (error) {
    throw error;  // Throw error to handle in the component
  }
};
// Assuming you already have axiosInstance set up
export const deleteBlogTag = async (BlogTagId) => {
  
  try {
    const response = await axiosInstance.delete(`/blog-tag/${BlogTagId}`);
    return response.data;  // Return the response data after deletion
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/BlogTag/BlogTag.js
export const getSingleBlogTag = async (BlogTagId) => {
  try {
    const response = await axiosInstance.get(`/blog-tag/${BlogTagId}`);
    return response.data;  // Return the BlogTag data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/BlogTag/BlogTag.js
export const updateBlogTag = async ( BlogTagData) => {
  console.log(BlogTagData,'BlogTagData');
  
  try {
    const response = await axiosInstance.patch(`/blog-tag/${BlogTagData.id}`, BlogTagData);
    return response.data;  // Return the updated BlogTag data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};
