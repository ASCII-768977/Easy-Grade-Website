import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo_blue.svg';
import { Button, Col, Form, Input, Radio, Row } from 'antd';
import './SignUpPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { requestUserSignUp } from '../../store/actions/account';
import { Role } from '../../types';
import { State } from '../../types/state';
import Alert from 'antd/es/alert';

interface SignUpForm {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  role: Role;
}

const SignUpPage: React.FC = (props: any) => {
  const { history } = props;
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);
  const { signUpErrorMessage, isAuthenticated } = user;

  useEffect(() => {
    if (isAuthenticated) history.push('/');
  }, [history, user, isAuthenticated]);

  const handleFinish = async (values: SignUpForm) => {
    const accountName = values.firstname + '|' + values.lastname;
    const signUpData = { accountEmail: values.email, accountPwd: values.password, accountName, role: values.role };
    dispatch(requestUserSignUp(signUpData));
  };

  const passwordValidator = () => ({
    validator(_: any, value: string) {
      const numReg = /^(?=.*\d).*$/;
      const lowercaseReg = /^(?=.*[a-z]).*$/;
      if (!numReg.test(value)) return Promise.reject('Your password must contain at least one number digit.');
      if (!lowercaseReg.test(value)) return Promise.reject('Your password must contain at least one lowercase letter.');
      if (value.length < 8 || value.length > 30)
        return Promise.reject('Your password must be between 8 and 30 characters.');
      return Promise.resolve();
    },
  });

  const confirmValidator = ({ getFieldValue }: { getFieldValue: Function }) => ({
    validator(_: any, value: string) {
      if (!value || getFieldValue('password') === value) return Promise.resolve();
      return Promise.reject('The two passwords that you entered do not match!');
    },
  });

  return (
    <div className="sign-up sign-in-layout">
      <div className="sign-in-layout__left">
        <div className="sign-in-left__container">
          <div className="sign-in__logo-container">
            <Link to="/">
              <img className="sign-in__logo" src={logo} alt="logo" />
            </Link>
          </div>
          <Form name="register" onFinish={handleFinish} scrollToFirstError>
            <Form.Item
              className="form-role"
              name="role"
              rules={[{ required: true, message: 'Please select an account role.' }]}
            >
              <Row justify="space-between" align="middle">
                <Col>
                  <h2 className="form-role__header">Sign up as an:</h2>
                </Col>
                <Col>
                  <Radio.Group
                    options={[
                      { label: 'Teacher', value: 'teacher' },
                      { label: 'Student', value: 'student' },
                    ]}
                    optionType="button"
                    buttonStyle="solid"
                    size="small"
                  />
                </Col>
              </Row>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <h2>First Name</h2>
                <Form.Item
                  hasFeedback
                  name="firstname"
                  rules={[{ required: true, message: 'Please input first name.' }]}
                >
                  <Input name="firstname" placeholder="first name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <h2>Last Name</h2>
                <Form.Item hasFeedback name="lastname" rules={[{ required: true, message: 'Please input last name.' }]}>
                  <Input name="lastname" placeholder="last name" />
                </Form.Item>
              </Col>
            </Row>
            <h2>Email</h2>
            <Form.Item
              name="email"
              hasFeedback
              rules={[
                { type: 'email', message: 'Please enter a valid E-mail.' },
                { required: true, message: 'Please input your E-mail.' },
              ]}
            >
              <Input placeholder="email" />
            </Form.Item>
            <h2>Password</h2>
            <Form.Item
              name="password"
              hasFeedback
              validateFirst={true}
              rules={[{ required: true, message: 'Please input your password!' }, passwordValidator]}
            >
              <Input.Password placeholder="password" />
            </Form.Item>
            <h2>Confirm Password</h2>
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[{ required: true, message: 'Please confirm your password!' }, confirmValidator]}
            >
              <Input.Password placeholder="confirm password" />
            </Form.Item>
            {signUpErrorMessage !== '' && (
              <Alert className="error-alert" message={signUpErrorMessage} type="error" showIcon />
            )}
            <Form.Item>
              <Button className="sign-up-form-button" size="large" type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <Link to="sign-in">
            <div className="link-signin">Already have an account?</div>
          </Link>
        </div>
      </div>
      <div className="sign-in-layout__right"></div>
    </div>
  );
};

export default SignUpPage;
