import { customActivityModalSchema } from '../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: customActivityModalSchema = {
  isModalOpen: false,
  recordId: -1
};

const customActivityModalSlice = createSlice({
  name: 'customActivityModal',
  initialState,
  reducers: {
    openModal: (state, { payload } : {payload: {recordId: number}}) => {
      state.isModalOpen = true;
      state.recordId = payload.recordId;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.recordId = -1;
    },
  },
});

export const { actions: customActivityModalActions } = customActivityModalSlice;
export const { reducer: customActivityModalReducer } = customActivityModalSlice;