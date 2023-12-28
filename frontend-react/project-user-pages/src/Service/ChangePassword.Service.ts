import {  updateDataByPatchChangePassword } from "../Apis/API";
import { AUTH } from "../Apis/common";
import { FormDataChangePassword } from "../Types/formData.type";

export const changePassword = async (id: string, data:FormDataChangePassword) => {
  try {
    await updateDataByPatchChangePassword(AUTH, id, data);
  } catch (error) {
    throw error;
  }
};