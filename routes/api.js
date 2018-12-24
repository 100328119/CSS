//3rd party library
const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
//customize library
const AdminController = require('../controller/admin');
const CampusController = require('../controller/campus');
const BuildingController = require('../controller/building');
const RoomController = require('../controller/room');
const DepartmentController = require('../controller/department');
const SemesterController = require('../controller/semester');
const CourseController = require('../controller/course');
const InstructorController = require('../controller/instructor');
const SectionController = require('../controller/section');
const CalendarController = require('../controller/calendar');
const passportConfig = require('../passport');
//admin CRUD
router.route('/admin')
  .get(AdminController.getAllAdmin)
  .post(AdminController.addNewAdmin);

router.route('/admin/:_id')
  .put(AdminController.updateAdmin)
  .delete(AdminController.deleteAdmin);

//campus CRUD
router.route('/campus')
  .get(CampusController.getAllCampus)
  .post(CampusController.addNewCampus);

router.route('/campus/:_id')
  .put(CampusController.updateCampus)
  .delete(CampusController.deleteCampus);

//building CRUD
router.route('/building')
  .get(BuildingController.getAllBuilding)
  .post(BuildingController.addNewBuilding);

router.route('/building/:_id')
  .put(BuildingController.updateBuilding)
  .delete(BuildingController.deleteBuilding);

//room CRUD
router.route('/room')
  .get(RoomController.getAllRoom)
  .post(RoomController.addNewRoom);

router.route('/room/:_id')
  .put(RoomController.updateRoom)
  .delete(RoomController.deleteRoom);

//department CRUD
router.route('/department')
  .get(DepartmentController.getAllDepartment)
  .post(DepartmentController.addNewDepartment);

router.route('/department/_id')
  .put(DepartmentController.updateDepartment)
  .delete(DepartmentController.deleteDepartment);

//Semester CRUD
router.route('/semester')
  .get(SemesterController.getAllSemester)
  .post(SemesterController.addNewSemester);

router.route('/semester/:_id')
  .put(SemesterController.updateSemester)
  .delete(SemesterController.deleteSemester)

//Course CRUD
router.route('/course')
  .get(CourseController.getAllCourse)
  .post(CourseController.addNewCourse);

router.route('/course/:_id')
  .put(CourseController.updateCourse)
  .delete(CourseController.deleteCourse);

//Instructor CRUD
router.route('/instructor')
  .get(InstructorController.getAllInstructor)
  .post(InstructorController.addNewInstructor);

router.route('/instructor/:_id')
  .put(InstructorController.updateInstructor)
  .post(InstructorController.deleteInstructor);

//Section CRUD
router.route('/section')
  .get(SectionController.getAllSection)
  .post(SectionController.addNewSection);

router.route('/section/:_id')
  .put(SectionController.updateSection)
  .delete(SectionController.deleteSection);

//Calendar CRUD
router.route('/calendar')
  .get(CalendarController.getAllCalendar)
  .post(CalendarController.addNewCalendar);

router.route('/calendar/:_id')
   .get(CalendarController.getOneCalendar)
   .put(CalendarController.updateCalendar)
   .delete(CalendarController.deleteCaleder);

module.exports = router;
