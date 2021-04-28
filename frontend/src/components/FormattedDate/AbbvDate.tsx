import React from 'react';

const toFormattedDate = (date: any) => {
  let dateString = new Date(date).toDateString();
  if (typeof date === 'string') {
    dateString = new Date(+date).toDateString();
  }
  let formattedDate = dateString.slice(-2);
  formattedDate += '/' + dateString.slice(4, 10);
  return formattedDate;
};

const AbbvDate: React.FC<any> = (props) => {
  const { date } = props;
  return <p className="abbv-date">{toFormattedDate(date)}</p>;
};

export default AbbvDate;
