import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  name: string;
  email: string;
  image: string;
  isLoading: boolean;
};

const initialState: UserState = {
  name: '',
  email: '',
  image: '',
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<UserState, 'isLoading'>>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.name = '';
      state.email = '';
      state.image = '';
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
