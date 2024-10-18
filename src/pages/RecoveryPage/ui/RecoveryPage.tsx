import { FC, useState } from 'react';
import { Form, Formik } from 'formik';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { validationSchema1, validationSchema2 } from '../config/yup';

import { Button } from '@/shared/ui/Button';
import { InfoModal } from '@/widgets/Modals/InfoModal';
import { Input } from '@/shared/ui/Input';
import LogoIcon from '@/shared/assets/img/logo.svg?react';
import ModalIcon from '@/shared/assets/img/modalIcon.svg?react';
import SuccessIcon from '@/shared/assets/img/regsuccess.svg?react';
import { ModalConfig } from '@/widgets/Modals/InfoModal/config/type';
import { ResetPasswordDTO } from '@stud-log/news-types/dto';
import cls from './RecoveryPage.module.scss';
import { getEmailSiteUrl } from '@/shared/lib/helpers/getEmailSiteUrl/getEmailSiteUrl';
import userService from '@/services/user.service';

const RequestForm: FC = () => {
  const [ loading, setLoading ] = useState(false);
  const [ modalConfig, setModalConfig ] = useState<ModalConfig | null>(null);
  return (
    <>
      <div className={cls.RecoveryPage}>
        <div className={cls.logo}>
          <LogoIcon />
        </div>
        <div className={cls.formContainer}>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={async (values) => {
              setLoading(true);
              const response = await userService.recoveryRequest(values.email);
              setLoading(false);
              if(response?.data.result == true){
                // in other cases will show notification
                const emailLink = getEmailSiteUrl(values.email);
                setModalConfig({
                  isOpen: true,
                  onClick: () => { window.location.href = emailLink;},
                  btnText: 'Перейти в почту',
                  description: "Ссылка на восстановление пароля была отправлена вам на email",
                  icon: ModalIcon
                });
              }
            }}
            enableReinitialize
            validationSchema={validationSchema1}
          >{
              ({ values, submitForm }) => (
                <Form>
                  <h1 className={cls.header}>Восстановление пароля</h1>
                  <Input name='email' label='E-mail' className={cls.field} />
                  <Button onClick={submitForm} size='lg' className={cls.submitBtn} loading={loading}>Восстановить</Button>
                  <div className={cls.navigation}>
                    <a href={`mailto:${import.meta.env.VITE_APP_EMAIL}`}>Написать в поддержку</a>
                    <Link to='/login'>Войти</Link>
                  </div>
                </Form>
              )
            }</Formik>
        </div>
      </div>
      <InfoModal modalConfig={modalConfig}/>
    </>
  );
};

const RecoveryForm: FC<{userId: string; recoveryId: string; hash: string}> = ({ hash, recoveryId, userId }) => {
  const [ loading, setLoading ] = useState(false);
  const [ modalConfig, setModalConfig ] = useState<ModalConfig | null>(null);

  const navigate = useNavigate();
  return (
    <>
      <div className={cls.RecoveryPage}>
        <div className={cls.logo}>
          <LogoIcon />
        </div>
        <div className={cls.formContainer}>
          <Formik
            initialValues={{
              hash,
              recoveryId,
              userId,
              password: '',
              passwordConfirmation: '',
            } as ResetPasswordDTO}
            onSubmit={async (values) => {
              setLoading(true);
              const response = await userService.recoveryWithGivenLink(values);
              setLoading(false);
              if(response?.data.result == true){
                setModalConfig({
                  isOpen: true,
                  onClick: () => { navigate('/login'); },
                  btnText: 'Ко входу',
                  description: "Пароль успешно изменен! Теперь, вы можете войти в систему",
                  icon: SuccessIcon
                });
              }
            }}
            enableReinitialize
            validationSchema={validationSchema2}
          >{
              ({ submitForm }) => (
                <Form>
                  <h1 className={cls.header}>Восстановление пароля</h1>
                  <Input name='password' type='password' label='Введите новый пароль' className={cls.field} required/>
                  <Input name='passwordConfirmation' type='password' label='Повторите новый пароль' className={cls.field} required/>
                  <Button onClick={submitForm} size='lg' className={cls.submitBtn} loading={loading}>Сохранить</Button>
                  <div className={cls.navigation}>
                    <a href={`mailto:${import.meta.env.VITE_APP_EMAIL}`}>Написать в поддержку</a>
                    <Link to='/login'>Войти</Link>
                  </div>
                </Form>
              )
            }</Formik>
        </div>
      </div>
      <InfoModal modalConfig={modalConfig}/>
    </>
  );
};

const RecoveryPage: FC = () => {
  const [ searchParams ] = useSearchParams();
  const userId = searchParams.get("userId");
  const hash = searchParams.get("hash");
  const recoveryId = searchParams.get("recoveryId");

  if (userId && hash && recoveryId) return <RecoveryForm hash={hash} recoveryId={recoveryId} userId={userId}/>;
  else return <RequestForm />;
};

export default RecoveryPage;