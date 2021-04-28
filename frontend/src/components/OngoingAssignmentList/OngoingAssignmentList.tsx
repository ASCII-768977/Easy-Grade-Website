import React, { useState, useEffect } from 'react';
import OngoingAssignmentItem from './OngoingAssignmentItem';
import './OngoingAssignmentList.scss';
import EmptyIcon from '../../assets/img/s_ongoing_assignments_empty.svg';
import { State } from '../../types/state';
import { connect } from 'react-redux';

const mapStateToProps = (state: State) => ({
  assignmentList: state.assignmentList,
});

const OngoingAssignmentList: React.FC<any> = (props: any) => {
  const { assignmentList } = props;
  const [ongoingAssignmentList, setOngoingAssignmentList] = useState([]);

  const getData: any = () => {
    let currentDate = Date.now();
    let result: Array<any> = [];
    Object.keys(assignmentList).forEach((item: any, key: number) => {
      let releaseDate = new Date(+assignmentList[item].releaseDate).getTime();
      let dueDate = new Date(+assignmentList[item].dueDate).getTime();
      let width = ((currentDate - releaseDate) / (dueDate - releaseDate)) * 100;
      if (width >= 0 && width <= 100) {
        result.push({ ...assignmentList[item], width });
      }
    });
    return result;
  };
  useEffect(() => {
    setOngoingAssignmentList(getData());
  }, [assignmentList]);

  return (
    <div className="s-ongoing-assignment">
      <h3 className="s-ongoing-assignment__title">Ongoing Assignments</h3>
      {ongoingAssignmentList.length !== 0 && (
        <ul className="s-ongoing-assignment__list">
          {ongoingAssignmentList.map((item: any, key: Number) => {
            return <OngoingAssignmentItem index={key} key={key} assignmentInfo={item} />;
          })}
        </ul>
      )}
      {ongoingAssignmentList.length === 0 && (
        <div className="s-ongoing-assignment__list--empty">
          <img src={EmptyIcon} alt="There is no assignment now" />
          <p>There is no assignment now</p>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(OngoingAssignmentList);
