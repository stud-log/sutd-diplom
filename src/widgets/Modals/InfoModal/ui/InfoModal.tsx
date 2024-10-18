import { Button } from '@/shared/ui/Button';
import { FC } from 'react';
import { Modal } from 'antd';
import { ModalConfig } from '../config/type';
import cls from './InfoModal.module.scss';

interface InfoModalProps {
  modalConfig: ModalConfig | null;
}

export const InfoModal: FC<InfoModalProps> = ({ modalConfig }) => {
  if (modalConfig) {
    const Icon = modalConfig.icon;
    return (
      <Modal open={modalConfig.isOpen} closable={false} footer={<div></div>} centered>
        <div className={cls.modalInner}>
          <div className={cls.modalIcon}><Icon /></div>
          <div className={cls.modalDesc}>{modalConfig.description}</div>
          <div className={cls.modalBtn}>
            <Button size='lg' onClick={modalConfig.onClick}>{modalConfig.btnText}</Button>
          </div>
        </div>
      </Modal>
    );
  }
  return <></>;
};