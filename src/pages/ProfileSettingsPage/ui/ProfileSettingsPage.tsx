import { FC, useMemo, useRef, useState } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { Button } from 'shared/ui/Button';
import { InDevelopmentBlock } from 'shared/ui/InDevelopmentBlock';
import { Input } from 'shared/ui/Input';
import { Layout } from 'shared/ui/Layout';
import { PhoneInput } from 'shared/ui/PhoneInput';
import { Schedule } from 'widgets/Schedule';
import { User } from '@stud-log/news-types/models';
import { UserAvatars } from '../components/UserAvatars/UserAvatars';
import cls from './ProfileSettingsPage.module.scss';
import { useNavigate } from 'react-router-dom';
import userService from 'services/user.service';
import { withWidget } from 'shared/hooks/withWidget';

const ProfileSettingsPage: FC = () => {
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef<FormikProps<Partial<User>> | null>(null);
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };
  const {
    data: user,
    error,
    mutate,
  }: SWRResponse<User> = useSWR(`/api/users/me`, $apiGet);
  return (
    <Layout.Sticky className={cls.SchedulePage}>
      <Layout.StickyHeader slots={{
        start: <Button outline purpose='back' size='md' onClick={() => navigate(-1)}>Назад</Button>,
        end: <>
          <Button style={{ maxWidth: 'max-content' }} size='md' onClick={handleSubmit} loading={loading}>Сохранить данные</Button>
          <Button style={{ maxWidth: 'max-content' }} purpose='logout' size='md' outline onClick={() => {userService.logout();}}>Выйти</Button>
        </>
      }} />
      <Layout.StickyContent>
        {user && <>
          <div className={cls.header}>Персональные данные</div>
          <div className={cls.formWrapper}>
            <Formik
              innerRef={formRef}
              initialValues={{
                avatarUrl: user.avatarUrl,
                avatarColor: user.settings.nickColor,
                nickname: user.nickname || '',
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
              
              } as Partial<User>}
              onSubmit={async (values) => {
                setLoading(true);
                await userService.updateUser(values);
                setLoading(false);
              }}
              enableReinitialize
            >
              {({ values, setFieldValue }) => <Form>
                <UserAvatars className={cls.avatarsBlock} onChange={(url, color) => {
                  setFieldValue('avatarUrl', url);
                  setFieldValue('avatarColor', color);
                }} receivedAchievements={user.achievements.flatMap(achieve => achieve.achievement)}/>
                <div className={cls.inputsWrapper}>
                  <Input name='nickname' label='Ник'/>
                  <Input name='firstName' label='Имя'/>
                  <PhoneInput name='phone' label='Номер телефона' onChange={v => setFieldValue('phone', v)}/>
                  <Input name='lastName' label='Фамилия'/>
                </div>
              </Form>}
            </Formik>
          </div>
        </>
        }
        
        <div className={cls.header}>
          Настройки приватности
        </div>
        <InDevelopmentBlock />
      </Layout.StickyContent>
    </Layout.Sticky>
  );
};

export default withWidget(ProfileSettingsPage, [ Schedule ]);