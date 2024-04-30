import { RootStateSchema } from "./schema";
import { activityTimerReducer } from "widgets/ActivityTimer/model/slice";
import { addAndEditModalReducer } from "widgets/Modals/ProfileModals/AddAndEditModal/slice";
import { configureStore } from "@reduxjs/toolkit";
import { guideModalReducer } from "widgets/Modals/GuideModal/slice";
import { manageGroupModalReducer } from "widgets/Modals/ProfileModals/ManageGroupModal/slice";
import { scheduleModalReducer } from "widgets/Modals/ProfileModals/ScheduleModal/slice";
import { sidebarReducer } from "widgets/Sidebar";

export function createReduxStore(initialState?: RootStateSchema) {
  return configureStore<RootStateSchema>({
    reducer: {
      sidebar: sidebarReducer,
      activityTimer: activityTimerReducer,
      addAndEditModal: addAndEditModalReducer,
      scheduleModal: scheduleModalReducer,
      guideModal: guideModalReducer,
      manageGroupModal: manageGroupModalReducer
    },
    devTools: __IS_DEV__,
    preloadedState: initialState
  });
}
