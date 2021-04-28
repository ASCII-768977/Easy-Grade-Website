import React, { useEffect, useState } from 'react';
import './S_SubmissionPage.scss';
import { connect, useDispatch } from 'react-redux';
import { State } from '../../types/state';
import Layout from '../../components/Layout/Layout';
import { getAssiCodeUrl, getAssiUrl, getCourseDashboardUrl } from '../../assets/utils/courseUrl';
import { useRouteMatch } from 'react-router-dom';
import { Button, Col, Divider, notification, Row } from 'antd';
import { convertSubmissionTime } from '../../assets/utils/time';
import { CheckCircleOutlined, DownloadOutlined, MessageOutlined, WarningOutlined } from '@ant-design/icons';
import axios from 'axios';
import {
  asyncCreate_S_submission,
  storeCurrentSubmission,
  storeSubMissionNum,
  storeSubmissionStatus,
} from '../../store/actions/submission';
import PopUpWindow from '../../components/PopUpWindow/PopUpWindow';
import feedbackSvg from '../../assets/img/undraw_Wall_post_re_y78d.svg';
import Upload from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { getRouteAssiId } from '../../assets/utils/routeId';
import emptyImg from '../../assets/img/add_createNewCourse_icon.svg';

const mapStateToProps = (state: State) => ({
  role: state.user.role,
  courseCode: state.course.courseCode,
  currentAssignment: state.assignment,
  currentSubmission: state.submission.currentSubmission,
  multiSubmission: state.submission.multiSubmission,
  submissionNum: state.submission.submissionNum,
  isEmpty: state.submission.isEmpty,
  submissionStatus: state.submission.submissionStatus,
});

