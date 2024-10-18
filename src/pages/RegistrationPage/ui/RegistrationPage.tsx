import { Bounce, toast } from 'react-toastify';
import { FC, useMemo, useState } from 'react';
import { Form, Formik } from 'formik';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Steps, message, notification } from 'antd';

import ArrowLeft from '@/shared/assets/img/arrow-left.svg?react';
import { Button } from '@/shared/ui/Button';
import { InfoModal } from '@/widgets/Modals/InfoModal';
import { Input } from '@/shared/ui/Input';
import LogoIcon from '@/shared/assets/img/logo.svg?react';
import { ModalConfig } from '@/widgets/Modals/InfoModal/config/type';
import { PhoneInput } from '@/shared/ui/PhoneInput';
import { RadioInput } from '@/shared/ui/RadioInput';
import { RegDTO } from '@stud-log/news-types/dto/reg.dto';
import RegSuccessIcon from '@/shared/assets/img/regsuccess.svg?react';
import { Select } from '@/shared/ui/Select';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './RegistrationPage.module.scss';
import { steps } from '../config/steps';
import useGroups from '@/shared/hooks/useGroups';
import userService from '@/services/user.service';
import { validationSchema } from '../config/yup';

const RegistrationPage: FC = () => {
  const groups = useGroups();
  const [ currentStep, setCurrentStep ] = useState(0);
  const [ loading, setLoading ] = useState(false);
  const [ modalConfig, setModalConfig ] = useState<ModalConfig | null>(null);
  const [ searchParams ] = useSearchParams();
  const role = searchParams.get("role"); // mentor | student
  const navigate = useNavigate();

  const goBackStep = () => {
    if(currentStep !== 0) setCurrentStep(currentStep - 1);
  };

  const noteErrors = () => {
    notification.warning({
      message: 'Заполните все поля',
      description: 'В предыдущем шаге остались незаполненные поля',
      onClick: goBackStep,
    });
  };

  const initialValues: RegDTO & { policy: '1' | '0' } = {
    firstName: '',
    lastName: '',
    patronymic: '',
    groupId: -1,
    phone: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    policy: '0',
    role: role || '',
  };
  
  return (
    <>
      <div className={cls.LoginPage}>
        <div className={cls.logo}>
          <LogoIcon />
        </div>
        <div className={cls.formContainer}>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              setLoading(true);
              const result = await userService.registration(values);
              setLoading(false);
              if(result == true) {
                setModalConfig({
                  isOpen: true,
                  onClick: () => { navigate('/login'); },
                  btnText: 'Ко входу',
                  description: `Регистрация завершена! ${values.role == 'mentor' ? 'Администрация' : 'Староста'} подтвердит заявку и вам придет письмо о вступлении в группу`,
                  icon: RegSuccessIcon
                });
              }
            }}
            validationSchema={validationSchema}
            enableReinitialize
          >{
              ({ values, submitForm, setFieldValue, errors }) => (
                <Form>
                  <Steps current={currentStep} items={steps} className={classNames('mySteps', {}, [ cls.steps ])}/>
                  <h1 className={classNames(cls.header, { [cls.headerActive]: currentStep !== 0 })} onClick={goBackStep}>{currentStep !== 0 ? <ArrowLeft /> : ''}Регистрация</h1>
                  {
                    currentStep == 0 && (
                      <>
                        <Select defaultOption={groups.find(i => i.id == values.groupId)} options={groups} onSelect={(v) => { setFieldValue('groupId', v.id);}} defaultText={'Выбрать группу'} className={cls.select} needSearch/>
                        <Input name='firstName' label='Имя' className={cls.field} required />
                        <Input name='lastName' label='Фамилия' className={cls.field} required />
                        <Input name='patronymic' label='Отчество' className={cls.field} />
                      </>
                    )
                  }
                  {
                    currentStep == 1 && (
                      <>
                        <PhoneInput name='phone' label='Телефон' className={cls.field} onChange={v => setFieldValue('phone', v)} required />
                        <Input name='email' label='E-mail' className={cls.field} required />
                        <Input name='password' type='password' label='Пароль' className={cls.field} required/>
                        <Input name='passwordConfirmation' type='password' label='Повторите пароль' className={cls.field} required/>
                      </>
                    )
                  }
                  {/* </Form inner> */}
                  <Button onClick={() => {
                    if(currentStep == steps.length - 1) {
                      if(errors['groupId'] || errors['firstName'] || errors['lastName']) {noteErrors();}
                      submitForm();
                      console.log(errors);
                    }
                    else {setCurrentStep(currentStep + 1);}
                  }}
                  size='lg'
                  className={cls.submitBtn}
                  loading={loading}
                  >
                    {currentStep == steps.length - 1 ? 'Зарегистрироваться' : 'Продолжить регистрацию'}
                  </Button>
                  <div className={cls.navigation}>
                    <div style={{ display: 'flex', gap: '.35em' }}><RadioInput value='1' name='policy'> Согласен с </RadioInput><Link to='/policy'>политикой конфиденциальности</Link></div>
                    <Link to='/login'>Уже есть аккаунт</Link>
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

export default RegistrationPage;