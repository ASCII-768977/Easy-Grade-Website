import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { asyncRequestSubmissionList } from '../../store/sagas/actions/asyncActionCreator';
import { storeSubmissionTableConfig } from '../../store/actions/actionCreator';
import { State } from '../../types/state';
import './FilterTabs.scss';
import { Tabs, Badge } from 'antd';
const { TabPane } = Tabs;

const mapStateToProps = (state: State) => ({
  assignmentId: state.assignment._id,
  config: state.submissionList.config,
  assignmentStatistic: state.assignmentStatistic,
  teacherList: state.teacherList.data,
});

const FilterTabs: React.FC<any> = (props) => {
  const dispatch = useDispatch();
  const { assignmentId, config, assignmentStatistic, teacherList } = props;
  let assignmentInfo: any = {};
  assignmentStatistic.forEach((assignment: any) => {
    if (assignmentId === assignment._id.assignmentId) {
      assignmentInfo = assignment;
    }
  });
  let key2name = ['All', 'Unallocated'];
  let key2type = [undefined, 'unallocated'];
  let teacheremail2name = {};
  let allocatedArray: any = {};
  if (teacherList.length !== 0) {
    teacherList.forEach((teacher: any) => {
      teacheremail2name[teacher.accountEmail] = teacher.accountName;
      key2type.push(teacher.accountEmail);
      key2name.push(teacheremail2name[teacher.accountEmail]);
    });
    teacherList.forEach((item: any) => {
      let name = teacheremail2name[item.accountEmail];
      allocatedArray[name] = 0;
    });
    assignmentInfo.allocatedDetails.forEach((item: any) => {
      let name = teacheremail2name[item.teacher];
      allocatedArray[name] = item.allocatedNum;
    });
    allocatedArray['All'] = assignmentInfo.submittedNum;
    allocatedArray['Unallocated'] = assignmentInfo.submittedNum - assignmentInfo.allocatedNum;
  }
  const handleFilterChange = (activeKey: any) => {
    let updatedConfig = {
      ...config,
      pagination: { ...config.pagination, current: 1 },
      filters: { ...config.filters, filter: key2type[activeKey] },
    };
    dispatch(storeSubmissionTableConfig(updatedConfig));
    dispatch(asyncRequestSubmissionList(assignmentId));
  };
  return (
    <Tabs onChange={handleFilterChange}>
      {key2name.map((name, key) => (
        <TabPane
          tab={
            <>
              {name.replace('|', ' ')}
              <Badge count={typeof allocatedArray[name] === 'undefined' ? 0 : allocatedArray[name]} showZero />
            </>
          }
          key={key}
        />
      ))}
    </Tabs>
  );
};

export default connect(mapStateToProps)(FilterTabs);
