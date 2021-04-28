import { Skeleton } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { State } from '../../types/state';
import { asyncRequestCourseList } from '../../store/sagas/actions/asyncActionCreator';
import CourseWrapper from './CourseWrapper';

const mapStateToProps = (state: State) => ({
  courseList: state.courseList,
  role: state.user.role,
});

const SkeletonWindow: React.FC<any> = (props) => {
  const dispatch = useDispatch();
  const { courseList, role } = props;
  const [isloading, setIsloading] = useState(true);
  const handleIsLoading = () => {
    setIsloading(false);
  };

  useEffect(() => {
    dispatch(asyncRequestCourseList());
    handleIsLoading();
  }, [dispatch]);

  return (
    <Skeleton active loading={isloading}>
      <CourseWrapper courseList={courseList} role={role} />
    </Skeleton>
  );
};

export default connect(mapStateToProps)(SkeletonWindow);
