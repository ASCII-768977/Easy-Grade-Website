import React from 'react';
import './LandingPage.scss';
import { Row, Col, Space } from 'antd';
import logo from '../../assets/img/logo_white.svg';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import introImg from '../../assets/img/undraw_studying_s3l7 1.svg';
import dashboardImg from '../../assets/img/Screenshot-landing-dashboard.jpg';
import processImg from '../../assets/img/landing-process.jpg';
import leftGirlImg from '../../assets/img/landing-left-girl.svg';
import rightBoyImg from '../../assets/img/landing-right-boy.svg';
import teamworkImg from '../../assets/img/landing-teamwork.jpg';
import joinWave1 from '../../assets/img/landing-wave-1.svg';
import joinWave2 from '../../assets/img/landing-wave-2.svg';
import { CalculatorFilled, CheckCircleFilled, MessageFilled, RightOutlined } from '@ant-design/icons';

const LandingPage: React.FC = () => {
  return (
    <>
      <nav className="landing-nav">
        <div className="container">
          <img className="landing-nav__logo" src={logo} alt="logo" />
          <div className="landing-nav__wrap">
            <Link to="/sign-up">
              <Button className="ant-btn-ghost--theme-white" type="ghost">
                Sign Up
              </Button>
            </Link>
            <Link to="/sign-in">
              <Button className="ant-btn-ghost--theme-white" type="ghost">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      <main className="landing-page">
        <section className="intro">
          <div className="container">
            <Row gutter={48} align="middle">
              <Col className="intro__text" span={13}>
                <h2>Make your grading easy and enjoyable.</h2>
                <p>
                  EasyGrade helps you seamlessly administer and grade all of your assessments, whether online or
                  in-class. Save time grading and get a clear picture of how your students are doing.
                </p>
                <Space size="large">
                  <Link to="/sign-up">
                    <Button type="primary" size="large">
                      Sign up for free
                    </Button>
                  </Link>
                  <Link to="/sign-in">
                    <Button type="primary" size="large">
                      Log in now
                    </Button>
                  </Link>
                </Space>
              </Col>
              <Col className="intro__img" span={11}>
                <img src={introImg} alt="study img" />
              </Col>
            </Row>
          </div>
        </section>
        <section className="dashboard-preview">
          <div className="container">
            <h2>The best online grading system for homework.</h2>
            <Row gutter={48}>
              <Col className="dashboard-preview__img" span={14}>
                <img src={dashboardImg} alt="dashboard img" />
              </Col>
              <Col className="dashboard-preview__text" span={10}>
                <Row>
                  <div className="dashboard-preview__text-wrap">
                    <Col span={24}>
                      <h3>Plan</h3>
                      <p>
                        Make the best use of online platform to organise, shcedule to help the work of both students and
                        teachers to achieve their highest performance.
                      </p>
                    </Col>
                    <Col span={24}>
                      <h3>Track</h3>
                      <p>
                        Easy grade implmented tracking system to let teachers and students have clear view about the
                        stages where they are at, helping to make the best time management.
                      </p>
                    </Col>
                  </div>
                </Row>
              </Col>
            </Row>
          </div>
        </section>
        <section className="process">
          <img src={processImg} alt="process img" />
        </section>
        <section className="features">
          <div className="container">
            <Row>
              <Col className="features__top-text" span={24}>
                <h2>Integrate with the tools you already use</h2>
                <p>
                  Easy Grade is aiming to establish a straightforward platform where both teachers and students can make
                  their work easily without switching between different websites.
                </p>
              </Col>
              <Row className="features__feature-cards" gutter={48}>
                <Col className="feature-card" span={8}>
                  <Row className="feature-card__icon">
                    <CheckCircleFilled />
                  </Row>
                  <h3>Submission System</h3>
                  <p>
                    EasyGrade helps you submit your assignments without any effort. Our due-date reminder system will
                    let you find your progress in time.
                  </p>
                  <a href="###">
                    <RightOutlined />
                    <span>Learn more</span>
                  </a>
                </Col>
                <Col className="feature-card" span={8}>
                  <Row className="feature-card__icon">
                    <CalculatorFilled />
                  </Row>
                  <h3>Online Learning System</h3>
                  <p>
                    EasyGrade is a great partner with any other learning systems, a powerful management tool to help you
                    take control of all your performance records.
                  </p>
                  <a href="###">
                    <RightOutlined />
                    <span>Learn more</span>
                  </a>
                </Col>
                <Col className="feature-card" span={8}>
                  <Row className="feature-card__icon">
                    <MessageFilled />
                  </Row>
                  <h3>Online Chatting</h3>
                  <p>
                    In the future, EasyGrade will add new chatting features in to help our clients maintain a close
                    contact with each other.
                  </p>
                  <a href="###">
                    <RightOutlined />
                    <span>Learn more</span>
                  </a>
                </Col>
              </Row>
            </Row>
          </div>
        </section>
        <section className="girl-boy">
          <img className="left-girl" src={leftGirlImg} alt="girl img" />
          <img className="right-boy" src={rightBoyImg} alt="boy img" />
          <div>
            <h3>Streamline your work with automation</h3>
            <Row justify="center">
              <Col span={18}>
                <p>Easy Fast Efficient</p>
              </Col>
            </Row>
            <Button type="ghost" className="ant-btn-ghost--theme-white" size="large">
              Some thing that you want
            </Button>
          </div>
        </section>
        <section className="teamwork">
          <div className="container">
            <Row gutter={48}>
              <Col span={12} className="teamwork__text">
                <h2>Connect your team's work to your project</h2>
                <p>Powerful Coordinating platform makes teamwork easier.</p>
                <Button size="large">Learn more about how to connect with class</Button>
              </Col>
              <Col span={12}>
                <img src={teamworkImg} alt="teamwork img" />
              </Col>
            </Row>
          </div>
        </section>

        <section className="join">
          <h2>Join With Over 10, 000 Instructors</h2>
          <p>Sign up as an...</p>
          <Space size="middle">
            <Link to="/sign-up">
              <Button className="ant-btn-ghost--theme-white" type="ghost" size="large">
                Teacher
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button className="ant-btn-ghost--theme-white" type="ghost" size="large">
                Student
              </Button>
            </Link>
          </Space>
          <img src={joinWave1} alt="wave svg" />
          <img src={joinWave2} alt="wave svg" />
        </section>
      </main>
      <footer>
        <div>EasyGrade</div>
        <div>Copyright © 2021</div>
      </footer>
    </>
  );
};

export default LandingPage;
