import React, { useEffect } from 'react';
import { Table } from 'antd';
import './RosterTable.scss';
import { State } from '../../types/state';
import { asyncRequestRosterList } from '../../store/sagas/actions/asyncActionCreator';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

const mapStateToProps: any = (state: State) => ({
  config: state.roster.config,
  data: state.roster.data,
  course: state.course,
});

const RosterTable: React.FC<any> = (props) => {
  const dispatch = useDispatch();
  const { config, data } = props;
  const { pagination: paginationInfo } = config;
  const { _id: courseId } = props.course;
  let columns: any = [
    {
      title: 'Name',
      dataIndex: 'accountName',
      sorter: () => {},
      sortDirections: ['descend', 'ascend'],
      render: (text: any) => <Link to={`/course/${courseId}/roster`}>{text.replace('|', ' ')}</Link>,
    },
    {
      title: 'Email',
      dataIndex: 'accountEmail',
      ellipsis: true,
      sorter: () => {},
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Role',
      dataIndex: 'role',
      align: 'center',
      sorter: () => {},
      sortDirections: ['descend', 'ascend'],
    },
  ];
  useEffect(() => {
    if (courseId) {
      dispatch(asyncRequestRosterList(courseId, config));
    }
  }, [courseId]);
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    let pager = { ...paginationInfo };
    if (!sorter.order) {
      sorter.field = 'accountName';
      sorter.order = 'ascend';
    }
    pager = { ...pager, ...pagination };
    let updatedConfig = { ...config, pagination: pager, sorter };
    dispatch(asyncRequestRosterList(courseId, updatedConfig));
  };

  return (
    <div className="roster-table">
      <Table
        columns={columns}
        rowKey={(record) => record.accountEmail}
        dataSource={data}
        pagination={paginationInfo}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default connect(mapStateToProps)(RosterTable);
