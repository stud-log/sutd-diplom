import { ManageGroupModalSchema } from '../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ManageGroupModalSchema = {
  isModalOpen: false
};

const manageGroupModalSlice = createSlice({
  name: 'manageGroupModal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;

    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { actions: manageGroupModalActions } = manageGroupModalSlice;
export const { reducer: manageGroupModalReducer } = manageGroupModalSlice;