import { Checkbox, Modal } from 'antd';
import { FC, useState } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from '@/shared/http/helpers/apiGet';
import { Button } from '@/shared/ui/Button';
import CloseIcon from '@/shared/assets/img/icons/x-close.svg?react';
import { RootStateSchema } from '@/app/providers/ReduxProvider';
import { User } from '@stud-log/news-types/models';
import { UserStatus } from '@stud-log/news-types/enums';
import { UserWithAvatar } from '@/shared/ui/UserWithAvatar';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './ManageGroupModal.module.scss';
import groupService from '@/services/group.service';
import { manageGroupModalActions } from '../slice';
import userService from '@/services/user.service';

interface ManageGroupModalProps {
  className?: string;
}

export const ManageGroupModal: FC<ManageGroupModalProps> = ({ className }) => {
  const { id } = userService.getUser();
  const [ loading, setLoading ] = useState(false);
  const { isModalOpen } = useSelector<RootStateSchema, RootStateSchema['manageGroupModal']>(state => state.manageGroupModal);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(manageGroupModalActions.closeModal());

  const { data: users, error, mutate }: SWRResponse<User[]> = useSWR(
    isModalOpen ? `/api/groups/users` : null,
    $apiGet,
  );

  const filteredUsers = users?.filter(user => user.id != id );
  
  return (
    <Modal maskClosable={true} onCancel={closeModal} destroyOnClose styles={{ body: { padding: 30 } }} width={650} closeIcon={<CloseIcon onClick={closeModal} />} className={classNames(cls.AddAndEditModal, {}, [ className ])} open={isModalOpen} footer={<div></div>}>
      <div className='h1'>Управление группой</div>
      <div className={cls.formWrapper}>
        <Formik
          initialValues={{
            pickedUsers: [] as number[],
            action: '',
          }}
          enableReinitialize
          onSubmit={async (values) => {
            setLoading(true);
            if(values.action == 'accept') {
              await groupService.acceptUsers(values.pickedUsers);
              mutate();
             
            }
            if(values.action == 'reject') {
              await groupService.rejectUsers(values.pickedUsers);
              mutate();
              
            }
            setLoading(false);
          }}
        >
          {({ setFieldValue, submitForm, values, errors, touched }) =>
            <Form>
              <div className={cls.usersWrapper}>
                {filteredUsers?.length == 0 && <div className={cls.empty}>В группе кроме Вас пока никого нет</div>}
                {filteredUsers?.map(user => {
                  return (
                    <div className={cls.userWrapper} key={user.id}>
                      <Checkbox className={cls.checkbox}
                        checked={!!values.pickedUsers.find(i => i == user.id)}
                        onChange={() => {
                        // TODO: may be rewrite on FieldArray? It can optimize deleting or adding new user to an array
                          const u = values.pickedUsers.findIndex(i => i == user.id);
                          if( u != -1) {
                          // remove from picked
                            setFieldValue('pickedUsers', values.pickedUsers.filter((i, idx) => idx !== u));
                          } else {
                          // add to already picked
                            const anArray = ([] as number[]).concat(values.pickedUsers);
                            anArray.push(user.id);
                            setFieldValue('pickedUsers', anArray);
                          }
                        }}>
                        <UserWithAvatar user={user}/>
                        {user.status == UserStatus.inReview && <div className={cls.waiter}>Ждет принятия в группу</div>}
                      </Checkbox>
                    </div>
                  );
                })
                }
              </div>
              <div className={cls.controls}>
                <Button
                  disabled={values.pickedUsers.length === 0}
                  onClick={async () => {
                    await setFieldValue('action', 'accept');
                    submitForm();
                  }} size='md' loading={loading}>Принять в группу ({values.pickedUsers.length})</Button>
                <Button
                  disabled={values.pickedUsers.length === 0}
                  onClick={async () => {
                    await setFieldValue('action', 'reject');
                    submitForm();
                  }} size='md' loading={loading} outline purpose='delete'>Удалить ({values.pickedUsers.length})</Button>
              </div>
              
            </Form>
          }
        </Formik>
      </div>
    </Modal>
  );
};