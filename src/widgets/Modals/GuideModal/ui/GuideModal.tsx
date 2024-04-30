import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './GuideModal.module.scss';

interface GuideModalProps {
  className?: string;
}

export const GuideModal: FC<GuideModalProps> = ({ className }) => {

  return (
    <div className={classNames(cls.GuideModal, {}, [ className ])}> </div>
  );
};