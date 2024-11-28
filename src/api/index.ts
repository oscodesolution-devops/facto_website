import { api } from "../utils/axiosConfig";
import { defineCancelApiObject } from "../utils/axiosUtils";

const cancelApiObject = defineCancelApiObject(api);

export const fetchUserProfile = async (cancel = false) => {
  try {
    const response = await api.request({
      url: "https://facto-backend-8spm.onrender.com/api/v1/user/profile",
      method: "GET",
      signal: cancel
        ? cancelApiObject.fetchUserProfile.handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch user profile");
    } else {
      throw new Error(
        "An unknown error occurred while fetching the user profile"
      );
    }
  }
};

export const updateUserProfile = async (profileData: any, cancel = false) => {
  try {
    const response = await api.request({
      url: "https://facto-backend-8spm.onrender.com/api/v1/user/profile",
      method: "PUT",
      data: profileData,
      signal: cancel
        ? cancelApiObject.updateUserProfile.handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to update user profile");
    } else {
      throw new Error(
        "An unknown error occurred while updating the user profile"
      );
    }
  }
};

export const AUTH = {
  PostLogin: async (data: any, cancel = false) => {
    const response = await api.request({
      url: "https://facto-backend-8spm.onrender.com/api/v1/auth/login",
      method: "POST",
      data: {
        email: data.email,
        password: data.password,
      },
      signal: cancel
        ? cancelApiObject.PostLogin.handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },

  PostSignup: async (data: any, cancel = false) => {
    const response = await api.request({
      url: "https://facto-backend-8spm.onrender.com/api/v1/auth/signup",
      method: "POST",
      data: {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      },
      signal: cancel
        ? cancelApiObject.PostSignup.handleRequestCancellation().signal
        : undefined,
    });
    console.log(response);
    return response.data;
  },
};

export const User = {
  addDetails: async (data: any, cancel = false) => {
    const response = await api.request({
      url: "https://facto-backend-8spm.onrender.com/api/v1/user/profile",
      method: "PUT",
      data: {
        fullName: data.fullName,
        email: data.email,
        role: data?.role,
        phoneNumber: data?.phoneNumber,
        aadharNumber: data?.aadharNumber,
        panNumber: data?.panNumber,
        gender: data?.gender,
        gstNumber: data?.gstNumber,
        dateOfBirth: data?.dateOfBirth,
        address: data?.address,
      },
      // headers: {
      //   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      //   "Content-Type": "application/json",
      // },
      signal: cancel
        ? cancelApiObject.PostSignup.handleRequestCancellation().signal
        : undefined,
    });
    console.log(response);
    return response.data;
  },

  getDetails: async (cancel = false) => {
    const response = await api.request({
      url: "https://facto-backend-8spm.onrender.com/api/v1/user/profile",
      method: "GET",
      signal: cancel
        ? cancelApiObject.PostSignup.handleRequestCancellation().signal
        : undefined,
    });

    return response.data;
  },
};

export const Services = {
  getServices: async (cancel = false) => {
    const response = await api.request({
      url: "https://facto-backend-8spm.onrender.com/api/v1/services",
      method: "GET",
      signal: cancel ? cancelApiObject.getServices.handleRequestCancellation().signal : undefined,
    });
    return response.data;
  },
  getSubServices: async (id: string, cancel = false) => {
    const response = await api.request({
      url: `https://facto-backend-8spm.onrender.com/api/v1/sub-services/${id}`,
      method: "GET",
      signal: cancel ? cancelApiObject.getSubServices.handleRequestCancellation().signal : undefined,
    });
    return response.data;
  },
};

export const Notifications = {
  getNotifications: async (cancel = false) => {
    const response = await api.request({
      url: "https://facto-backend-8spm.onrender.com/api/v1/notification",
      method: "GET",
      signal: cancel ? cancelApiObject.getNotifications.handleRequestCancellation().signal : undefined,
    });
    return response.data;
  },
};
