import { Clock } from 'widgets/Clock';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import Logo from 'shared/assets/img/logo.svg';
import { UserProfile } from 'widgets/UserProfile';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './MobileHeader.module.scss';

interface MobileHeaderProps {
  className?: string;
}

export const MobileHeader: FC<MobileHeaderProps> = ({ className }) => {

  return (
    <div className={classNames(cls.MobileHeader, {}, [ className ])}>
      <Link to={'/main'}><Logo className={cls.logo}/></Link>
      <Clock className={cls.clock} />
      <UserProfile variant='small' className={cls.profile} infoClass={cls.infoClass}/>
    </div>
  );
};