import React, { useState } from 'react';
import { Button, Row, Col } from 'antd';
import PopUpWindow from '../PopUpWindow/PopUpWindow';
import modalIcon from '../../assets/img/modal_icon.svg';
import { State } from '../../types/state';
import { connect } from 'react-redux';
import CreateAssignmentDetails from './CreateAssignmentDetails';
import './CreateAssignmentHeader.scss';

const mapStateToProps = (state: State) => ({
  role: state.user.role,
});

const CreateAssignmentHeader: React.FC<any> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { role, isFinished } = props;
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const title = 'Assignment Settings';

  return (
    <>
      <div className={'createPage-header'}>
        <Row justify="space-between">
          {isFinished === false ? (
            <Col span={6}>
              <h3> Ongoing Assignments</h3>
            </Col>
          ) : (
            <Col span={6}>
              <h3> Dued Assignments</h3>
            </Col>
          )}
          {role === 'teacher' && isFinished === false ? (
            <Col span={6}>
              <Button type="primary" onClick={showModal}>
                Create An Assignments
              </Button>
            </Col>
          ) : (
            <div />
          )}
        </Row>
      </div>
      <PopUpWindow
        title={title}
        modalIcon={modalIcon}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      >
        <CreateAssignmentDetails handleCancel={handleCancel} />
      </PopUpWindow>
    </>
  );
};

export default connect(mapStateToProps)(CreateAssignmentHeader);
