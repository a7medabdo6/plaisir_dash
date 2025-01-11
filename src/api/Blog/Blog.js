import axiosInstance from "../axiosInstance";

export const createBlog = async (BlogData) => {
  const response = await axiosInstance.post('/blog', BlogData);
  return response.data;
};

// export const getBlogs = async (params) => {
//   try {
//     const response = await axiosInstance.get('/Blogs',{params});
//     return response.data;  // Return the list of Blogs
//   } catch (error) {
//     throw error;  // Throw error to handle in the component
//   }
// };

export const getBlogs = async ({
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

    const response = await axiosInstance.get('/blog', { params });
    return response.data;  // Return the list of Blogs
  } catch (error) {
    throw error;  // Throw error to handle in the component
  }
};


// Assuming you already have axiosInstance set up
export const deleteBlog = async (BlogId) => {
  
  try {
    const response = await axiosInstance.delete(`/blog/${BlogId}`);
    return response.data;  // Return the response data after deletion
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/Blog/Blog.js
export const getSingleBlog = async (BlogId) => {
  try {
    const response = await axiosInstance.get(`/blog/${BlogId}`);
    return response.data;  // Return the Blog data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/Blog/Blog.js
export const updateBlog = async ( BlogData) => {
  console.log(BlogData,'BlogData');
  
  try {
    const response = await axiosInstance.patch(`/blog/${BlogData.id}`, BlogData);
    return response.data;  // Return the updated Blog data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};
