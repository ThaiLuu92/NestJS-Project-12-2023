import { useEffect, useState } from "react";
import { fetchUser } from "../Service/FetchLogin.Service";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/Slice/AuthSlice";
import { I_User } from "../Types/formData.type";

export const useFetchData = <T>() => {
  const [user, setUser] = useState<T>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [error, setError] = useState();

  const fetchUserData = async () => {
    try {
      const response = await fetchUser();
      if (response) {        
        dispatch(loginSuccess(response as any));
        setUser(response);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.errors);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return { user, loading, error, fetchUserData };
};

export const fetchData = async () => {
  try {
    const data = await fetchUser();
    if (data) {
      return data;
    }

    throw { message: "User not found" };
  } catch (error) {
    throw error;
  }
};
