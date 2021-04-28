import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Input, Button, notification } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { State } from '../../types/state';
import { useRouteMatch } from 'react-router-dom';
import { asyncUpdateCourseDetails } from '../../store/sagas/actions/asyncActionCreator';
import 'react-quill/dist/quill.snow.css';
import './AnnouncementContainer.scss';

const mapStateToProps = (state: State) => ({
  course: state.course,
});
const AnnouncementDetails: React.FC<any> = (props) => {
  const { url } = useRouteMatch();
  const courseIdFromUrl = url.split('/')[2];
  const { handleCancel } = props;
  const dispatch = useDispatch();
  const [textValue, setTextValue] = useState('');
  const [titleValue, setTitleValue] = useState('');

  const handleTextChange = (value: any) => {
    setTextValue(value);
  };

  const handleTitleChange = (event: any) => {
    setTitleValue(event.target.value);
  };

  const publish = async () => {
    if (titleValue !== '' && textValue !== '') {
      const courseInfo = props.course;
      courseInfo.annoucements.push({
        title: titleValue,
        content: textValue,
        createdDate: Date.now(),
      });
      dispatch(asyncUpdateCourseDetails(courseInfo, courseIdFromUrl));
      setTextValue('');
      setTitleValue('');
      notification.success({
        message: 'Publish Success!',
      });
      handleCancel();
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
    <div>
      <h3 className="title-settings">Title</h3>
      <Input
        className="text-area-settings"
        value={titleValue}
        size="middle"
        placeholder="subject for this announcement"
        onChange={handleTitleChange}
      />
      <h3 className="title-settings">Announcement</h3>
      <ReactQuill value={textValue} onChange={handleTextChange} modules={modules} placeholder={'Write something...'} />

      <div className="button-group">
        <div className="button-single">
          <Button type="primary" htmlType="submit" onClick={publish}>
            <p>Publish</p>
          </Button>
        </div>

        <div className="button-single">
          <Button type="default" htmlType="button" onClick={() => handleCancel()}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(AnnouncementDetails);
