import { FC, ReactNode } from 'react';

import { ConfigProvider } from 'antd';
import { theme } from '../config/config';

interface AntdConfigProviderProps {
  className?: string;
  children: ReactNode;
}

export const AntdConfigProvider: FC<AntdConfigProviderProps> = ({ children, className }) => {
  
  return (
    <ConfigProvider theme={theme}>
      {
        children
      }
    </ConfigProvider>
  );
};