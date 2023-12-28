// appSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserLogin {
  id: string;
  role: string;
  [key: string]: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: UserLogin | null ;
  loading: boolean;
  toggle: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  toggle: true,
};

const appSlice = createSlice({
  name: "app",
  initialState, // Thêm initialState vào đây
  reducers: {
    onToggle: (state) => {
      state.toggle = !state.toggle;
    },
    loginSuccess: (state, action: PayloadAction<UserLogin>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { onToggle, loginSuccess, loginFailure, logout } =
  appSlice.actions;
export default appSlice.reducer;
