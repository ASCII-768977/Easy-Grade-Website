const initialState = {
  todo: {
    todoList: [],
    pageTodoList: [],
    todoListLength: 0,
    oneTodo: {},
    defaultQueryId: 10,
    defaultTodo: {},
  },
  user: {
    isAuthenticated: false,
    isLoading: false,
    errorMessage: '',
    signUpErrorMessage: '',
    name: '',
    accountEmail: '',
    role: '',
    _id: '',
    accountId: '',
    accountName: '',
    accountPwd: '',
    status: '',
    course: [],
  },
  submission: {
    isEmpty: true,
    currentSubmission: {},
    multiSubmission: [],
    submissionNum: 0,
    submissionStatus: { success: false, error: '' },
  },
  layout: {
    navCollapsed: false,
  },
  roster: {
    courseId: '6035343533da293808334cc5',
    config: {
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 30, 40, 50, 100],
      },
      filters: {},
      sorter: {},
      isLoading: true,
    },
    data: [],
  },
  submissionList: {
    config: {
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 30, 40, 50, 100],
      },
      filters: {},
      sorter: {},
      isLoading: true,
    },
    data: [],
  },
  teacherList: {
    data: [],
  },
  course: {
    courseCode: '',
    annoucements: [],
    material: [],
  },
  courseList: [],
  assSample: {
    totalNum: 300,
    allocatedNumArray: [
      { name: 'Lin', allocatedNum: 2 },
      { name: 'Zhian', allocatedNum: 3 },
      { name: 'Ben', allocatedNum: 4 },
    ],
  },

  assignment: {},
  assignmentList: {},
  assignmentStatistic: [],
  initialAssignmentData: {
    _id: '',
    totalNum: 0,
    assignmentId: '',
    assignmentName: '',
    releaseDate: '',
    dueDate: '',
    submittedNum: 0,
    gradedNum: 0,
    allocatedNum: 0,
  },
};

export default initialState;
