import { RootStateSchema } from "./schema";
import { configureStore } from "@reduxjs/toolkit";

export function createReduxStore(initialState?: RootStateSchema) {
  return configureStore<RootStateSchema>({
    reducer: {},
    devTools: __IS_DEV__,
    preloadedState: initialState
  })
}
