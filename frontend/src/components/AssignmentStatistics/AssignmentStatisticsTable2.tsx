import React from 'react';
import { Column } from '@ant-design/charts';

const AssignmentStatisticsTable2: React.FC<any> = () => {
  const data: Array<any> = [
    {
      studentscore: '0-9.99',
      studentnumber: 4,
    },
    {
      studentscore: '10-19.99',
      studentnumber: 5,
    },
    {
      studentscore: '20-29.99',
      studentnumber: 4,
    },
    {
      studentscore: '30-39.99',
      studentnumber: 6,
    },
    {
      studentscore: '40-49.99',
      studentnumber: 5,
    },
    {
      studentscore: '50-59.99',
      studentnumber: 4,
    },
    {
      studentscore: '60-69.99',
      studentnumber: 3,
    },
    {
      studentscore: '70-79.99',
      studentnumber: 4,
    },
    {
      studentscore: '80-89.99',
      studentnumber: 3,
    },
    {
      studentscore: '90-99.99',
      studentnumber: 2,
    },
    {
      studentscore: '100',
      studentnumber: 2,
    },
  ];
  const config: any = {
    data: data,
    xField: 'studentscore',
    yField: 'studentnumber',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      studentscore: { alias: 'studentscore' },
      studentnumber: { alias: 'studentnumber' },
    },
  };
  return <Column rowKey={(record: any) => record.studentnumber} style={{ height: '300px' }} {...config} />;
};

export default AssignmentStatisticsTable2;
