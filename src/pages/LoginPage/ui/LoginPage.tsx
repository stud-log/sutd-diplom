import { FC, useState } from 'react';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { LoginDTO } from '@stud-log/news-types/dto';
import LogoIcon from 'shared/assets/img/logo.svg';
import cls from './LoginPage.module.scss';
import userService from 'services/user.service';
import { validationSchema } from '../config/yup';

const initialValues: LoginDTO = {
  email: '',
  password: ''
};

const LoginPage: FC = () => {
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={cls.LoginPage}>
      <div className={cls.logo}>
        <LogoIcon />
      </div>
      <div className={cls.formContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            setLoading(true);
            const result = await userService.login(values.email, values.password);
            setLoading(false);
            if(result == true) { navigate('/main'); }
          }}
          enableReinitialize
          validationSchema={validationSchema}
        >{
            ({ values, submitForm }) => (
              <Form>
                <h1 className={cls.header}>Войти в аккаунт</h1>
                <Input name='email' label='E-mail' className={cls.field} />
                <Input name='password' label='Пароль' type='password' className={cls.field} />
                <Button onClick={submitForm} size='lg' className={cls.submitBtn} loading={loading}>Войти</Button>
                <div className={cls.navigation}>
                  <Link to='/recovery'>Восстановить пароль</Link>
                  <Link to='/reg'>Зарегистрироваться</Link>
                </div>
              </Form>
            )
          }</Formik>
      </div>
    </div>
  );
};

export default LoginPage;