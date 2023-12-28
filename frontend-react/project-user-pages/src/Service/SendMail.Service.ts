import { createData } from "../Apis/API";
import { REQUEST_PASSWORD_RESET } from "../Apis/common";
import { FormDataConfirmEmail } from "../Types/formData.type";

export const sendConfirmationEmail = async (email:FormDataConfirmEmail) => {
  try {
    await createData(REQUEST_PASSWORD_RESET, email);
  } catch (error) {
    throw error;
  }
};
