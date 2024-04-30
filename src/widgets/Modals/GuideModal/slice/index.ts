import { GuideModalSchema } from '../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: GuideModalSchema = {
  isModalOpen: false,
};

const guideModalSlice = createSlice({
  name: 'guideModal',
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

export const { actions: guideModalActions } = guideModalSlice;
export const { reducer: guideModalReducer } = guideModalSlice;