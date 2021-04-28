import React, { useEffect } from 'react';
import { Table } from 'antd';
import './AssignmentAllocateTable.scss';
import { State } from '../../types/state';
import { asyncRequestSubmissionList, asyncRequestTeacherList } from '../../store/sagas/actions/asyncActionCreator';
import { storeSubmissionTableConfig } from '../../store/actions/actionCreator';
import { Link, useRouteMatch } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

const mapStateToProps: any = (state: State) => ({
  config: state.submissionList.config,
  data: state.submissionList.data,
  assignment: state.assignment,
  totalScore: state.assignment.totalScore,
  courseId: state.course._id,
});

const AssignmentAllocateTable: React.FC<any> = (props) => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const { config, data, totalScore, courseId } = props;
  const { pagination: paginationInfo } = config;
  const { _id: assignmentId } = props.assignment;
  let columns: any = [
    {
      title: 'Name',
      dataIndex: 'submittedByName',
      sorter: () => {},
      sortDirections: ['descend', 'ascend'],
      render: (text: any, record: any) => <Link to={`${url}/submission/${record._id}`}>{text.replace('|', ' ')}</Link>,
    },
    {
      title: 'Email',
      dataIndex: 'submittedByEmail',
      ellipsis: true,
      sorter: () => {},
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'SubmitTime',
      dataIndex: 'submitTime',
      ellipsis: true,
      sorter: () => {},
      sortDirections: ['descend', 'ascend'],
      render: (date: number) => new Date(date).toLocaleString(),
    },
    {
      title: 'Score',
      dataIndex: 'gradedScore',
      ellipsis: true,
      sorter: () => {},
      render: (text: any) => `${text !== undefined ? text.toFixed(1) : (0.0).toFixed(1)}/${totalScore.toFixed(1)}`,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Rater',
      dataIndex: 'assignedTo',
      align: 'center',
      render: (text: any) => `${text === '' ? '-' : text}`,
      ellipsis: true,
    },
  ];
  useEffect(() => {
    if (assignmentId) {
      dispatch(asyncRequestSubmissionList(assignmentId, config));
      const updatedConfig = {
        filters: { role: 'teacher' },
        pagination: {
          total: 0,
          current: 1,
          pageSize: 100,
        },
        sorter: {},
      };
      dispatch(asyncRequestTeacherList(courseId, updatedConfig));
    }
  }, [assignmentId]);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    let pager = { ...paginationInfo };
    if (!sorter.order) {
      sorter.field = 'submittedByName';
      sorter.order = 'ascend';
    }
    pager = { ...pager, ...pagination };
    sorter.orderBy = sorter.field;
    sorter.order = sorter.order.slice(0, 4);
    let updatedConfig = { ...config, pagination: pager, sorter };
    dispatch(storeSubmissionTableConfig(updatedConfig));
    dispatch(asyncRequestSubmissionList(assignmentId));
  };

  return (
    <div className="assignmentallocate-table">
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={data}
        pagination={paginationInfo}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default connect(mapStateToProps)(AssignmentAllocateTable);
