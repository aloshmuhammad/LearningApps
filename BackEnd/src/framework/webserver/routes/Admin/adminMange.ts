import express from 'express'
import AdminManageController from '../../../../Adapters/controllers/AdminManangeControllers'
import { adminRepoImpl } from '../../../database/mongodb/repositories/AdminRepoImpl'
import { adminRepoInter } from '../../../../application/repositories/adminRepoInter'
import { AdminAuthentication } from '../../middlewares/AdminAuth'

const adminManage=()=>{

const router=express.Router()
const controller=AdminManageController(adminRepoImpl,adminRepoInter)
router.get('/users-list',AdminAuthentication as any,controller.userList)
router.post('/block-unblock',controller.userBlock)
router.get('/tutors-list',AdminAuthentication as any,controller.tutorsList)
router.post('/tutor-block',controller.tutorBlock)
router.get('/course-list',AdminAuthentication as any,controller.courseList)
router.get('/applied-tutors',AdminAuthentication as any,controller.appliedTutorList)
router.post('/recruit-tutor',AdminAuthentication as any,controller.recruitTutor)
router.post('/add-course',AdminAuthentication as any,controller.addCourse)
router.get('/buyed-Course',AdminAuthentication as any ,controller.getCourses)

return router
}
export default adminManage