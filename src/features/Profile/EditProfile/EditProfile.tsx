import { Button } from 'shared/ui/Button';
import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './EditProfile.module.scss';

interface EditProfileProps {
  className?: string;
}

export const EditProfile: FC<EditProfileProps> = ({ className }) => {

  return (
    <Button size='md' outline className={classNames(cls.EditProfile, {}, [ className ])} purpose='settings'>Настройки</Button>
  );
};