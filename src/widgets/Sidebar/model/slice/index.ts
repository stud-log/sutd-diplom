import { SidebarSchema } from '../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: SidebarSchema = {
  collapsed: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggle: (state) => {
      state.collapsed = !state.collapsed;
    },
  },
});

export const { actions: sidebarActions } = sidebarSlice;
export const { reducer: sidebarReducer } = sidebarSlice;