import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import { AllocatingAssDetailsProps } from '../../types';
import './AllocatingAssDetails.scss';
import { InputNumber, notification } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { State } from '../../types/state';
import { getAllocatedStatus } from '../../store/actions/actionCreator';
import { asyncAllocateSubmssion } from '../../store/sagas/actions/asyncActionCreator';

const mapStateToProps = (state: State) => ({
  assSample: state.assSample,
  teacherList: state.teacherList.data,
  assignmentStatistic: state.assignmentStatistic,
  assignmentId: state.assignment._id,
});

const AllocatingAssDetails: React.FC<AllocatingAssDetailsProps> = (props) => {
  let name: Array<any> = [];
  let assignmentInfo: any = {};
  const { handleCancel, assignmentStatistic, teacherList, assignmentId } = props;
  teacherList.forEach((item: any) => {
    name.push(item.accountName);
  });

  assignmentStatistic.forEach((assignment: any) => {
    if (assignmentId === assignment._id.assignmentId) {
      assignmentInfo = assignment;
    }
  });

  const dispatch = useDispatch();
  let unallocatedNum: number = assignmentInfo.submittedNum - assignmentInfo.allocatedNum;
  let allocatedArray: any = {};
  teacherList.forEach((item: any) => {
    allocatedArray[item.accountEmail] = { accountEmail: item.accountEmail, allocatedNum: 0 };
  });
  assignmentInfo.allocatedDetails.forEach((item: any) => {
    allocatedArray[item.teacher] = { accountEmail: item.teacher, allocatedNum: item.allocatedNum };
  });
  const [totUnallocatedNum, setTotalUnallocatedNum] = useState(unallocatedNum);
  const [updateValue, setUpdateValue] = useState(new Array(Object.keys(allocatedArray).length).fill(0));
  const [allocatedValue, setAllocatedValue] = useState({ ...allocatedArray });
  const calcSum: any = (values: Array<any>) => {
    let result = 0;
    values.forEach((value: any) => {
      if (typeof value !== 'undefined') result += +value;
      else result += 0;
    });
    return result;
  };
  useEffect(() => {
    dispatch(getAllocatedStatus());
    setTotalUnallocatedNum(unallocatedNum - calcSum(updateValue));
  }, [dispatch, assignmentInfo, updateValue]);

  const [form]: any = Form.useForm();
  const onReset = () => {
    handleCancel();
    form.resetFields();
    setUpdateValue(new Array(name.length).fill(0));
  };
  const onFinish = (values: any) => {
    let resArray: Array<any> = [];
    Object.keys(values).forEach((index: any, email: any) => {
      resArray.push({ accountEmail: index, allocatedNum: typeof values[index] === 'undefined' ? 0 : values[index] });
    });
    dispatch(asyncAllocateSubmssion(resArray));
    Object.keys(allocatedArray).forEach((item: any, key: any) => {
      allocatedArray[item].allocatedNum += updateValue[key];
    });
    onReset();
    setAllocatedValue(allocatedArray);
    unallocatedNum -= calcSum(updateValue)
    notification.success({
      message: 'Allocate Success!',
    });
  };

  let deboundeTimer: any;
  const handleOnChange = () => {
    if (deboundeTimer) clearTimeout(deboundeTimer);
    deboundeTimer = setTimeout(() => {
      const res = form.getFieldsValue();
      let updateArray = [];
      for (let i in res) {
        typeof res[i] === 'undefined' ? updateArray.push(0) : updateArray.push(res[i]);
      }
      setUpdateValue(updateArray);
    }, 1000);
  };

  const TableItem = (props: any) => {
    const { allocatedArray } = props;
    return (
      <>
        {Object.keys(allocatedArray).map((item: any, key: number) => (
          <tbody key={key} className="table-body">
            <tr className="table-body-item" id="table-body-item">
              <td>{name[key].replace('|', ' ')}</td>
              <td>{allocatedArray[item].allocatedNum}</td>
              <td className="table-body-input">
                <Form.Item name={allocatedArray[item].accountEmail} key={key} rules={[{ type: 'number', min: 0 }]}>
                  <InputNumber min={0} value={key} onChange={handleOnChange} />
                </Form.Item>
              </td>
              <td className="table-body-newAllocated">{allocatedArray[item].allocatedNum + updateValue[key]}</td>
            </tr>
          </tbody>
        ))}
      </>
    );
  };

  return (
    <Form name="nest-messages" onFinish={onFinish} form={form}>
      <div className="allocating-header">
        <p className="allocating-header-title">Unallocated</p>
        <h2>{totUnallocatedNum}</h2>
      </div>
      <div className="allocating-body">
        <table className="table">
          <thead className="table-header">
            <tr className="table-header-title">
              <td>Teacher</td>
              <td>Allocated</td>
              <td>Change</td>
              <td>New Allocated</td>
            </tr>
          </thead>
          <TableItem allocatedArray={allocatedValue} />
        </table>
      </div>
      <div className="button-group button-group-allocate">
        <Form.Item>
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={() => {
              handleCancel();
            }}
          >
            Allocate
          </Button>
          <Button
            className="button-cancel"
            danger
            key="back"
            onClick={() => {
              onReset();
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default connect(mapStateToProps)(AllocatingAssDetails);
