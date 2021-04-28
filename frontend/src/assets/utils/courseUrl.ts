const getCourseDashboardUrl = (url: string) => {
  return getCoursePageUrl(url) + '/dashboard';
};

const getCoursePageUrl = (url: string) => {
  const urlArr = url.split('/');
  const destinationArr = urlArr.slice(0, 3);
  return destinationArr.join('/');
};

const getAssiUrl = (url: string) => {
  return getCoursePageUrl(url) + '/assignment';
};

const getAssiCodeUrl = (url: string) => {
  const urlArr = url.split('/');
  const destinationArr = urlArr.slice(0, 5);
  return destinationArr.join('/');
};

export { getCourseDashboardUrl, getAssiUrl, getAssiCodeUrl, getCoursePageUrl };
