import { createData } from "../Apis/API";
import { PAYMENT } from "../Apis/common";
import { I_UserPayMent } from "../Types/formData.type";

export const createPayment = async (data:I_UserPayMent) => {
  try {
    const user = await createData(PAYMENT, data);
    return user;
  } catch (error) {
    throw error;
  }
};