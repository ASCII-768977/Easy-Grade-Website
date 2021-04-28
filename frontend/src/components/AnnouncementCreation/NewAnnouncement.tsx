import React, { useState } from 'react';
import { Button, notification, Input } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../Announcement/AnnouncementContainer.scss';
import '../../assets/scss/button.scss';
import '../../assets/scss/variables.scss';

const NewAnnouncement: React.FC<any> = (props) => {
  const { handleCancel } = props;

  const [textValue, setTextValue] = useState('');
  const [titleValue, setTitleValue] = useState('');

  const handleTextChange = (value: any) => {
    setTextValue(value);
  };

  const handleTitleChange = (event: any) => {
    setTitleValue(event.target.value);
  };

  const publish = () => {
    notification.open({
      message: 'Publish Success!',
      description: <div dangerouslySetInnerHTML={{ __html: titleValue + textValue }} />,
    });
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

      <div className="position-right-side">
        <Button size="small" type="text" style={{ color: '#096DD9' }} htmlType="button" onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button className="ant-btn-primary" htmlType="submit" onClick={publish}>
          <p> Publish</p>
        </Button>
      </div>
    </div>
  );
};

export default NewAnnouncement;
