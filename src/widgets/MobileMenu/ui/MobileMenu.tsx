import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './MobileMenu.module.scss';
import { menuRoutes } from 'shared/config/routes';

interface MobileMenuProps {
  className?: string;
}

export const MobileMenu: FC<MobileMenuProps> = ({ className }) => {

  return (
    <div className={classNames(cls.MobileMenu, {}, [ className ])}>
      <menu className={cls.mobileMenuMenu}>
        {menuRoutes.map((item, index) => {
          const Icon = item.icon!;
          return (
            <NavLink key={index} to={item.path} className={
              ({ isActive }) => [ isActive ? cls.active : "", cls.menuItem ].join(" ")
            }>
              <Icon /><span className={cls.menuItemText}>{item.name}</span>
            </NavLink>
          );
        })}
      </menu>
    </div>
  );
};