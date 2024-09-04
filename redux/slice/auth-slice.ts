import { AuthState, AuthInitialState } from "@/utils/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isAuth: false,
    token: ""
  } as AuthState,
} as AuthInitialState;


export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },

    logIn: (state: any, action: PayloadAction<any>) => {
      return {
        value: {
          isAuth: true,
          token: action.payload.token,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
