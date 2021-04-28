import baseUrl from '../config/config';

export const apiGetRoster = (courseId: string, config: any) => {
  const { pagination, filters, sorter } = config;
  let url = `${baseUrl}/course/${courseId}/accountList/page/${pagination.current}?`;
  if (pagination.pageSize) {
    url += `pageSize=${pagination.pageSize}&`;
  }
  if (sorter.field) {
    url += `orderBy=${sorter.field}&`;
  }
  if (sorter.order) {
    url += `order=${sorter.order.slice(0, 4)}&`;
  }
  if (filters.role) {
    url += `filter=${filters.role}&`;
  }
  if (filters.keywords) {
    url += `keywords=${filters.keywords}&`;
  }
  return url;
};
