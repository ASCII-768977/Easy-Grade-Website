import React from 'react';
import CSS from 'csstype';
import { Link, useRouteMatch } from 'react-router-dom';
import { getCoursePageUrl } from '../../assets/utils/courseUrl';
import AbbvDate from '../FormattedDate/AbbvDate';

const OngoingAssignmentItem: React.FC<any> = (props: any) => {
  const { url } = useRouteMatch();
  const { _id: assignmentId, assignmentName, releaseDate, dueDate, width } = props.assignmentInfo;
  const { index } = props;
  const progressBarFilterStyle: CSS.Properties = {
    width: `${width}%`,
  };
  return (
    <li className="s-ongoing-assignment-item">
      <Link
        to={`${getCoursePageUrl(url)}/assignment/${assignmentId}`}
        className="s-ongoing-assignment-item__name txt-ellipsis"
      >
        {`A${index + 1}: ${assignmentName}`}
      </Link>
      <div className="s-ongoing-assignment-item__progress-bar">
        <div className="s-ongoing-assignment-item__progress-bar-filter" style={progressBarFilterStyle} />
      </div>
      <div className="s-ongoing-assignment-item__date">
        <AbbvDate date={releaseDate} />
        <AbbvDate date={dueDate} />
      </div>
    </li>
  );
};

export default OngoingAssignmentItem;
