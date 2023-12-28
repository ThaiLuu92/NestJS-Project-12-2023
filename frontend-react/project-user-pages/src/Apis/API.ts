import { ifError } from "assert";
import axiosInttance from "./configApi";
import axios from "./configApi";
import { AxiosError } from "axios";

// GET

export const getData = async (pathName: string) => {
  try {
    const response = await axios.get(pathName);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDataById = async (pathName: string, id: string) => {
  try {
    const response = await axios.get(pathName + "/" + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDataByCondition = async (pathName: string, conditions: any) => {
  try {
    const response = await axios.get(pathName, { params: conditions });
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchUserData = async (pathName: string) => {
  try {
    const response = await axiosInttance.get(pathName);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchData = async (
  pathName: string,
  params: { [key: string]: string }
) => {
  try {
    const response = await axios.get(pathName, {
      params: params, // Truyền query params ở đây
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// POST

export const createData = async (pathName: string, data: any) => {
  try {
    const response = await axios.post(pathName, data);
    return response.data;
  } catch (error) {
    handleExceptions(error)
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

// DELETE

export const deleteData = async (pathName: string, id: string) => {
  try {
    const response = await axios.delete(pathName + "/" + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAllDataByCondition = async (pathName: string) => {
  try {
    const response = await axios.delete(pathName);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PUT

export const updateData = async (pathName: string, id: string, data: any) => {
  try {
    const response = await axios.put(pathName + "/" + id, data);
    return response.data;
  } catch (error) {
    handleExceptions(error);
  }
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
  } catch (error) {
    throw error;
  }
};

export const restoreData = async (pathName: string, id: string) => {
  try {
    const response = await axios.put(pathName + "/" + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PATCH
export const updateDataByPatch = async (
  pathName: string,
  id: string,
  data: any
) => {
  try {
    const response = await axios.patch(pathName + "/" + id, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDataByPatchUserAvatar = async (
  pathName: string,
  id: string,
  data: any
) => {
  try {
    console.log(1111111111,pathName, id, data);
    
    const response = await axios.patch(
      pathName + "/" + id ,
      { avatar: data },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(2222222,response);
    
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateDataByPatchChangePassword = async (
  pathName: string,
  id: string,
  data: any
) => {
  try {
    const response = await axios.patch(
      pathName   + "/change-password/" + id,
      data
    );
    return response.data;
  } catch (error) {
    handleExceptions(error)
  }
};

// Hàm chuyển đổi lỗi

function handleExceptions(error: any) {
  if (error instanceof AxiosError) {
    const messageError: string[] = error.response?.data.message || [];
    const convertedMessage = messageError.map((msg) => {
      const key = msg.split(":")[0];
      const value = msg.split(":")[1];
      return { [key]: value };
    });  
   
      
    throw convertedMessage[0];
  
  } else {
    throw {
      messageServer: "Lỗi Server. Vui lòng thử lại",
    };
  }
}
