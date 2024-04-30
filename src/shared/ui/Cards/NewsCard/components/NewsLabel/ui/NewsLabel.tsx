import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './NewsLabel.module.scss';

interface NewsLabelProps {
  className?: string;
  label: string;
}

export const NewsLabel: FC<NewsLabelProps> = ({ className, label }) => {

  return (
    <div className={classNames(cls.NewsLabel, {}, [ className ])}>{label}</div>
  );
};