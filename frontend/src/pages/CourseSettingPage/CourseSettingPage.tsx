import React from 'react';
import './CourseSettingPage.scss';
import { connect, useDispatch } from 'react-redux';
import { State } from '../../types/state';
import Layout from '../../components/Layout/Layout';
import { Form, Input, Button, Radio, Select, notification } from 'antd';
import { useRouteMatch } from 'react-router-dom';
import { getCourseDashboardUrl } from '../../assets/utils/courseUrl';
import { asyncUpdateCourseDetails } from '../../store/sagas/actions/asyncActionCreator';

const mapStateToProps = (state: State) => ({
  courseCode: state.course.courseCode,
  courseName: state.course.courseName,
  startYear: state.course.startYear,
  startTerm: state.course.startTerm,
  courseDesc: state.course.courseDesc,
});

const CourseSettingPage: React.FC<any> = (props) => {
  const { courseCode, courseName, startYear, startTerm, courseDesc } = props;
  const { url } = useRouteMatch();

  const dispatch = useDispatch();
  const breadNavs = [
    { title: 'Home', path: '/' },
    { title: courseCode, path: getCourseDashboardUrl(url) },
    { title: 'Course Setting', path: url },
  ];

  const handleFinish = (values: any) => {
    const courseIdFromUrl = url.split('/')[2];

    dispatch(asyncUpdateCourseDetails(values.course, courseIdFromUrl));

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

  const formItemLayout = {
    wrapperCol: {
      span: 12,
    },
  };

  const inputStyle = {
    height: '32px',
  };

  return (
    <Layout breadNavs={breadNavs}>
      <div className="coursesetting-page">
        <h2>Edit Course</h2>
        <Form
          form={form}
          name="editcourse"
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
          {...formItemLayout}
          initialValues={{}}
        >
          <h3>Course Name</h3>
          <Form.Item name={['course', 'courseName']} initialValue={courseName}>
            <Input placeholder="eg:Web Information System" />
          </Form.Item>

          <h3>Course Term</h3>
          <Form.Item name={['course', 'startYear']} label="Year:" initialValue={startYear}>
            <Select style={{ width: '100px' }}>
              <Select.Option value="2020">2020</Select.Option>
              <Select.Option value="2021">2021</Select.Option>
              <Select.Option value="2022">2022</Select.Option>
              <Select.Option value="2023">2023</Select.Option>
              <Select.Option value="2024">2024</Select.Option>
              <Select.Option value="2025">2025</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name={['course', 'startTerm']} label="Term:" initialValue={startTerm}>
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="Spring">Spring</Radio.Button>
              <Radio.Button value="Summer">Summer</Radio.Button>
              <Radio.Button value="Autumn">Autumn</Radio.Button>
              <Radio.Button value="Winter">Winter</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <h3>Course Description</h3>
          <div className="input-textarea">
            <Form.Item name={['course', 'courseDesc']} initialValue={courseDesc}>
              <Input.TextArea style={inputStyle} placeholder="eg:University of Darling Harbour" />
            </Form.Item>
          </div>

          <div className="button-group">
            <div className="button-single">
              <Form.Item className="form-update">
                <Button type="primary" htmlType="submit" className="update-form-button">
                  Update
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default connect(mapStateToProps)(CourseSettingPage);
