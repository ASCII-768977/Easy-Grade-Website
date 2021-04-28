const getRouteCourseId = (url: string) => {
  const urlArr = url.split('/');
  const courseIndex = urlArr.indexOf('course');
  return urlArr[courseIndex + 1];
};

const getRouteAssiId = (url: string) => {
  const urlArr = url.split('/');
  const courseIndex = urlArr.indexOf('assignment');
  return urlArr[courseIndex + 1];
};

const getRouteSubmissionId = (url: string) => {
  const urlArr = url.split('/');
  const courseIndex = urlArr.indexOf('submission');
  return urlArr[courseIndex + 1];
};
export { getRouteCourseId, getRouteAssiId, getRouteSubmissionId };
