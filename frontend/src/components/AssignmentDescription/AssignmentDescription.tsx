import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import './AssignmentDescription.scss';
import { connect, useDispatch } from 'react-redux';
import { State } from '../../types/state';
import { Row, Col, Button, Divider, notification } from 'antd';
import moment from 'moment-timezone';
import { asyncUpdateAssignmentDesc } from '../../store/sagas/actions/asyncActionCreator';

const mapStateToProps = (state: State) => ({
  assignment: state.assignment,
});

const AssignmentDescription: React.FC<any> = (props: any) => {
  const { assignment } = props;
  const { totalScore } = assignment;
  const dispatch = useDispatch();
  const [textValue, setTextValue] = useState('');

  const handleTextChange = (value: any) => {
    setTextValue(value);
  };

  const publish = async () => {
    if (textValue !== '') {
      const assignmentInfo = props.assignment;
      console.log(typeof textValue);
      assignmentInfo.assignmentDesc = textValue;
      dispatch(asyncUpdateAssignmentDesc(assignmentInfo));
      setTextValue('');
      notification.success({
        message: 'Publish Success!',
      });
    } else {
      notification.error({ message: 'Please fill in blanks' });
    }
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formatting button
    ],
  };

  return (
    <div className="assignmentdescription-tab">
      <div className="assignment-desc">
        <h2>Assignment Description</h2>
        <Divider />
        <p>
          <span className="assignment-desc__title">Points: </span>
          <span>{typeof totalScore === 'number' && totalScore.toFixed(1)}</span>
        </p>
        <p>
          <span className="assignment-desc__title">Due Date: </span>
          <span>{moment().format('lll')}</span>
        </p>
        <Divider />
        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: assignment.assignmentDesc }}></div>
      </div>

      <Divider />

      <Col className="gutter-row m-col-min-width" span={24}>
        <ReactQuill
          value={textValue}
          onChange={handleTextChange}
          modules={modules}
          placeholder={'Write something...'}
        />
      </Col>

      <div className="button-group">
        <Button type="primary" htmlType="submit" onClick={publish}>
          <p>Publish</p>
        </Button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(AssignmentDescription);
