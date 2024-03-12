import { UserSchema } from '../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserSchema = {
  id: 1,
  firstName: 'Максим',
  lastName: 'Соболев',
  email: 'himax108@mail.ru',
  phone: '+79213583245',
  group: {
    id: 1,
    name: '4-МД-4'
  },
  avatarUrl: '',
  // id: -1,
  // groupId: '',
  // firstName: '',
  // lastName: '',
  // email: '',
  // phone: '',
  // group: {
  //   id: -1,
  //   name: ''
  // },
  // avatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;