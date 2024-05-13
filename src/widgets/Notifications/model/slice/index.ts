import { NotificationsSchema } from '../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: NotificationsSchema = {
  isOpen: false,
  isSeen: false
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    toggleModal: (state, { payload }: { payload: boolean } ) => {
      state.isOpen = payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    setIsSeen: (state, { payload }: {payload: {isSeen: boolean}}) => {
      state.isSeen = payload.isSeen;
    }
  },
});

export const { actions: notificationsActions } = notificationsSlice;
export const { reducer: notificationsReducer } = notificationsSlice;