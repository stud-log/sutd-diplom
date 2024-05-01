import { Button } from 'shared/ui/Button';
import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './EditProfile.module.scss';
import { useNavigate } from 'react-router-dom';

interface EditProfileProps {
  className?: string;
}

export const EditProfile: FC<EditProfileProps> = ({ className }) => {
  const navigate = useNavigate();
  return (
    <Button size='md' onClick={() => navigate('/profile/settings')} outline className={classNames(cls.EditProfile, {}, [ className ])} purpose='settings'>Настройки</Button>
  );
};