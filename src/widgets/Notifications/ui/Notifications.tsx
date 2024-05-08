import { useDispatch, useSelector } from 'react-redux';
import useSWR, { SWRResponse } from 'swr';

import { $api } from 'shared/http/host';
import { $apiGet } from 'shared/http/helpers/apiGet';
import BellIcon from 'shared/assets/img/icons/bell.svg';
import { FC } from 'react';
import { NotificationsList } from '../components/NotificationsList';
import { RootStateSchema } from 'app/providers/ReduxProvider';
import { UserNotification } from '@stud-log/news-types/models';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Notifications.module.scss';
import { notificationsActions } from '../model/slice';
import { useOutsideClick } from 'shared/hooks/useClickOutside';
import userService from 'services/user.service';

interface NotificationsProps {
  className?: string;
}

export const Notifications: FC<NotificationsProps> = ({ className }) => {
  const { isOpen, isSeen } = useSelector<RootStateSchema, RootStateSchema['notifications']>(state => state.notifications);
  const dispatch = useDispatch();
  const { data: notifications, error, mutate }: SWRResponse<UserNotification[]> = useSWR(
    isOpen ? `/api/users/notifications` : null,
    $apiGet,
  );
  const closeModal = () => dispatch(notificationsActions.closeModal());
  const ref = useOutsideClick(closeModal);
  const onOpen = async () => {
    dispatch(notificationsActions.toggleModal(!isOpen));
    userService.markNotificationsAsSeen();
    mutate();
  };
  return (
    <div className={cls.NotificationsWrapper}>
      <button onClick={onOpen} className={classNames(cls.Notifications, { [cls.isSeen]: isSeen }, [ className ])}>
        <BellIcon />
      </button>
      <NotificationsList innerRef={ref} show={isOpen} notifications={notifications}/>
    </div>
  );
};