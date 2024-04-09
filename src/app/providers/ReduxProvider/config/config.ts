import { RootStateSchema } from "./schema";
import { activityTimerReducer } from "widgets/ActivityTimer/model/slice";
import { addAndEditModalReducer } from "widgets/Modals/ProfileModals/AddAndEditModal/slice";
import { configureStore } from "@reduxjs/toolkit";
import { sidebarReducer } from "widgets/Sidebar";

export function createReduxStore(initialState?: RootStateSchema) {
  return configureStore<RootStateSchema>({
    reducer: {
      sidebar: sidebarReducer,
      activityTimer: activityTimerReducer,
      addAndEditModal: addAndEditModalReducer
    },
    devTools: __IS_DEV__,
    preloadedState: initialState
  });
}
