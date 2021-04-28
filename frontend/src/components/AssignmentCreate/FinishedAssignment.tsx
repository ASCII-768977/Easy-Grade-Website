import React, { useState } from 'react';
import './BaseCreateAssignment.scss';
import CreateAssignmentHeader from './CreateAssignmentHeader';
import CreateAssignmentBodyFinished from './CreateAssignmentBodyFinished';
const FinishedAssignment: React.FC = () => {
  const [isFinished] = useState(true);
  return (
    <div className={'base-assignment'}>
      <CreateAssignmentHeader isFinished={isFinished} />
      <CreateAssignmentBodyFinished />
    </div>
  );
};

export default FinishedAssignment;
