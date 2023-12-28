import React from "react";
import axios from "../../apis/configApi";
import { AxiosError } from "axios";
import { LOGIN } from "../../apis/common";

async function login(email: string, password: string) {
  try {
    const response = await axios.post(LOGIN, { email, password });
    window.localStorage.setItem("X-API-Key", response.data.assetToken);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
        const errorMsg = error.response.data.errors as { msgEmai:string
            msgPassword:string}       
      throw errorMsg;
    }
  }
}

export default login;
