import { FC, MutableRefObject } from 'react';

import ArrowIcon from '@/shared/assets/img/select-arrow.svg?react';
import ArrowRightIcon from '@/shared/assets/img/arrow-left.svg?react';
import { UserNotification } from '@stud-log/news-types/models';
import { UserWithAvatar } from '@/shared/ui/UserWithAvatar';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './NotificationsList.module.scss';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

interface NotificationsListProps {
  className?: string;
  show: boolean;
  innerRef?: MutableRefObject<HTMLDivElement | null>;
  notifications: UserNotification[] | undefined;
}

export const NotificationsList: FC<NotificationsListProps> = ({ className, show, innerRef, notifications }) => {
  const navigate = useNavigate();
  return (
    <div ref={innerRef} className={classNames(cls.NotificationsList, { [cls.opened]: show }, [ className ])}>
      <div className={cls.title}>
        Уведомления
        <ArrowIcon className={cls.rightArrow} />
      </div>
      <div className={cls.list}>
        {
          notifications && notifications.length > 0 ? notifications.map(note => {
            const startDate = moment(note.createdAt).format('D MMM YYYY').replace('.', '');

            return (<div className={cls.notification} key={note.id}>
              <div className={cls.authorWrapper}>
                <div className={cls.newsAuthor}><UserWithAvatar user={note.author}/></div>
                <div className={cls.labelSpanCircle}>&#9679;</div>
                <div className={cls.newsDate}>{startDate}</div>
              </div>
              <div className={cls.noteContent}>
                <span className={cls.header}>{note.title}: </span>
                <span className={cls.content}>{note.content}</span>
              </div>
              <button onClick={() => navigate(`/${note.record?.recordTable?.toLowerCase()}/${note.record?.recordId}`)} className={cls.btn}>Открыть <ArrowRightIcon /></button>
            
            </div>);
          }
          ) : <div className={cls.empty}>У вас пока нет уведомлений</div>
        }
      </div>
    </div>
  );
};