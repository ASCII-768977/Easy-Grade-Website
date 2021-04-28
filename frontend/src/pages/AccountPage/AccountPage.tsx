import React from 'react';
import './AccountPage.scss';
import Layout from '../../components/Layout/Layout';
import MainNav from '../../components/MainNav/MainNav';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { NavLinks } from '../../types';
import { Form, Input, Button, Radio, notification } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { State } from '../../types/state';
import { asyncUpdateAccount } from '../../store/sagas/actions/asyncActionCreator';

const mapStateToProps = (state: State) => ({
  id: state.user._id,
  accountName: state.user.accountName,
  accountEmail: state.user.accountEmail,
});

const navLinks: NavLinks = [
  {
    title: 'Account Setting',
    path: '',
    icon: <SettingOutlined />,
  },
];

const breadNavs = [
  { title: 'Home', path: '/' },
  { title: 'Account', path: '/account' },
];

const formItemLayout = {
  wrapperCol: {
    span: 12,
  },
};

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const AccountPage: React.FC<any> = (props) => {
  const { id, accountName, accountEmail } = props;
  const dispatch = useDispatch();

  const handleFinish = (values: any) => {
    dispatch(asyncUpdateAccount(values.account, id));
    notification.success({
      message: 'Success',
      description: 'The change has been saved.',
    });
  };

  const handleFinishFailed = ({ errorFields }: any) => {
    notification.error({
      message: 'Error',
      description: `${errorFields[0].errors}`,
    });
  };

  const [form] = Form.useForm();

  return (
    <>
      <MainNav title="Account" description="This is a page for configuring your account. " navLinks={navLinks} />
      <Layout breadNavs={breadNavs}>
        <div className="account-page">
          <h2>Account Settings</h2>
          <Form
            form={form}
            name="edit-account"
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
            {...formItemLayout}
            initialValues={{}}
          >
            <h3>Full Name</h3>
            <Form.Item name={['account', 'accountName']} initialValue={accountName}>
              <Input placeholder="eg:John Example" />
            </Form.Item>

            <h3>Email</h3>
            <Form.Item name={['account', 'accountEmail']} initialValue={accountEmail}>
              <Input placeholder="eg:example@gmail.com" />
            </Form.Item>

            <h3>Password</h3>
            <Form.Item
              name="accountPwd"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="12 characters, must inlude letter and number" />
            </Form.Item>

            <h3>Password Confirmation</h3>
            <Form.Item
              name="confirmpassword"
              dependencies={['accountPwd']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('accountPwd') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="eg:QWER123456" />
            </Form.Item>

            <h3>Email Notification</h3>
            <Form.Item name={['account', 'notificationType']} initialValue={'1'}>
              <Radio.Group name="radiogroup">
                <Radio style={radioStyle} value="1">
                  All Regrade Request
                </Radio>
                <Radio style={radioStyle} value="2">
                  Only Submissions You’ve Graded
                </Radio>
                <Radio style={radioStyle} value="3">
                  No Regrade Request Notifications
                </Radio>
              </Radio.Group>
            </Form.Item>

            <div className="button-group">
              <div className="button-single">
                <Form.Item className="form-update">
                  <Button type="primary" htmlType="submit" className="update-form-button">
                    Save Changes
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </Layout>
    </>
  );
};

export default connect(mapStateToProps)(AccountPage);
