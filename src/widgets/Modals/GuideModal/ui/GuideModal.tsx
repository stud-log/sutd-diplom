import { FC, useState } from 'react';
import { Modal, Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'shared/ui/Button';
import CloseIcon from 'shared/assets/img/icons/x-close.svg';
import { RootStateSchema } from 'app/providers/ReduxProvider';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './GuideModal.module.scss';
import { getStaticLink } from 'shared/lib/helpers/getStaticLink';
import { guideModalActions } from '../slice';
import { steps } from '../types';
import userService from 'services/user.service';
import { Interweave } from 'interweave';

interface GuideModalProps {
  className?: string;
}

export const GuideModal: FC<GuideModalProps> = ({ className }) => {
  const { isModalOpen } = useSelector<RootStateSchema, RootStateSchema['guideModal']>(state => state.guideModal);
  const [ currentStep, setCurrentStep ] = useState(0);
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(guideModalActions.closeModal());
  const goBackStep = () => {setCurrentStep(currentStep - 1);};
  const goNextStep = () => {setCurrentStep(currentStep + 1);};
  
  const step = steps.at(currentStep);
  return (
    <Modal destroyOnClose styles={{ body: { padding: 30 } }} width={650} closeIcon={<div></div>} className={classNames(cls.GuideModal, {}, [ className ])} open={isModalOpen} footer={<div></div>}>
      
      {
        step && (
          <div className={cls.stepWrapper}>
            <div className={cls.stepImage}>
              <img src={getStaticLink(step.myImage)} alt="" />
            </div>
            <div className={cls.titleWrapper}>
              <div className={cls.stepTitle}>{step.myTitle}</div>
              <div className={cls.label}>Обучение</div>
            </div>
            <div className={cls.text}>
              <Interweave content={step.myDescription} />
            </div>
          </div>
        )
      }
      <div className={cls.controls}>
        {currentStep !== 0 && <Button size='md' onClick={goBackStep} outline>Вернуться назад</Button>}
        {currentStep != steps.length - 1 && <Button size='md' onClick={goNextStep} >Перейти дальше</Button>}
        {currentStep == steps.length - 1 && <Button size='md' loading={loading} onClick={async () => {
          setLoading(true);
          const res = await userService.seenGuideline();
          if(res) closeModal();
          setLoading(false);
        }} >Все понятно</Button>}
      </div>
      <div className={cls.dots}>
        <Steps current={currentStep} items={steps} className={classNames('myDottedSteps', {}, [ cls.steps ])}/>
      </div>
    </Modal>
  );
};