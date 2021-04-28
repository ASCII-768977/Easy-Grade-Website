import React, { useState } from 'react';
import PopUpWindow from '../PopUpWindow/PopUpWindow';
import { Form, Input, Button, Select } from 'antd';
import { CourseDetailsProps } from '../../types';
import './CourseDetails.scss';
import { connect, useDispatch } from 'react-redux';
import { State } from '../../types/state';
import { asyncCreateCourse, asyncAddCourse } from '../../store/sagas/actions/asyncActionCreator';
import modalIcon from '../../assets/img/modal_icon.svg';

const mapStateToProps = (state: State) => ({
  courseList: state.courseList,
  createdBy: state.user.accountEmail,
});

const CourseDetails: React.FC<CourseDetailsProps> = (props) => {
  const [isResultVisible, setIsResultVisible] = useState(false);

  const showResult = () => {
    setIsResultVisible(true);
  };
  const handleResultCancel = () => {
    setIsResultVisible(false);
  };

  const dispatch = useDispatch();

  const { handleCancel, createdBy, isCreateCourse } = props;
  const [form]: any = Form.useForm();

  const onFinish = (values: any) => {
    const accountEmail = createdBy;
    values.course = { ...values.course, createdBy, accountEmail };
    {
      isCreateCourse ? dispatch(asyncCreateCourse(values.course)) : dispatch(asyncAddCourse(values.course));
    }
    form.resetFields();
    showResult();
  };

  const onReset = () => {
    handleCancel();
    form.resetFields();
  };

  return (
    <>
      {isCreateCourse ? (
        <Form name="nest-messages" onFinish={onFinish} className={'courseDetails-wrapper'} form={form}>
          <h3>Course Code</h3>
          <Form.Item name={['course', 'courseCode']}>
            <Input placeholder="eg:INFS7900" autoComplete="off" />
          </Form.Item>
          <h3>Course Name</h3>
          <Form.Item name={['course', 'courseName']}>
            <Input placeholder="Introduction to Software Engineer" />
          </Form.Item>
          <h3>Course Description</h3>
          <Form.Item name={['course', 'courseDesc']}>
            <Input.TextArea placeholder="eg:This course is mainly introduce ..." />
          </Form.Item>
          <h3>
            <Form.Item name={['course', 'startYear']} label="Year:">
              <Select style={{ width: '100px' }}>
                <Select.Option value="2020">2020</Select.Option>
                <Select.Option value="2021">2021</Select.Option>
                <Select.Option value="2022">2022</Select.Option>
                <Select.Option value="2023">2023</Select.Option>
                <Select.Option value="2024">2024</Select.Option>
                <Select.Option value="2025">2025</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name={['course', 'startTerm']} label="Term:" style={{ marginLeft: '40px' }}>
              <Select style={{ width: '100px' }}>
                <Select.Option value="Spring">Spring</Select.Option>
                <Select.Option value="Summer">Summer</Select.Option>
                <Select.Option value="Autumn">Autumn</Select.Option>
                <Select.Option value="Winter">Winter</Select.Option>
              </Select>
            </Form.Item>
          </h3>
          <div className={'button-group'}>
            <Form.Item>
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                onClick={() => {
                  handleCancel();
                }}
              >
                Create Course
              </Button>
              <Button
                className={'button-cancel'}
                danger
                key="back"
                onClick={() => {
                  onReset();
                }}
              >
                Cancel
              </Button>
            </Form.Item>
          </div>
        </Form>
      ) : (
        <Form onFinish={onFinish} className={'courseDetails-wrapper'} form={form}>
          <h3>Course Entry Code</h3>
          <Form.Item name={['course', 'courseEntryCode']}>
            <Input placeholder="eg:AB123" autoComplete="off" />
          </Form.Item>
          <div className={'button-group'}>
            <Form.Item>
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                onClick={() => {
                  handleCancel();
                }}
              >
                Add a Course
              </Button>
              <Button
                className={'button-cancel'}
                danger
                key="back"
                onClick={() => {
                  onReset();
                }}
              >
                Cancel
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
      <PopUpWindow
        isModalVisible={isResultVisible}
        setIsModalVisible={setIsResultVisible}
        title={`Congradulation`}
        modalIcon={modalIcon}
      >
        {isCreateCourse ? (
          <div className={'teacher-result'}>
            <h2 className={'teacher-result-header'}>Your Course Has Successfully Created</h2>
          </div>
        ) : (
          <div className={'student-result'}>
            <h2 className={'student-result-header'}>Your Course Has Successfully Added</h2>
          </div>
        )}
        <div className={'result-button'}>
          <Button
            className={'button-cancel'}
            danger
            key="back"
            onClick={() => {
              handleResultCancel();
            }}
          >
            Close
          </Button>
        </div>
      </PopUpWindow>
    </>
  );
};

export default connect(mapStateToProps)(CourseDetails);
