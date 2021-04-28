import React from 'react';
import './NotFoundPage.scss';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h2>404 Not Found</h2>
      <Button>
        <Link to="/">Go home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
