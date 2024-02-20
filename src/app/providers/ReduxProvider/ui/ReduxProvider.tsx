import { FC, ReactNode } from 'react';

import { Provider } from 'react-redux';
import { RootStateSchema } from '../config/schema';
import { createReduxStore } from '../config/config';

interface ReduxProviderProps {
    className?: string;
    children: ReactNode;
    initialState?: RootStateSchema
}

export const store = createReduxStore()

export const ReduxProvider: FC<ReduxProviderProps> = ({children, className}) => {
  
  return (
    <Provider store={store}>
      {
        children
      }
    </Provider>
  );
}