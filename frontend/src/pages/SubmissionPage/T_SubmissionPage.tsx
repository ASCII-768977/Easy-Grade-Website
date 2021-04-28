import React, { useEffect, useState } from 'react';
import './T_SubmissionPage.scss';
import { connect, useDispatch } from 'react-redux';
import { State } from '../../types/state';
import Layout from '../../components/Layout/Layout';
import { getAssiCodeUrl, getAssiUrl, getCourseDashboardUrl } from '../../assets/utils/courseUrl';
import { useRouteMatch } from 'react-router-dom';
import { convertSubmissionTime } from '../../assets/utils/time';
import { getRouteSubmissionId } from '../../assets/utils/routeId';
import { Button, Col, Divider, InputNumber, notification, Row } from 'antd';
import {
  asyncRequest_T_submission,
  asyncUpdateSubmission,
  storeSubmissionStatus,
} from '../../store/actions/submission';
import { CheckCircleOutlined, MessageOutlined, WarningOutlined } from '@ant-design/icons';
import PopUpWindow from '../../components/PopUpWindow/PopUpWindow';
import feedbackSvg from '../../assets/img/undraw_Wall_post_re_y78d.svg';
import TextArea from 'antd/es/input/TextArea';
import { storeCurrentAssignment } from '../../store/actions/actionCreator';

const mapStateToProps = (state: State) => ({
  role: state.user.role,
  courseCode: state.course.courseCode,
  currentSubmission: state.submission.currentSubmission,
  isEmpty: state.submission.isEmpty,
  submissionStatus: state.submission.submissionStatus,
  currentAssignment: state.assignment,
  assignmentList: state.assignmentList,
});

const T_SubmissionPage: React.FC<any> = (props) => {
  const { url } = useRouteMatch();
  const { currentSubmission, isEmpty, courseCode, submissionStatus, currentAssignment, assignmentList } = props;
  const { isGraded, comment, feedback, submitTime, assignment, submittedByName, gradedScore } = currentSubmission;
  const submissionId = getRouteSubmissionId(url);
  const submittedTime = convertSubmissionTime(submitTime);
  const name = typeof submittedByName === 'string' && submittedByName.split('|').join(' ');
  const totalScore = !isEmpty && assignment.totalScore.toFixed(1);
  const score = !isEmpty && gradedScore.toFixed(1);
  const dispatch = useDispatch();
  const [scoreSubmit, setScoreSubmit] = useState(0);
  const [feedbackSubmit, setFeedbackSubmit] = useState('');
  const [feedbackModel, setFeedbackModel] = useState(false);
  const [commentModel, setCommentModel] = useState(false);

  useEffect(() => {
    const assignmentId = url.split('/')[4];
    dispatch(storeCurrentAssignment(assignmentList[assignmentId]));
  }, [assignmentList, dispatch, url]);

  useEffect(() => {
    dispatch(asyncRequest_T_submission(submissionId));
  }, [dispatch]);

  const breadNavs = [
    { title: 'Home', path: '/' },
    { title: courseCode, path: getCourseDashboardUrl(url) },
    { title: 'Assignments', path: getAssiUrl(url) },
    { title: currentAssignment ? currentAssignment.assignmentName : '', path: getAssiCodeUrl(url) },
    { title: 'Submission', path: url },
  ];

  const handleSubmit = async () => {
    if (feedbackSubmit === '') {
      notification.open({
        message: 'Submit error',
        description: `Feedback for the submission is needed.`,
        icon: <WarningOutlined style={{ color: '#e31818' }} />,
        placement: 'bottomRight',
      });
      return;
    }
    dispatch(asyncUpdateSubmission({ submissionId, feedback: feedbackSubmit, gradedScore: scoreSubmit }));
  };

  const resetSubmission = () => {
    dispatch(storeSubmissionStatus({ success: false, error: '' }));
  };
  useEffect(() => {
    if (submissionStatus.success) {
      notification.open({
        message: 'Grade Successfully',
        description: `Your graded the assignment successfully.`,
        icon: <CheckCircleOutlined style={{ color: '#13c2c2' }} />,
        placement: 'bottomRight',
      });
      resetSubmission();
    }
  }, [submissionStatus]);
  return (
    <Layout breadNavs={breadNavs}>
      <Row className="submission-page T_submission-page">
        <Col className="submission-pdf" span={16}>
          {Object.keys(currentSubmission).length > 0 && <iframe title="pdf" src={currentSubmission.pdfUrl} />}
        </Col>

        <Col className="submission-grade S_submission-grade" span={8}>
          <Row justify="space-between" className="submission-info">
            <Col>
              {isGraded && <span className="submission-info__score--graded">{score}</span>}
              {!isGraded && <span className="submission-info__score--ungraded">——</span>}
              <span> / {totalScore} pts</span>
            </Col>
            <Col className="submission-info__grade-status">
              {isGraded ? <p className="color--green">Graded</p> : <p className="color--red">Ungraded</p>}
            </Col>
          </Row>
          <Row justify="space-between">
            <Col>
              <p>{name}</p>
            </Col>
            <Col>
              <p>{submittedTime}</p>
            </Col>
          </Row>
          <Divider />
          <Row align="middle" className="submission-comment-feedback">
            <h3>Comment</h3>
            {comment !== '' && (
              <Button
                type="primary"
                className="ant-btn--theme-gray"
                size="small"
                icon={<MessageOutlined />}
                onClick={() => {
                  setCommentModel(true);
                }}
              />
            )}
          </Row>
          {comment === '' && <p>No comment</p>}{' '}
          {comment !== '' && (
            <p>
              <span className="comment-name">{name}: </span> {comment}
            </p>
          )}
          <Divider />
          <Row align="middle" className="submission-comment-feedback">
            <h3>Feedback</h3>
            {feedback !== '' && (
              <Button
                type="primary"
                className="ant-btn--theme-gray"
                size="small"
                icon={<MessageOutlined />}
                onClick={() => {
                  setFeedbackModel(true);
                }}
              />
            )}
          </Row>
          {feedback === '' ? <p>No feedback</p> : <p>{feedback}</p>}
          <Divider />
          <h3>Grade Area</h3>
          <h4 className="submission-teacher-header">Score:</h4>
          <InputNumber
            min={0}
            max={typeof totalScore === 'string' ? parseInt(totalScore) : 0}
            value={scoreSubmit}
            autoFocus
            onChange={(value: any) => {
              setScoreSubmit(value);
            }}
          />
          <h4 className="submission-teacher-header">Feedback:</h4>
          <TextArea
            rows={5}
            value={feedbackSubmit}
            onChange={(e: any) => {
              setFeedbackSubmit(e.target.value);
            }}
          />
          <Button type="primary" className="submission-modal-button" onClick={handleSubmit}>
            {isGraded ? 'Change grade' : 'Submit grade'}
          </Button>
          <PopUpWindow
            title="Comment"
            modalIcon={feedbackSvg}
            isModalVisible={commentModel}
            setIsModalVisible={setCommentModel}
          >
            <p className="submission-modal-text">{comment}</p>
          </PopUpWindow>
          <PopUpWindow
            title="Feedback"
            modalIcon={feedbackSvg}
            isModalVisible={feedbackModel}
            setIsModalVisible={setFeedbackModel}
          >
            <p className="submission-modal-text">{feedback}</p>
          </PopUpWindow>
        </Col>
      </Row>
    </Layout>
  );
};

export default connect(mapStateToProps)(T_SubmissionPage);
