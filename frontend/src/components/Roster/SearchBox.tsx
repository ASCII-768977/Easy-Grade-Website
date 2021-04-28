import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Input, Space } from 'antd';

import { State } from '../../types/state';

import { asyncRequestRosterList } from '../../store/sagas/actions/asyncActionCreator';

const { Search } = Input;

const mapStateToProps = (state: State) => ({
  courseId: state.course._id,
  config: state.roster.config,
});

const SearchBox: React.FC<any> = (props) => {
  const { courseId, config } = props;
  const { pagination, filters } = config;
  const dispatch = useDispatch();
  const onSearch = async (value: any) => {
    let updatedConfig = {
      ...config,
      pagination: { ...pagination, current: 1 },
      filters: { ...filters, keywords: value.trim().replace(' ', '\\|') },
    };
    dispatch(asyncRequestRosterList(courseId, updatedConfig));
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
