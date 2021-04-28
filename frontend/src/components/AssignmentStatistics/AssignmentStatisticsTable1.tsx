import { Table } from 'antd';

const columns = [
  {
    title: 'MEAN',
    dataIndex: 'mean',
  },
  {
    title: 'STD DEV',
    dataIndex: 'stddev',
  },
  {
    title: 'RANGE',
    dataIndex: 'range',
  },
  {
    title: 'MINIMUM',
    dataIndex: 'minimum',
  },
  {
    title: 'MAXIMUM',
    dataIndex: 'maximum',
  },
  {
    title: 'TOTAL RESPONSE',
    dataIndex: 'totalresponse',
  },
];

interface DataType {
  mean: number;
  stddev: number;
  range: number;
  minimum: number;
  maximum: number;
  totalresponse: number;
}

const data: DataType[] = [
  {
    mean: 48.8,
    stddev: 15.0,
    range: 47.9,
    minimum: 29.9,
    maximum: 67.3,
    totalresponse: 28.0,
  },
];

const AssignmentStatisticsTable1 = () => {
  return (
    <div>
      <Table rowKey={(record) => record.mean} style={{ height: '140px' }} columns={columns} dataSource={data} />
    </div>
  );
};

export default AssignmentStatisticsTable1;
