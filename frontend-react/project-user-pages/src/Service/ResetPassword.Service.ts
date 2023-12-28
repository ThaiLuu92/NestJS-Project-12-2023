import { createData } from "../Apis/API";
import { RESET_PASSWORD } from "../Apis/common";
import { FormDataResetPassword } from "../Types/formData.type";

export const resetPassword = async (data:FormDataResetPassword) => {
  try {
    await createData(RESET_PASSWORD, data);
  } catch (error) {
    throw error;
  }
};