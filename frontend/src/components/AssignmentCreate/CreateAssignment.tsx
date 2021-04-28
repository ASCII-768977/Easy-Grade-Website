import React, { useState } from 'react';
import CreateAssignmentHeader from './CreateAssignmentHeader';
import CreateAssignmentBody from './CreateAssignmentBody';
import './BaseCreateAssignment.scss';
const CreateAssignment: React.FC = () => {
  const [isFinished] = useState(false);
  return (
    <div className={'base-assignment'}>
      <CreateAssignmentHeader isFinished={isFinished} />
      <CreateAssignmentBody isFinished={isFinished} />
    </div>
  );
};

export default CreateAssignment;
