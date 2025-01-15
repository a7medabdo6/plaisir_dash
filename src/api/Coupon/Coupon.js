import axiosInstance from "../axiosInstance";

export const createCoupon = async (CouponData) => {
  const response = await axiosInstance.post('/coupon', CouponData);
  return response.data;
};

export const getCoupons = async ({
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
    const response = await axiosInstance.get(`/coupon?filterOptions={searchKey:${filterOptions.searchKey},searchValue:${filterOptions.searchValue}}`,{params});
    return response.data;  // Return the list of Coupons
  } catch (error) {
    throw error;  // Throw error to handle in the component
  }
};

// Assuming you already have axiosInstance set up
export const deleteCoupon = async (CouponId) => {
  try {
    const response = await axiosInstance.delete(`/coupon/${CouponId}`);
    return response.data;  // Return the response data after deletion
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/Coupon/Coupon.js
export const getSingleCoupon = async (CouponId) => {
  try {
    const response = await axiosInstance.get(`/coupon/${CouponId}`);
    return response.data;  // Return the Coupon data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};


// src/api/Coupon/Coupon.js
export const updateCoupon = async ( CouponData) => {
  
  try {
    const response = await axiosInstance.patch(`/coupon/${CouponData.id}`, CouponData);
    return response.data;  // Return the updated Coupon data
  } catch (error) {
    throw error;  // Throw error to handle it in the component
  }
};
