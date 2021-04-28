import React from 'react';
import './EditSourceLinks.scss';
import { Form, Input, Button, Space, notification } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { State } from '../../types/state';
import { connect, useDispatch } from 'react-redux';
import { asyncUpdateCourseDetails } from '../../store/sagas/actions/asyncActionCreator';
const mapStateToProps = (state: State) => ({
  currentCourse: state.course,
  material: state.course.material,
});

const EditSourceLinks: React.FC<any> = (props: any) => {
  const { currentCourse, material, handleCancel } = props;
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    dispatch(asyncUpdateCourseDetails({ ...currentCourse, material: values.material }, currentCourse._id));
    notification.success({
      message: 'Success',
      description: 'The change has been saved.',
    });
    handleCancel();
  };
  const onFinishFailed = ({ values, errorFields }: any) => {
    notification.error({
      message: 'Error',
      description: `${errorFields[0].errors}`,
    });
  };
  const [form] = Form.useForm();
  form.setFieldsValue({ material });

  return (
    <div className="edit-source-link-form__container">
      <Form
        form={form}
        name="edit_source_links_form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.List name="material">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'title']}
                      fieldKey={[fieldKey, 'title']}
                      rules={[{ required: true, message: 'Missing title' }]}
                    >
                      <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'link']}
                      fieldKey={[fieldKey, 'link']}
                      rules={[
                        { type: 'url', message: 'Please enter a valid url' },
                        { required: true, message: 'Missing link' },
                      ]}
                    >
                      <Input className="edit-source-links-form__link" placeholder="Link" />
                    </Form.Item>
                    <CloseOutlined onClick={() => remove(name)} />
                  </Space>
                ))}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add material
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(mapStateToProps)(EditSourceLinks);
