import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  id: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  address: string;
  isLoading: boolean;
};

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  image: '',
  phone: '',
  address: '',
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<UserState, 'isLoading'>>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.image = '';
      state.phone = '';
      state.address = '';
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
