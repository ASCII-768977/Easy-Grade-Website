import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { asyncRequestRosterList } from '../../store/sagas/actions/asyncActionCreator';
import { State } from '../../types/state';
import './FilterTabs.scss';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const mapStateToProps = (state: State) => ({
  courseId: state.course._id,
  config: state.roster.config,
});

const key2name = ['All', 'Teacher', 'Student'];
const key2type = [undefined, 'teacher', 'student'];

const FilterTabs: React.FC<any> = (props) => {
  const dispatch = useDispatch();
  const { courseId, config } = props;
  const handleFilterChange = (activeKey: any) => {
    let updatedConfig = {
      ...config,
      pagination: { ...config.pagination, current: 1 },
      filters: { ...config.filters, role: key2type[activeKey] },
    };
    dispatch(asyncRequestRosterList(courseId, updatedConfig));
  };
  return (
    <Tabs onChange={handleFilterChange}>
      {key2name.map((name, key) => (
        <TabPane tab={name} key={key} />
      ))}
    </Tabs>
  );
};

export default connect(mapStateToProps)(FilterTabs);
