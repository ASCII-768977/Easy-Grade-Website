import React, { useState } from 'react';
import allocateAssIcon from '../../assets/img/allocateAss_icon.svg';
import './AssignmentAllocate.scss';
import { Row, Col, Button } from 'antd';
import AssignmentAllocateTable from './AssignmentAllocateTable';
import PopUpWindow from '../PopUpWindow/PopUpWindow';
import AllocatingAssDetails from './AllocatingAssDetails';
import FilterTabs from './FilterTabs';
import SearchBox from './SearchBox';
const AssignmentAllocate: React.FC<any> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const title = 'Allocating Assignments';
  const icon = allocateAssIcon;

  return (
    <div className="assignmentallocate-tab">
      <Row justify="space-between" gutter={[24, 24]} align="top">
        <Col className="gutter-row m-col-min-width">
          <div className={'assignmentallocate-tab-header'}>
            <h2>Allocated Status</h2>
          </div>
        </Col>

        <Col className="gutter-row sm-col-min-width">
          <Row justify="space-between" align="middle">
            <Col>
              <SearchBox />
            </Col>
            <Col>
              <Button className="ant-btn--theme-gray" type="primary" onClick={showModal}>
                Allocate Assignments
              </Button>
              <PopUpWindow
                title={title}
                modalIcon={icon}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
              >
                <AllocatingAssDetails handleCancel={handleCancel} />
              </PopUpWindow>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="space-between" align="top">
        <Col className="gutter-row m-col-min-width">
          <FilterTabs />
        </Col>

        <Col className="gutter-row sm-col-min-width" flex="1 0 225px"></Col>
      </Row>
      <AssignmentAllocateTable />
    </div>
  );
};

export default AssignmentAllocate;
