import React, { useEffect } from 'react';
import { CreateAssignmentDetailsProps } from '../../types';
import { Form, Input, Button, DatePicker, InputNumber, notification } from 'antd';
import { State } from '../../types/state';
import moment from 'moment';
import './CreateAssignmentDetails.scss';
import { asyncCreateAssignment, asyncRequestAssignmentList } from '../../store/sagas/actions/asyncActionCreator';

import { connect, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
const mapStateToProps = (state: State) => ({
  assignment: state.assignment,
});
const CreateAssignmentDetails: React.FC<CreateAssignmentDetailsProps> = (props) => {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const courseId = url.split('/')[2];
  const { handleCancel } = props;
  const [form]: any = Form.useForm();

  useEffect(() => {
    dispatch(asyncRequestAssignmentList(courseId));
  }, [dispatch, courseId]);

  const onFinish = (values: any) => {
    values.assignment = {
      ...values.assignment,
      courseId: courseId,
      dueDate: moment(values.assignment.dueDate).valueOf().toString(),
      releaseDate: moment(values.assignment.releaseDate).valueOf().toString(),
    };
    dispatch(asyncCreateAssignment(values.assignment));
    notification.success({
      message: 'Success',
      description: 'The assignment has been created.',
    });
    handleCancel();
    form.resetFields();
  };

  const onFinishFailed = ({ errorFields }: any) => {
    notification.error({
      message: 'Error',
      description: `${errorFields[0].errors}`,
    });
  };

  const onCancel = () => {
    handleCancel();
    form.resetFields();
  };

  return (
    <div className={'assignment-wrapper'}>
      <Form name="nest-messages" onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
        <h3>Assignment Name</h3>
        <Form.Item
          name={['assignment', 'assignmentName']}
          rules={[{ required: true, message: 'Missing assignment name' }]}
        >
          <Input placeholder="eg:Short Answer Question" autoComplete="off" />
        </Form.Item>
        <h3>Assignment Description</h3>
        <Form.Item
          name={['assignment', 'assignmentDesc']}
          rules={[{ required: true, message: 'Missing assignment description' }]}
        >
          <Input.TextArea placeholder="eg:This Assignment is ..." autoComplete="off" />
        </Form.Item>
        <Form.Item name={['assignment', 'totalScore']} label={'Total Score'} rules={[{ type: 'number', min: 0 }]}>
          <InputNumber min={0} />
        </Form.Item>

        <h3 className={'assignment-date'} id={'assignment-date'}>
          <Form.Item
            label="Released Date"
            name={['assignment', 'releaseDate']}
            rules={[{ required: true, message: 'Please choose a releaseDate' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Due Date"
            className={'item-dueDate'}
            name={['assignment', 'dueDate']}
            rules={[{ required: true, message: 'Please choose a dueDate' }]}
          >
            <DatePicker />
          </Form.Item>
        </h3>
        <div className={'button-group'}>
          <Form.Item>
            <Button key="submit" type="primary" htmlType="submit">
              Create An Assignment
            </Button>
            <Button
              className={'button-cancel'}
              danger
              key="back"
              onClick={() => {
                onCancel();
              }}
            >
              Cancel
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default connect(mapStateToProps)(CreateAssignmentDetails);
