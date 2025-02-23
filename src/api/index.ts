import { BASE_URL } from "@/utils/apiConstants";
import { api } from "../utils/axiosConfig";
import { defineCancelApiObject } from "../utils/axiosUtils";

const cancelApiObject = defineCancelApiObject(api);

export const fetchUserProfile = async (cancel = false) => {
  try {
    const response = await api.request({
      url: `${BASE_URL}/user/profile`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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
      url: `${BASE_URL}/user/profile`,
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
  sendOtp: async (data: any, cancel = false) => {
    const response = await api.request({
      url: `${BASE_URL}/auth/sendOtp`,
      method: "POST",
      data: {
        phoneNo: data.phoneNo,
      },
      signal: cancel
        ? cancelApiObject.PostLogin.handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },

  verifyOtp: async (data: any, cancel = false) => {
    const response = await api.request({
      url: `${BASE_URL}/auth/verifyOtp`,
      method: "POST",
      data: {
        phoneNo: data.phoneNo,
        otp: data.otp,
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
      url: `${BASE_URL}/user/profile`,
      method: "PUT",
      data: {
        // Basic Details
        fullName: data.fullName,
        email: data.email,
        fathersName: data.fathersName,
        alternativePhone: data.alternativePhone,
        phoneNumber: data?.phoneNumber,
        aadharNumber: data?.aadharNumber,
        panNumber: data?.panNumber,
        gender: data?.gender,
        dateOfBirth: data?.dateOfBirth,
        address: data?.address,
        state: data?.state,
        profilePictureUrl: data?.profilePictureUrl,

        // GST Profile
        gstProfile: data?.gstProfile ? data.gstProfile : undefined,

        // Income Tax Profile
        incomeTaxProfile: data?.incomeTaxProfile
          ? data.incomeTaxProfile
          : undefined,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      signal: cancel
        ? cancelApiObject.PostSignup.handleRequestCancellation().signal
        : undefined,
    });
    console.log(response);
    return response.data;
  },

  getDetails: async (cancel = false) => {
    const response = await api.request({
      url: `${BASE_URL}/user/profile`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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
      url: `${BASE_URL}/services`,
      method: "GET",
      signal: cancel
        ? cancelApiObject.getServices.handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },
  getSubServices: async (id: string, cancel = false) => {
    const response = await api.request({
      url: `${BASE_URL}/sub-services/service/${id}`,
      method: "GET",
      signal: cancel
        ? cancelApiObject.getSubServices.handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },
};

export const Notifications = {
  getNotifications: async (cancel = false) => {
    const response = await api.request({
      url: `${BASE_URL}/notification`,
      method: "GET",
      signal: cancel
        ? cancelApiObject.getNotifications.handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },
};

export const Updates = {
  getBlogs: async (cancel = false) => {
    const response = await api.request({
      url: `${BASE_URL}/blogs`,
      method: "GET",
      signal: cancel
        ? cancelApiObject.getBlogs.handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },
  getBlogById: async (id: string, cancel = false) => {
    const response = await api.request({
      url: `${BASE_URL}/blogs/${id}`,
      method: "GET",
      signal: cancel
        ? cancelApiObject.getBlogById.handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },
};

export const VideoCourses = {
  getMyCourses: async (cancel = false) => {
    const response = await api.request({
      url: `${BASE_URL}/course/my-courses`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      signal: cancel
        ? cancelApiObject.getCourses.handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },
  getCourses: async (cancel = false) => {
    const response = await api.request({
      url: `${BASE_URL}/course`,
      method: "GET",
      signal: cancel
        ? cancelApiObject.getCourses.handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },
};

export const Upload = {
  getUpload: async (serviceId: string, cancel = false) => {
    const response = await api.request({
      url: `${BASE_URL}/requirements/${serviceId}`,
      method: "GET",
      signal: cancel
        ? cancelApiObject.getUpload.handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },
  uploadFile: async (formData: FormData, id: string) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };

    console.log(id, "id");
    try {
      const response = await fetch(`${BASE_URL}/document/upload/${id}`, {
        method: requestOptions.method,
        headers: requestOptions.headers,
        body: requestOptions.body,
        redirect: requestOptions.redirect as RequestRedirect,
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  },
};

export const Documents = {
  getAllDocuments: async (cancel: any = false) => {
    const response = await api.request({
      url: `${BASE_URL}/document/get`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      signal: cancel
        ? cancelApiObject.getUpload.handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },
};

// const myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzQ0NDIwODIzMDJhMmVhNjYzYWRkNzgiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3MzI1MjcwNzYsImV4cCI6MTczMjYxMzQ3Nn0.yxClp90Nd-ERVfj5Q2BvQmtYTQIAV-KprbIw_jLnris");

// const formdata = new FormData();
// formdata.append("documentType", "required");
// formdata.append("title", "Driving Liciense");
// formdata.append("description", "");
// formdata.append("document", fileInput.files[0], "[PROXY]");

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: formdata,
//   redirect: "follow"
// };

// fetch("{{baseUrl}}/document/upload/674424c96d798a128c3294de/", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

export const Quotation = {
  postQuotation: async (
    data: {
      subServiceId: string;
      selectedFeatures: string[];
      billingPeriod: string;
    },
    cancel = false
  ) => {
    try {
      const response = await api.request({
        url: `${BASE_URL}/quotation/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          subServiceId: data.subServiceId,
          selectedFeatures: data.selectedFeatures,
          billingPeriod: data.billingPeriod,
        },
        signal: cancel
          ? cancelApiObject.PostSignup.handleRequestCancellation().signal
          : undefined,
      });
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  getQuotation: async (cancel = false) => {
    const response = await api.request({
      url: `${BASE_URL}/quotation/`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      signal: cancel
        ? cancelApiObject.PostSignup.handleRequestCancellation().signal
        : undefined,
    });
    console.log(response);
    return response.data;
  },
};
