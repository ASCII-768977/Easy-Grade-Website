import React from 'react';

const ms = 1;
const s = 1000 * ms;
const m = 60 * s;
const h = 60 * m;
const d = 24 * h;
const ts2duration = [d, h, m];
const toDurationDate = (date: number) => {
  let nowDate = Date.now();
  let timeDiff = new Date(date).getTime() - nowDate;
  if (typeof date === 'string') {
    timeDiff = new Date(+date).getTime() - nowDate;
  }
  if (timeDiff <= 0) {
    return -1;
  }
  let cnt = 0;
  let formattedDate = '';
  const duration = ['d', 'h', 'm'];
  ts2duration.forEach((time: any, key: any) => {
    if (cnt < 2) {
      if (Math.floor(timeDiff / time) > 0) {
        formattedDate += Math.floor(timeDiff / time) + duration[key];
        timeDiff = timeDiff % time;
        cnt += 1;
      }
    }
  });
  return formattedDate;
};

const DurationDate: React.FC<any> = (props) => {
  const { dueDate } = props;
  return <p className="duration-date info">{toDurationDate(dueDate)} left</p>;
};

export default DurationDate;
