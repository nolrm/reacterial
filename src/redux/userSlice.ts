import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  image: '',
  name: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.name = action.payload.name;
    },
    clearUser: (state) => {
      state.email = '';
      state.image = '';
      state.name = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
