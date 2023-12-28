import { fetchUserData } from "../../apis/API";

export const fetchUser = async () => {
  const user = await fetchUserData("/auth/fetch-login");
  return user;
};
