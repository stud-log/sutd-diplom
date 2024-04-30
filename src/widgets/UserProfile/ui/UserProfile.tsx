import { FC, ReactNode } from 'react';

import AddIcon from 'shared/assets/img/icons/add.svg';
import AvatarPlaceholder from 'shared/assets/img/avatar-placeholder.svg';
import { Button } from 'shared/ui/Button';
import { Select } from 'shared/ui/Select';
import { addAndEditModalActions } from 'widgets/Modals/ProfileModals/AddAndEditModal/slice';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './UserProfile.module.scss';
import { getStaticLink } from 'shared/lib/helpers/getStaticLink';
import { scheduleModalActions } from 'widgets/Modals/ProfileModals/ScheduleModal/slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userService from 'services/user.service';

interface UserProfileProps {
  className?: string;
  size: 'big' | 'small';
}

export const UserProfile: FC<UserProfileProps> = ({ className, size }) => {
  const { firstName, lastName, avatarUrl, group, role } = userService.getUser();
  const navigator = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={classNames(cls.UserProfile, {}, [ className, cls[size] ])} onClick={() => navigator('/profile')}>
      <div className={cls.wrapper}>
        <div className={cls.avatar}>
          {avatarUrl ? <img src={getStaticLink(avatarUrl)} alt="user-avatar" /> : <AvatarPlaceholder /> }
        </div>
        <div className={cls.userInfo}>
          <div className={cls.userInfoGroup}>{size == 'big' && role.title} {group.name}</div>
          <div className={cls.userInfoFIO}>{firstName} {lastName}</div>
          <div className={cls.controls}>
            {size == 'big' && role.permissions.canEdit && (
              <>
                <Select
                  defaultText='Добавить'
                  shouldChangeValueOnSelect={false}
                  className={cls.select}
                  options={[ { label: 'Новость', value: 'News' }, { label: 'Домашку', value: 'Homework' } ]}
                  prefixIcon={<AddIcon />}
                  onSelect={selected => {dispatch(addAndEditModalActions.openModal({ recordId: -1, recordTable: selected.value as "News" | "Homework" }));}}
                />
                <Button size='md' outline purpose='editGroup'>Управление группой</Button>
                <Button size='md' outline purpose='editSchedule' onClick={() => dispatch(scheduleModalActions.openModal())}>Изменить расписание</Button>
              </>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};