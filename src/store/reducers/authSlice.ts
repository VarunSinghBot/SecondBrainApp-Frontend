// store/slices/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  username: any | null;
}

const initialState: AuthState = {
  token: null,
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; username: any }>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
