import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './EmptyData.module.scss';

interface EmptyDataProps {
  className?: string;
  text: string;
}

export const EmptyData: FC<EmptyDataProps> = ({ className, text }) => {

  return (
    <div className={classNames(cls.EmptyData, {}, [ className ])}>{text}</div>
  );
};