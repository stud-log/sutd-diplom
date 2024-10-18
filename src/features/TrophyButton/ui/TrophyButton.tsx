import { Button } from '@/shared/ui/Button';
import { FC } from 'react';
import { RootStateSchema } from '@/app/providers/ReduxProvider';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './TrophyButton.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userService from '@/services/user.service';

interface TrophyButtonProps {
  className?: string;
  text?: string;
}

export const TrophyButton: FC<TrophyButtonProps> = ({ className, text }) => {
  const { isSeen } = useSelector<RootStateSchema, RootStateSchema['trophy']>(state => state.trophy);
  const navigate = useNavigate();
  const onOpen = async () => {
    userService.markAchievementsAsSeen();
    navigate('/achievements');
  };
  return (
    <Button size='md' onClick={onOpen} outline purpose='trophy' className={classNames(cls.TrophyButton, { [cls.isSeen]: isSeen }, [ className ])}>{text}</Button>
  );
};