const S_SubmissionPage: React.FC<any> = (props) => {
  const { url } = useRouteMatch();

  const dispatch = useDispatch();
  const {
    courseCode,
    currentSubmission,
    multiSubmission,
    isEmpty,
    submissionNum,
    currentAssignment,
    submissionStatus,
  } = props;
  const { isGraded, comment, feedback, submitTime, assignment, submittedByName, gradedScore } = currentSubmission;
  const submittedTime = convertSubmissionTime(submitTime);
  const name = typeof submittedByName === 'string' && submittedByName.split('|').join(' ');
  const allSubmissionNum = multiSubmission.length;
  const totalScore = !isEmpty && assignment.totalScore.toFixed(1);
  const score = !isEmpty && gradedScore.toFixed(1);
  const assignmentId = getRouteAssiId(url);
  const [pdfFile, setPdfFile] = useState(undefined);
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [feedbackModel, setFeedbackModel] = useState(false);
  const [commentModel, setCommentModel] = useState(false);
  const [commentSubmit, setCommentSubmit] = useState('');

  const breadNavs = [
    { title: 'Home', path: '/' },
    { title: courseCode, path: getCourseDashboardUrl(url) },
    { title: 'Assignments', path: getAssiUrl(url) },
    { title: currentAssignment.assignmentName, path: getAssiCodeUrl(url) },
    { title: 'Submission', path: url },
  ];

  const handleSwitchSubmission = (submission: any, submissionNum: number) => {
    dispatch(storeCurrentSubmission(submission));
    dispatch(storeSubMissionNum(submissionNum));
  };

  const openNotification = (fileName: string) => {
    notification.open({
      message: 'File type error',
      description: `${fileName} is not a pdf file.`,
      icon: <WarningOutlined style={{ color: '#e31818' }} />,
      placement: 'bottomRight',
    });
  };

  const uploadProps = {
    beforeUpload: (file: any) => {
      if (file.type !== 'application/pdf') {
        openNotification(`${file.name}`);
        return false;
      }
      setPdfFile(file);
      // @ts-ignore
      setFileList([file]);
      return false;
    },
    maxCount: 1,
    fileList: fileList,
    onRemove: () => {
      setFileList([]);
      setPdfFile(undefined);
    },
  };

  const handleSubmit = async () => {
    if (!pdfFile) {
      notification.open({
        message: 'No pdf error',
        description: `You should submit a pdf.`,
        icon: <WarningOutlined style={{ color: '#e31818' }} />,
        placement: 'bottomRight',
      });
    }
    const submissionFormData = {
      assignmentId,
      submittedByName,
      pdfFile,
      commentSubmit,
    };
    dispatch(asyncCreate_S_submission(submissionFormData));
  };

  const resetSubmission = () => {
    setPdfFile(undefined);
    setIsModalVisible(false);
    setFileList([]);
    setCommentSubmit('');
    dispatch(storeSubmissionStatus({ success: false, error: '' }));
  };

  useEffect(() => {
    if (submissionStatus.success) {
      notification.open({
        message: 'Upload Successfully',
        description: `Your submitted the assignment successfully.`,
        icon: <CheckCircleOutlined style={{ color: '#13c2c2' }} />,
        placement: 'bottomRight',
      });
      resetSubmission();
    }
  }, [submissionStatus]);

  return (
    <Layout breadNavs={breadNavs}>
      {isEmpty && (
        <div className="submission-page submission-empty">
          <img src={emptyImg} alt="emptyImg" />
          <p className="submission-empty-hint">You don't have a submission right now.</p>

          <Button
            type="primary"
            className="new-submission-btn"
            size="large"
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            New Submission
          </Button>
          <PopUpWindow
            title="Start a new submission"
            modalIcon={feedbackSvg}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            customOncancel={resetSubmission}
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload PDF</Button>
            </Upload>
            <h4 className="submission-modal-text submission-modal-comment-text">Comment (optional):</h4>
            <TextArea
              rows={5}
              value={commentSubmit}
              onChange={(e: any) => {
                setCommentSubmit(e.target.value);
              }}
            />
            <Button type="primary" className="submission-modal-button" onClick={handleSubmit}>
              Submit
            </Button>
            <Button
              className="submission-modal-button submission-modal-cancel-button"
              onClick={() => {
                resetSubmission();
              }}
            >
              Cancel
            </Button>
          </PopUpWindow>
        </div>
      )}
      {!isEmpty && (
        <Row className="submission-page">
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
              <Col className="submission-info__submission-num">
                <p>Submission {submissionNum === 0 ? '--' : submissionNum}</p>
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
            <h3>All Submissions</h3>
            {multiSubmission.map((item: any, index: number) => (
              <Row key={item.pdfName} justify="space-between">
                <Col>
                  <p
                    className="submission-switch"
                    onClick={() => {
                      handleSwitchSubmission(item, allSubmissionNum - index);
                    }}
                  >
                    Submission {allSubmissionNum - index}
                  </p>
                  <p>{convertSubmissionTime(item.submitTime)}</p>
                </Col>
                <Col className="submission-button-container">
                  <Button
                    type="primary"
                    className="ant-btn--theme-gray"
                    icon={<DownloadOutlined />}
                    onClick={() => {
                      handleDownload(item.pdfUrl, item.pdfName);
                    }}
                  />
                </Col>
                {index !== allSubmissionNum - 1 && <Divider className="submission-switch-divider" />}
              </Row>
            ))}
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
            <Button
              type="primary"
              className="new-submission-btn"
              onClick={() => {
                setIsModalVisible(true);
              }}
            >
              New Submission
            </Button>
            <PopUpWindow
              title="Start a new submission"
              modalIcon={feedbackSvg}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              customOncancel={resetSubmission}
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Upload PDF</Button>
              </Upload>
              <h4 className="submission-modal-text submission-modal-comment-text">Comment (optional):</h4>
              <TextArea
                rows={5}
                value={commentSubmit}
                onChange={(e: any) => {
                  setCommentSubmit(e.target.value);
                }}
              />
              <Button type="primary" className="submission-modal-button" onClick={handleSubmit}>
                Submit
              </Button>
              <Button
                className="submission-modal-button submission-modal-cancel-button"
                onClick={() => {
                  resetSubmission();
                }}
              >
                Cancel
              </Button>
            </PopUpWindow>
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
      )}
    </Layout>
  );
};

export default connect(mapStateToProps)(S_SubmissionPage);

const handleDownload = async (fileUrl: string, fileName: string) => {
  const res = await axios.get(fileUrl, { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
};
