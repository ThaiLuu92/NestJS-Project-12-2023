import axiosInttance from "./configApi";
import axios from "./configApi";

export const getData = async (pathName: string) => {
  try {
    const response = await axios.get(pathName);
    return response.data;
  } catch (error) {}
};


export const getDataById = async (pathName: string, id: string) => {
  try {
    const response = await axios.get(pathName + '/' + id);
    return response.data;
  } catch (error) {}
};


export const getDataPaginatiton = async (pathName: string,params: { [key: string]: any }) => {  
  
  try {
    const response = await axios.get(pathName,{
      params: params, // Truyền query params ở đây
    });
    return response.data;
  } catch (error) {}
};

export const fetchUserData = async (pathName: string) => {
  try {
    const response = await axios.get(pathName);
    return response.data;
  } catch (error) {}
};

export const searchData = async (
  pathName: string,
  params: { [key: string]: any }
) => {
  try {
    const response = await axios.get(pathName, {
      params: params, // Truyền query params ở đây
    });
    return response.data;
  } catch (error) {}
};


export const createData = async (pathName: string, data: any) => {
  try {
    const response = await axios.post(pathName, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createDataWithImage = async (pathName: string, data: any) => {
  try {
    const response = await axios.post(pathName, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (pathName: string, id: string) => {
  try {
    const response = await axios.delete(pathName + "/" + id);
    return response.data;
  } catch (error) {}
};

export const deleteAllDataByCondition = async (pathName: string) => {
  try {
    const response = await axios.delete(pathName);
    return response.data;
  } catch (error) {}
};

export const updateData = async (pathName: string, id: string, data: any) => {  
  try {
    const response = await axios.put(pathName + "/" + id, data);
    return response.data;
  } catch (error) {}
};


export const updateNoData = async (pathName: string) => {  
  try {
    const response = await axios.put(pathName);
    return response.data;
  } catch (error) {}
};

export const updateDataWithImage = async (
  pathName: string,
  id: string,
  data: any
) => {
  try {
    const response = await axios.put(pathName + "/" + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {}
};

export const restoreData = async (pathName: string, id: string) => {
  try {
    const response = await axios.put(pathName + "/" + id);
    return response.data;
  } catch (error) {}
};

export const updateDataByPatch = async (
  pathName: string,
  id: string,
  data: any
) => {
  try {
    const response = await axios.patch(pathName + "/" + id, data);
    return response.data;
  } catch (error) {}
};
