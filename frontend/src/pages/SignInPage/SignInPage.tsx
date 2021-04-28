import React, { useEffect } from 'react';
import './SignInPage.scss';
import logo from '../../assets/img/logo_blue.svg';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { Form, Input, Button } from 'antd';
import { LockOutlined, GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { LoginInfo } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { requestGoogleUserLogin, requestUserLogin } from '../../store/actions/account';
import { State } from '../../types/state';
import Alert from 'antd/es/alert';

const SignInPage: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const { history } = props;
  const user = useSelector((state: State) => state.user);

  const { errorMessage, isAuthenticated } = user;

  useEffect(() => {
    if (isAuthenticated) history.push('/');
  }, [history, user, isAuthenticated]);

  const handleFinish = (values: { email: string; password: string }) => {
    const loginInfo: LoginInfo = {
      accountEmail: values.email,
      accountPwd: values.password,
    };
    dispatch(requestUserLogin(loginInfo));
  };

  const handleGoogleSuccess = async (res: any) => {
    const profile = res?.profileObj;
    const token = res?.tokenId;
    const { email, name } = profile;
    const formatName = name.split(' ').join('|');
    const googleLogin = { token, GoogleLoginInfo: { accountEmail: email, accountName: formatName } };
    dispatch(requestGoogleUserLogin(googleLogin));
  };

  const handleGoogleFailure = (error: any) => {
    return;
  };

  return (
    <div className="sign-in sign-in-layout">
      <div className="sign-in-layout__left">
        <div className="sign-in-left__container">
          <div className="sign-in__logo-container">
            <Link to="/">
              <img className="sign-in__logo" src={logo} alt="logo" />
            </Link>
          </div>
          <Form name="login" onFinish={handleFinish}>
            <h2>Email</h2>
            <Form.Item
              className="form-email"
              name="email"
              rules={[
                { type: 'email', message: 'Please enter a valid E-mail.' },
                { required: true, message: 'Please input your email.' },
              ]}
            >
              <Input size="large" prefix={<MailOutlined />} placeholder="email" />
            </Form.Item>
            <h2>Password</h2>
            <Form.Item
              className="form-password"
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input size="large" prefix={<LockOutlined />} type="password" placeholder="password" />
            </Form.Item>

            {errorMessage !== '' && <Alert className="error-alert" message={errorMessage} type="error" showIcon />}
            <Form.Item className="form-sign-in">
              <Button size="large" type="primary" htmlType="submit" className="sign-in-form-button">
                Sign in
              </Button>
            </Form.Item>
            <Form.Item className="form-forgot">
              <p className="sign-in-form-forgot">Forgot password?</p>
            </Form.Item>
            <GoogleLogin
              clientId="461763116622-gib4kebnqgedlsp6gnmun4nmdjo6s6nr.apps.googleusercontent.com"
              render={(renderProps) => (
                <Form.Item>
                  <Button
                    className="sign-in-form-button ant-btn--theme-gray"
                    icon={<GoogleOutlined />}
                    size="large"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Sign In with Google
                  </Button>
                </Form.Item>
              )}
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy="single_host_origin"
            />

            <Form.Item>
              <Link to="sign-up">
                <Button size="large" className="sign-in-form-button ant-btn--theme-gray">
                  Create an account
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="sign-in-layout__right"></div>
    </div>
  );
};

export default SignInPage;
