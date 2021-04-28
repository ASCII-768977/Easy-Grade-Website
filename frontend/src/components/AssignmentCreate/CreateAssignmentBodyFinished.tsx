import React from 'react';
import './CreateAssignmentBody.scss';
import { Link, useRouteMatch } from 'react-router-dom';
import { Progress } from 'antd';
import { State } from '../../types/state';
import { connect } from 'react-redux';
import AbbvDate from '../FormattedDate/AbbvDate';

const mapStateToProps = (state: State) => ({
  assignmentList: state.assignmentList,
  assignmentStatistic: state.assignmentStatistic,
});

const CreateAssignmentBodyFinished: React.FC<any> = (props) => {
  const { url } = useRouteMatch();

  const { assignmentList, assignmentStatistic } = props;
  let id2idx = {};
  assignmentStatistic.forEach((item: any, key: any) => {
    id2idx[item._id.assignmentId] = key;
  });
  const timePercentage: Array<any> = Object.keys(assignmentList).map((item: any, key) => {
    const releaseDate = new Date(assignmentList[item].releaseDate * 1000);
    const dueDate = new Date(assignmentList[item].dueDate * 1000);
    const now = new Date();
    const totalTime = dueDate.getTime() - releaseDate.getTime();
    const pastTime = now.getTime() * 1000 - releaseDate.getTime();
    return Math.floor((pastTime / totalTime) * 100);
  });

  const TableItem = Object.keys(assignmentList).map((item: any, key) => {
    if (timePercentage[key] > 100) {
      return (
        <tbody key={key} className={'assignment-body__content'}>
          <tr>
            <td>
              <Link to={`${url}/${assignmentList[item]._id}`}>{assignmentList[item].assignmentName}</Link>
            </td>
            <td className="progress">
              <div className={'progress__bar'}>
                <Progress percent={100} strokeColor="#096DD9" showInfo={false} />
              </div>
              <div className={'progress__date'}>
                <AbbvDate date={+assignmentList[item].releaseDate} />
                <AbbvDate date={+assignmentList[item].dueDate} />
              </div>
            </td>
            <td className={'assignment-submission'}>{assignmentStatistic[id2idx[item]].submittedNum}</td>
            <td className={'assignment-score'}>{assignmentList[item].totalScore}</td>
          </tr>
        </tbody>
      );
    } else {
      return;
    }
  });

  return (
    <div>
      <table className={'assignment--body'}>
        <thead className={'assignment--body__header'}>
          <tr>
            <td>Assignment Name</td>
            <td>
              <span>Released Date</span>
              <span>Due Date</span>
            </td>
            <td>Submissions</td>
            <td>Score</td>
          </tr>
        </thead>
        {TableItem}
      </table>
    </div>
  );
};

export default connect(mapStateToProps)(CreateAssignmentBodyFinished);
