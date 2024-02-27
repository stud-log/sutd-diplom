import { FC } from 'react';
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
    <div className={classNames(cls.Sidebar, {}, [ className ])}> </div>
  );
};