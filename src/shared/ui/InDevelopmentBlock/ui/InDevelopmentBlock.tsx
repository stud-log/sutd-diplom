import { FC } from 'react';
import Icon from '@/shared/assets/img/icons/inDevelopment.svg?react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './InDevelopmentBlock.module.scss';

interface InDevelopmentBlockProps {
  className?: string;
}

export const InDevelopmentBlock: FC<InDevelopmentBlockProps> = ({ className }) => {

  return (
    <div className={classNames(cls.InDevelopmentBlock, {}, [ className ])}><Icon /> Блок в разработке </div>
  );
};