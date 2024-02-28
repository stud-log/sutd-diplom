import { FC } from 'react';
import Logo from 'shared/assets/img/logo.svg';
import { RootStateSchema } from 'app/providers/ReduxProvider';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Sidebar.module.scss';
import { useSelector } from 'react-redux';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const { collapsed } = useSelector<RootStateSchema, RootStateSchema['sidebar']>(state => state.sidebar);
  return (
    <div className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [ className ])}>
      <div className={cls.inner}>
        <div className={cls.row}>
          <Logo />
        </div>
      </div>
    </div>
  );
};