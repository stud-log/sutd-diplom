import { Clock } from 'widgets/Clock';
import { FC } from 'react';
import Logo from 'shared/assets/img/logo.svg';
import { NavLink } from 'react-router-dom';
import { RootStateSchema } from 'app/providers/ReduxProvider';
import { UserProfile } from 'widgets/UserProfile';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Sidebar.module.scss';
import { menuRoutes } from 'shared/config/routes';
import { useSelector } from 'react-redux';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const { collapsed } = useSelector<RootStateSchema, RootStateSchema['sidebar']>(state => state.sidebar);
  return (
    <div className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [ className ])}>
      
      <div className={cls.row}>
        <Logo className={cls.logo}/>
        <Clock />
      </div>

      <UserProfile className={cls.profile}/>

      <menu>
        {menuRoutes.map((item, index) => {
          const Icon = item.icon!;
          return (
            <NavLink key={index} to={item.path} className={
              ({ isActive }) => [ isActive ? cls.active : "", cls.menuItem ].join(" ")
            }>
              <Icon />{item.name}
            </NavLink>
          );
        })}
      </menu>
  
    </div>
  );
};