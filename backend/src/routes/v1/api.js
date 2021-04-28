const config = require('../../config/app');
const accountController = require(`../../controllers/${config.api.prefix}/account`);
const courseController = require(`../../controllers/${config.api.prefix}/course`);
const assignmentController = require(`../../controllers/${config.api.prefix}/assignment`);
const authenticationController = require(`../../controllers/${config.api.prefix}/authentication`);
const submissionController = require(`../../controllers/${config.api.prefix}/submission`);
const middleWares = require('../../middlewares');

const koaRouter = require('koa-router');
const assignment = require('../../model/assignment');
const router = new koaRouter();
const { teacherAuth, studentAuth, auth } = middleWares.authMiddleware;

//——————————————————————account CRUD——————————————————
router.post('/account/login', authenticationController.login);
router.post('/account/googlelogin', authenticationController.googlelogin);
router.post('/account', accountController.signup);
router.get('/verify/:id', authenticationController.verify);
router.put('/account/:id', auth, accountController.update);
router.put('/enroll', auth, accountController.enroll);
router.get('/course/:id/accountList/page/:pageNum', auth, accountController.getAccountsByCourse);

//——————————————————————course CRUD——————————————————
router.get('/course/:id', auth, courseController.show);
router.get('/courseList', auth, courseController.getCoursesByAccount);
router.post('/course', teacherAuth, auth, courseController.store);
router.put('/course/:id', teacherAuth, auth, courseController.update);

//——————————————————————assignment CRUD——————————————————
router.get('/assignment/:id', assignmentController.show);
router.get('/course/:id/assignmentList', auth, assignmentController.index);
router.post('/assignment', assignmentController.store);
router.put('/assignment/:id', assignmentController.update);

//——————————————————————submission CRUD——————————————————
router.get('/submission/:id', auth, submissionController.getById);
router.get('/multi-submission', auth, submissionController.multi);
router.post('/submission', middleWares.pdfMulter.single('pdf'), middleWares.s3MiddleWare, submissionController.store);
router.get('/assignment/:id/submissionList/page/:pageNum', teacherAuth, auth, submissionController.getByPage);

router.put('/submission/:id', auth, submissionController.update);
router.put('/assignment/:id/submission/allocate', submissionController.allocate);

router.get('/course/:id/assignmentList/statistic', submissionController.statistic);
router.get('/', async (ctx) => {
  ctx.body = 'easy-grade homepage coming soon!';
});

module.exports = router;
