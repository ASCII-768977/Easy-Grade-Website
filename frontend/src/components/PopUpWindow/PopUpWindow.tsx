import React from 'react';
import { Modal } from 'antd';
import { PopUpWindowProps } from '../../types';
import './PopUpWindow.scss';
const PopUpWindow: React.FC<PopUpWindowProps> = (props) => {
  const { isModalVisible, setIsModalVisible, children, modalIcon, title, customOncancel } = props;

  const handleCancel = () => {
    setIsModalVisible(false);
    if (customOncancel) {
      customOncancel();
    }
  };

  return (
    <Modal centered={true} visible={isModalVisible} closable={false} onCancel={handleCancel} footer={false}>
      <div className={'modal-header'}>{<img src={modalIcon} alt="logo" className={'modal-header-icon'} />}</div>
      <div id={'modal-body'} className={'modal-body'}>
        <h1 id={'modal-body-title'} className={'modal-body-title'}>
          {title}
        </h1>
        {children}
      </div>
    </Modal>
  );
};

export default PopUpWindow;
