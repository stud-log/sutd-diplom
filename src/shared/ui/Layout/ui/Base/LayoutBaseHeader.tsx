import { FC, ReactNode } from 'react';

import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from '../Layout.module.scss';

interface LayoutProps {
  className?: string;
  slots: {
    start: ReactNode;
    middle?: ReactNode;
    end?: ReactNode;
  };
}

export const BaseHeader: FC<LayoutProps> = ({ className, slots: { start, middle, end } }) => {

  return (
    <div className={classNames(cls.LayoutPageBaseHeader, {}, [ className ])}>
      <div className={cls.startSlot}>{start}</div>
      <div className={cls.middleSlot}>{middle}</div>
      <div className={cls.endSlot}>{end}</div>
    </div>
  );
};

