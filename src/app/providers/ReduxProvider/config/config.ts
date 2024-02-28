import { RootStateSchema } from "./schema";
import { configureStore } from "@reduxjs/toolkit";
import { sidebarReducer } from "widgets/Sidebar";

export function createReduxStore(initialState?: RootStateSchema) {
  return configureStore<RootStateSchema>({
    reducer: {
      sidebar: sidebarReducer
    },
    devTools: __IS_DEV__,
    preloadedState: initialState
  });
}
