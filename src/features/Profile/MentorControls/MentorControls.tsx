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
import { addAndEditCustomActivityActions } from 'widgets/Modals/ProfileModals/AddAndEditCustomActivity/slice';
import AddIcon from 'shared/assets/img/icons/add.svg';
import EditScheduleIcon from 'shared/assets/img/icons/edit-schedule.svg';
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
          id='addSelect'
          defaultText='Добавить'
          prefixIcon={<AddIcon />} // нужно передавать не компонент, а просто свгшку и все будет ок и не нужен будет проп prefixVariant
          shouldChangeValueOnSelect={false}
          className={cls.select}
          options={[ { label: 'Новость', value: 'News' }, { label: 'Домашку', value: 'Homework' } ]}
          prefixVariant='add'
          mobileCentered
          onSelect={selected => {dispatch(addAndEditModalActions.openModal({ recordId: -1, recordTable: selected.value as "News" | "Homework" }));}}
        />
        <Button size='md' outline purpose='editGroup' onClick={() => dispatch(manageGroupModalActions.openModal())}>Управление группой</Button>
        
        <Select
          id='changeSelect'
          defaultText='Изменить расписание'
          shouldChangeValueOnSelect={false}
          className={cls.select}
          options={[ { label: 'Изменить учебное', value: 'Timetable' }, { label: 'Добавить событие', value: 'Custom' } ]}
          prefixVariant='schedule'
          prefixIcon={<EditScheduleIcon />}
          mobileCentered
          onSelect={selected => {
            if(selected.value === 'Custom') {
              dispatch(addAndEditCustomActivityActions.openModal({ recordId: -1 }));
            } else if (selected.value === 'Timetable') {
              dispatch(scheduleModalActions.openModal());
            }
          }}
        />
      </>
    );

  return <div></div>;
};