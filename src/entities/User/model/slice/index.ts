import { UserSchema } from '../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserSchema = {
  id: 1,
  firstName: 'Максим',
  lastName: 'Соболев',
  email: 'himax108@mail.ru',
  phone: '',
  group: {
    id: 1,
    name: '4-МД-4'
  },
  avatarUrl: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: { payload: UserSchema }){
      state.id = payload.id;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.email = payload.email;
      state.phone = payload.phone;
      state.group = payload.group;
      state.avatarUrl = payload.avatarUrl;
      state.role = payload.role;
    }
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;