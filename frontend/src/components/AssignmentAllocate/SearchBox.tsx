import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Input, Space } from 'antd';

import { State } from '../../types/state';

import { asyncRequestSubmissionList } from '../../store/sagas/actions/asyncActionCreator';
import { storeSubmissionTableConfig } from '../../store/actions/actionCreator';
import './SearchBox.scss';
const { Search } = Input;

const mapStateToProps = (state: State) => ({
  assignmentId: state.assignment._id,
  config: state.submissionList.config,
});

const SearchBox: React.FC<any> = (props) => {
  const { assignmentId, config } = props;
  const { pagination, filters } = config;
  const dispatch = useDispatch();
  const onSearch = async (value: any) => {
    let updatedConfig = {
      ...config,
      pagination: { ...pagination, current: 1 },
      filters: { ...filters, keywords: value.trim().replace(' ', '\\|') },
    };
    dispatch(storeSubmissionTableConfig(updatedConfig));
    dispatch(asyncRequestSubmissionList(assignmentId));
  };
  return (
    <div className="search">
      <Space direction="vertical">
        <Search placeholder="input search text" onSearch={onSearch} enterButton />
      </Space>
    </div>
  );
};

export default connect(mapStateToProps)(SearchBox);
