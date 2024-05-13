import AddIcon from 'shared/assets/img/icons/add.svg';
import { Button } from 'shared/ui/Button';
import { FC } from 'react';
import { Select } from 'shared/ui/Select';
import { addAndEditModalActions } from 'widgets/Modals/ProfileModals/AddAndEditModal/slice';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './MentorControls.module.scss';
import { manageGroupModalActions } from 'widgets/Modals/ProfileModals/ManageGroupModal/slice';
import { scheduleModalActions } from 'widgets/Modals/ProfileModals/ScheduleModal/slice';
import { useDispatch } from 'react-redux';
import userService from 'services/user.service';

interface MentorControlsProps {
  className?: string;
}

export const MentorControls: FC<MentorControlsProps> = ({ className }) => {
  const dispatch = useDispatch();
  const { role } = userService.getUser();

  if(role.permissions.canEdit)
    return (
      <>
        <Select
          defaultText='Добавить'
          shouldChangeValueOnSelect={false}
          className={cls.select}
          options={[ { label: 'Новость', value: 'News' }, { label: 'Домашку', value: 'Homework' } ]}
          prefixIcon={<AddIcon />}
          mobileCentered
          onSelect={selected => {dispatch(addAndEditModalActions.openModal({ recordId: -1, recordTable: selected.value as "News" | "Homework" }));}}
        />
        <Button size='md' outline purpose='editGroup' onClick={() => dispatch(manageGroupModalActions.openModal())}>Управление группой</Button>
        <Button size='md' outline purpose='editSchedule' onClick={() => dispatch(scheduleModalActions.openModal())}>Изменить расписание</Button>
      </>
    );

  return <div></div>;
};