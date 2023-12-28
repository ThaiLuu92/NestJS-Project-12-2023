import { fetchUserData } from "../Apis/API";
import { FETCH_LOGIN } from "../Apis/common";

export const fetchUser = async () => {
  try {
    const user = await fetchUserData(FETCH_LOGIN);
    return user;
  } catch (error) {
    throw error;
  }
};
