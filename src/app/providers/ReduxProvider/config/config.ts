import { RootStateSchema } from "./schema";
import { activityTimerReducer } from "widgets/ActivityTimer/model/slice";
import { addAndEditCustomTodoReducer } from "widgets/Modals/ProfileModals/AddAndEditCustomTodo/slice";
import { addAndEditModalReducer } from "widgets/Modals/ProfileModals/AddAndEditModal/slice";
import { configureStore } from "@reduxjs/toolkit";
import { guideModalReducer } from "widgets/Modals/GuideModal/slice";
import { homeworkTaskModalReducer } from "widgets/Modals/HomeworkTaskModal/slice";
import { manageGroupModalReducer } from "widgets/Modals/ProfileModals/ManageGroupModal/slice";
import { notificationsReducer } from "widgets/Notifications/model/slice";
import { scheduleModalReducer } from "widgets/Modals/ProfileModals/ScheduleModal/slice";
import { sidebarReducer } from "widgets/Sidebar";
import { trophyReducer } from "features/TrophyButton/model/slice";

export function createReduxStore(initialState?: RootStateSchema) {
  return configureStore<RootStateSchema>({
    reducer: {
      sidebar: sidebarReducer,
      activityTimer: activityTimerReducer,
      addAndEditModal: addAndEditModalReducer,
      scheduleModal: scheduleModalReducer,
      guideModal: guideModalReducer,
      manageGroupModal: manageGroupModalReducer,
      homeworkTaskModal: homeworkTaskModalReducer,
      notifications: notificationsReducer,
      trophy: trophyReducer,
      addAndEditCustomTodo: addAndEditCustomTodoReducer
    },
    devTools: __IS_DEV__,
    preloadedState: initialState
  });
}
