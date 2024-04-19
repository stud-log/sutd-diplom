import { FC, ReactNode } from 'react';

import { EmptyData } from 'shared/ui/EmptyData';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from '../Layout.module.scss';

interface LayoutProps {
  className?: string;
  children: ReactNode;
  loading?: boolean;
  emptyData?: string;
}

export const BaseContent: FC<LayoutProps> = ({ className, children, loading = false, emptyData }) => {

  return (
    <div className={classNames(cls.LayoutPageBaseContent, {}, [ className ])}>
      {loading ? <PageLoader /> :
        emptyData ? <EmptyData text={emptyData} /> :
          children
      }
    </div>
  );
};

