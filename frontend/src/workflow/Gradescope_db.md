# GradeScope

## Role

### A guest can:

1. Sign in and sign up
1. Sign up an instructor account via email
1. Sign up a student account via course entry code
1. Sign in an account via registered email and password
1. (Extension) Link to a Google account for fast log in

### A student can:

1. Join a course via entry code
2. View all the courses they have joint
3. Apply a rescore request for a single query in a submission
4. Resubmit a submission (overwrite previous one)
5. Check their submission history within an assignment
6. Download graded copy
7. Receive Email
8. Change profile
9. Log out

### An instructor can:

1. Create a new course
2. Change the details of a course
3. Create a new assignment
4. Change the assignment information
5. Score a submission
6. Check submission history in an assignment for each student
7. Publish scores to student
8. Unpublish scores
9. Change the role in a course where they play an instructor role
10. Reply a rescore request
11. Change profile
12. Log out

### Account

```
JSON:{
  _id: accountEmail,
  accountName: "",
  role: max(account.course.role),
  course:[{
    courseId: course._id,
    role: 1-4,
  }],
  //extension function
  notificationType:1-3
}
```

### Course

```
JSON:{
  _id: courseId,
  courseName: "",
  courseDesc: "",
  instructors:[{

    }],
  students:[{

    }],
  startTerm:"" in ("Spring", "Summer", "Autumn", "Winter"),
  startYear:"",
  assignment:[{
    assignmentId: assignment._id,
  }],
}
```

### Assignment

```
JSON:{
  _id: assignmentId,
  assignmentName:"",
  assignmentDesc: "",
  template:"",
  releaseDate: Date(),
  dueDate: Date() (>realeaseDate),
  delayDue: Date() (>=dueDate),
  question:[{
    questionDesc:"",
    mark: int (1-100),
  }],
  // if cannot find submission for student, status is unsubmitted.
  submission:[{
    submissionId: submission._id (latest),
  }]
}
```

### Submission

```
JSON:{
  _id: submissionId,
  previousSubmission: submissionId,
  submitTime: Time() (< assignment.dueDate),
  submittedBy: [{accountId (student)}],
  markedBy: accountId (non-student),
  // when there is rescore request, reset it as true
  isUngraded: boolean,
  isPushlished: boolean,
  answerType:1-2 (img, pdf),
  answer: [{
    questionNum: int (0-n),
    mark: double (0-assignment.query.mark),
    rescoreRequest:[{
      rescoreRequestId: rescoreRequest._id,
    }]
  }],
}
```

### RescoreRequest

```
JSON:{
  _id: rescoreStatusId,
  requestContent:"",
  requestDate: Date(),
  replyContent:"",
  replyDate: Date() (> requestDate),
  requestStatus: status in {"processed", "pending"},
}
```

## Challenges

- Email reminder or msg queue
- Calendar selector
- PDF generator
