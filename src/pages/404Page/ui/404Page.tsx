import { FC } from 'react';

import AppHistory from '@/shared/config/history';
import { Button } from '@/shared/ui/Button';
import LogoIcon from '@/shared/assets/img/logo.svg?react';
import NotFoundIcon from '@/shared/assets/img/icons/404.svg?react';
import cls from './404Page.module.scss';

/**
 *
 * Uses position fixed to overlaying layout. Most simple way
 */
const Page404: FC = () => {
  return (
    <div className={cls.Page404}>
      <div className={cls.wrapper}>
        <div className={cls.logo}><LogoIcon /></div>
        <div className={cls.notFoundIcon}><NotFoundIcon /></div>
        <div className={cls.text}>
          Кажется, что-то пошло не так! Страница, которую ты запрашиваешь, <br />
          не существует. Возможно она устарела или была удалена или был <br />
          введен неверный адрес в адресной строке
        </div>
        <div className={cls.btn}><Button size='lg' onClick={() => AppHistory.navigate?.('/main')}>Перейти на главную</Button></div>
      </div>
    </div>
  );
};

export default Page404;